export class GenericError extends Error {
  httpStatusCode: number;
  code: string;
  metadata?: Record<string, unknown>;

  constructor(
    message: string,
    httpStatusCode: number,
    code: string,
    metadata?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'GenericError';
    this.httpStatusCode = httpStatusCode;
    this.code = code;
    this.metadata = metadata;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
