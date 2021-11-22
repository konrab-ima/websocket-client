export enum MessageType {
    TEXT,
    INFO
}

export interface IMessage {
    name?: string;
    msg: string;
    type?: MessageType;
    createdAt?: Date;
}
