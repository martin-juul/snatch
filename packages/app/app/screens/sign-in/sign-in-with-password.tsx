import React, { createRef, useState } from "react"
import { View } from "react-native-ui-lib"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { TextInput, TextStyle, ViewStyle } from "react-native"
import { Button, Text } from "../../components"
import { useAuth } from "../../contexts/auth"
import { AuthError } from "../../contexts/auth/auth-error"
import { translate } from "../../i18n"
import { color, spacing } from "../../theme"

type FormData = {
  email: string
  password: string
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

export const SignInWithPassword = () => {
  const auth = useAuth()
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const [shouldSignUp, setShouldSignUp] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>()

  const emailRef = createRef<TextInput>()
  const passwordRef = createRef<TextInput>()

  const onSubmit = handleSubmit(data => {
    console.log('SignInWithPassword@onSubmit', data)

    if (shouldSignUp) {
      auth.authenticate.createUserWithEmailAndPassword(data.email, data.password)
        .catch(e => {
          if (e instanceof AuthError) {
            setErrorMessage(e.message)
          } else {
            throw e
          }
        })

      return
    }

    auth.authenticate.signInWithEmailAndPassword(data.email, data.password)
      .then(console.log)
      .catch(e => {
        if (e instanceof AuthError) {
          setErrorMessage(e.message)
        } else {
          throw e
        }
      })
  })

  return (
    <View testID="SignInWithPassword">
      <Controller
        name="email"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            testID="emailInput"
            style={INPUT}
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={254}
            returnKeyType="next"
            keyboardType="email-address"
            textContentType="emailAddress"
            placeholder={translate("emailAddress")}
            onBlur={() => {
              onBlur()
              passwordRef.current?.focus()
            }}
            onChangeText={onChange}
            value={value}
            ref={emailRef}
          />
        )}
      />
      {errors.email && <Text>{errors.email.message}</Text>}

      <Controller
        name="password"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            testID="passwordInput"
            style={INPUT}
            maxLength={260}
            secureTextEntry
            textContentType="password"
            placeholder={translate("password")}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            ref={passwordRef}
          />
        )}
      />
      {errors.password && <Text>{errors.password.message}</Text>}

      <View style={BUTTON_CONTAINER}>
        <Button preset="secondary" tx="signUp" onPress={handleSubmit(onSubmit)} />

        <Button preset="secondary" tx="signIn" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  )
}

const INPUT: TextStyle = {
  height: 50,
  width: "100%",
  backgroundColor: color.palette.offWhite,
  marginBottom: 10,
  padding: spacing[2],
  borderRadius: 20,
}

const BUTTON_CONTAINER: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  marginHorizontal: "22%",
}
