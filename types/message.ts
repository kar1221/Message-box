export interface MessageType {
  id: string;
  author: string;
  message: string;
  createdDate: Date;
}

export type MessageRequestBody = Omit<MessageType, 'createdDate'>;
