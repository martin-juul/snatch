import React, { useCallback, useEffect, useState } from "react"
import { OrderRoute, OrderProps } from "../../navigators/order"
import { Button, Screen } from "../../components"
import { ChatItem } from "react-chat-elements/native"
import { View } from "react-native-ui-lib"
import { color, spacing } from "../../theme"
import { TextInput, TextStyle, ViewStyle } from "react-native"
import database from "@react-native-firebase/database"
import { useUser } from "../../contexts/user"
import { nanoid } from "../../utils/id"


export interface ChatMessage {
  id: string
  userId: string
  userName: string
  text: string
  timestamp: Date
}

interface Props extends OrderProps<OrderRoute.Chat> {
}

export const OrderTrackingChatScreen = ({ route }: Props) => {
  const { customer } = useUser()

  const [orderId, setOrderId] = useState(route.params.orderId)
  const [path, setPath] = useState<string>()

  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [draftText, setDraftText] = useState<string>("")
  const [draftValid, setDraftValid] = useState(false)

  useEffect(() => {
    if (typeof route.params.orderId !== "string") {
      throw new Error("missing order id in route")
    }

    setOrderId(route.params.orderId)
    setPath(`order-messages/${orderId}`)
  }, [route.params.orderId])

  useEffect(() => {
    const isDraftValid = typeof draftText === "string" && draftText.length > 5
    setDraftValid(true)
  }, [draftText])

  useEffect(() => {
    const onValueChange = database()
      .ref(path)
      .on("value", snapshot => {
        const result = snapshot.val() as ChatMessage[]
        console.log('onValueChange', result)

        setMessages(result)
      })

    return () => {
      database().ref(path).off("value", onValueChange)
    }
  }, [path])

  useEffect(() => {
    const key = database().ref(path)

    key.once("value").then(snapshot => {
      console.log(snapshot)
    })

  }, [path])

  const sendMessage = useCallback(async () => {
    const id = nanoid()

    const message: ChatMessage = {
      id,
      userId: customer.userId,
      userName: customer.name,
      text: draftText,
      timestamp: new Date(),
    }

    const newRef = database().ref().child(path)
    console.log('Auto generated key: ', newRef.key);

    newRef.push().set(message)
      .then(() => console.log('sent message'))

    // setDraftText("")
  }, [path])

  return (
    <Screen preset="scroll" style={ROOT}>
      {messages.map(message => (
        <ChatItem
          id={message.id.toString()}
          key={message.id}
          title={message.userName}
          subtitle={message.text}
          date={message.timestamp}
        />
      ))}

      <View style={INPUT_CONTAINER}>
        <TextInput
          style={TEXT_INPUT}
          maxLength={200}
          placeholder="Write your message..."
          multiline
          value={draftText}
          onChangeText={text => setDraftText(text)}
        />

        <Button
          text="Send"
          preset="secondary"
          textStyle={SEND_BUTTON_TEXT}
          style={SEND_BUTTON}
          disabled={!draftValid}
          onPress={() => sendMessage()}
        />
      </View>
    </Screen>
  )
}

const ROOT: ViewStyle = {
  flex: 1,
}

const INPUT_CONTAINER: ViewStyle = {
  paddingLeft: 25,
  paddingRight: 80,
  marginHorizontal: 5,
  backgroundColor: color.palette.offWhite,
  borderRadius: 10,
  marginTop: "auto",
}

const TEXT_INPUT: TextStyle = {
  height: 50,
}

const SEND_BUTTON_TEXT: TextStyle = {
  fontSize: 12,
}

const SEND_BUTTON: ViewStyle = {
  width: 56,
  height: 32,
  paddingHorizontal: spacing[0],
  paddingVertical: spacing[0],
  position: "absolute",
  right: 10,
  bottom: 10,
}
