import { MessageType, MessageRequestBody } from '../types/message';
import { Response, Request } from 'express';
import DOMPurify from 'isomorphic-dompurify';
import { formatDistance } from 'date-fns';
import FormNotComplete from '../errors/FormNotCompleteError';
import { v4 as uuidv4 } from 'uuid';
import MessageNotFound from '../errors/MessageNotFoundError';

const messages: MessageType[] = [
  {
    id: uuidv4(),
    message: 'Hi there!',
    author: 'Amando',
    createdDate: new Date(),
  },
  {
    id: uuidv4(),
    message: 'Hello World!',
    author: 'Charles',
    createdDate: new Date(),
  },
];

const fetchMessages = (req: Request, res: Response) => {
  const formattedMessages = messages.map((message) => ({
    ...message,
    createdDate: formatDistance(new Date(), message.createdDate),
  }));

  res.render('index', { formattedMessages });
};

const addMessage = (
  req: Request<{}, {}, MessageRequestBody>,
  res: Response
) => {
  const { author, message } = req.body;

  if (!author || !message) {
    console.log('executed');
    throw new FormNotComplete("The form isn't completed!");
  }

  messages.push({
    id: uuidv4(),
    author: DOMPurify.sanitize(author),
    message: DOMPurify.sanitize(message),
    createdDate: new Date(),
  });

  res.redirect('/');
};

const fetchMessage = (req: Request<{ messageId: string }>, res: Response) => {
  const { messageId } = req.params;

  const targetMessage = messages.find((value) => value.id === messageId);

  if (!targetMessage)
    throw new MessageNotFound(
      'Invalid message Id. Perhaps try to click the button on the message box instead.'
    );

  const formattedDate = formatDistance(targetMessage.createdDate, new Date());

  res.render('message', {
    author: targetMessage.author,
    message: targetMessage.message,
    createdDate: formattedDate,
  });
};

export { fetchMessages, addMessage, fetchMessage };
