export class TextInputMaskError extends Error {
  public constructor(message: string) {
    super(`TextInputMask: ${message}`);
  }
}
