import React, { useState } from "react"
import { ChatItem } from "react-chat-elements/native"
import { ExpandableSection, View } from "react-native-ui-lib"
import { Button, Text } from "../../components"
import { TextInput } from "react-native"
import { color, spacing } from "../../theme"

export interface ChatMessage {
  id: string
  userName: string
  message: string
  timestamp: Date
}

export type ChatProps = {
  orderId: string
}

export const Chat = ({ orderId }: ChatProps) => {
  const [expanded, setExpanded] = useState(false)

  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "IkU1", userName: "Hans Hansen", message: "Please confirm order", timestamp: new Date() },
    { id: "kUaM", userName: "Me", message: "Confirmed", timestamp: new Date() },
  ])

  const toggleExpanded = () => {
    setExpanded(prev => !prev)
  }

  return (
    <View style={{ marginTop: 5, marginBottom: 5 }}>
      <Button
        preset="secondary"
        style={{ height: 32, width: 100, paddingHorizontal: 0, paddingVertical: 0, alignSelf: "center" }}
        onPress={() => toggleExpanded()}
      >
        <Text
          style={{ color: color.palette.white }}
        >{expanded ? "Hide chat" : "Show chat"}</Text>
      </Button>

      <ExpandableSection
        expanded={expanded}
      >
        {messages.map(message => (
          <ChatItem
            id={message.id.toString()}
            key={message.id}
            title={message.userName}
            subtitle={message.message}
            date={message.timestamp}
          />
        ))}

        <View style={{
          paddingLeft: 25,
          paddingRight: 80,
          marginHorizontal: 5,
          marginBottom: 5,
          backgroundColor: color.palette.offWhite,
          borderRadius: 10,
        }}>
          <TextInput
            style={{ height: 50 }}
            maxLength={260}
            placeholder="Write your message..."
            multiline
          />

          <Button
            text="Send"
            preset="secondary"
            textStyle={{ fontSize: 12 }}
            style={{
              width: 56,
              height: 32,
              paddingHorizontal: spacing[0],
              paddingVertical: spacing[0],
              position: "absolute",
              right: 10,
              bottom: 10,
            }}

          />
        </View>
      </ExpandableSection>
    </View>
  )
}
