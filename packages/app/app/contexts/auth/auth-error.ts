export class AuthError extends Error {
  public code: string

  constructor(code: string, message: string) {
    super()
    super.message = message

    this.code = code
  }
}
