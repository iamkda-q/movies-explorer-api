module.exports = class AuthorViolationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
};
