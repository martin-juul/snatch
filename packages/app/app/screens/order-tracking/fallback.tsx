import React from "react"
import { View } from "react-native"
import { Button, Text } from "../../components"

export const FallbackComponent = ({ error, resetError }: { error: Error, resetError: () => void }) => (
  <View>
    <Text>Something went wrong :(</Text>

    <Text>{error.name}</Text>
    <Text>{error.message}</Text>

    <Button>Reset error</Button>
  </View>
)
