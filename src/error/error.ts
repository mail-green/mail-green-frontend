export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Not Found";
  }
}

export class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Bad Request";
  }
}

export class UnProcessableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnProcessable";
  }
}
