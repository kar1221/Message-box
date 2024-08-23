import HttpError from './HttpError';

class FormNotComplete extends HttpError {
  constructor(message: string) {
    super(message, 400);
    this.name = 'Form Not Complete';
  }
}

export default FormNotComplete;
