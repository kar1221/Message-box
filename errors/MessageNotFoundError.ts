import HttpError from './HttpError';

class MessageNotFound extends HttpError {
  constructor(message: string) {
    super(message, 404);
    this.name = 'Message Not Found';
  }
}

export default MessageNotFound;
