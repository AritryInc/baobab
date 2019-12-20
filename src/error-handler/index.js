import handlers from './handlers';

class CustomError extends Error {
  constructor(error) {
    super('');

    this.isCustomError = true;
    this.content = null;
    this.status = null;

    if (error.status && error.content) {
      this.content = error.content;
      this.status = error.status;
    } else if (error.isJoi) {
      this.content = error.details
        .reduce((acc, err) => ({ ...acc, [err.path[0]]: err.message }), {});
      this.status = 422;
    } else {
      handlers.find((handler) => {
        const { content, status } = handler(error);

        if (content && status) {
          this.content = content;
          this.status = status;

          return true;
        }

        return false;
      });
    }

    if (!(this.content && this.status)) {
      this.content = 'Internal server error';
      this.status = 500;
    }
  }

  static withDetails(status, content) {
    const error = new Error();

    error.status = status;
    error.content = content;

    return new CustomError(error);
  }
}

export default CustomError;
