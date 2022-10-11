class ErrorHandler extends Error {
    constructor(code, message) {
      super(message)
      this.code = code;
      this.message = message;
    }

    toSting(){
      console.log(`${this.code} error, ${this.message}`)
    }
  }

  module.exports = ErrorHandler