import React, { useState } from "react"
import { OrderRoute, OrderRouteProp } from "../../navigators/order"
import { Button, Screen } from "../../components"
import { ChatItem } from "react-chat-elements/native"
import { View } from "react-native-ui-lib"
import { color, spacing } from "../../theme"
import { TextInput, TextStyle, ViewStyle } from "react-native"

export interface ChatMessage {
  id: string
  userName: string
  message: string
  timestamp: Date
}

interface Props extends OrderRouteProp<OrderRoute.Chat> {
}

export const OrderTrackingChatScreen = ({ route }: Props) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "IkU1", userName: "Hans Hansen", message: "Please confirm order", timestamp: new Date() },
    { id: "kUaM", userName: "Me", message: "Confirmed", timestamp: new Date() },
  ])

  return (
    <Screen preset="scroll" style={ROOT}>
      {messages.map(message => (
        <ChatItem
          id={message.id.toString()}
          key={message.id}
          title={message.userName}
          subtitle={message.message}
          date={message.timestamp}
        />
      ))}

      <View style={INPUT_CONTAINER}>
        <TextInput
          style={TEXT_INPUT}
          maxLength={260}
          placeholder="Write your message..."
          multiline
        />

        <Button
          text="Send"
          preset="secondary"
          textStyle={SEND_BUTTON_TEXT}
          style={SEND_BUTTON}

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
