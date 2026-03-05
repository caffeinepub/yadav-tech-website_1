import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Message {
    id: bigint;
    text: string;
    author: string;
    timestamp: bigint;
}
export interface backendInterface {
    getConversation(): Promise<Array<Message>>;
    sendUserMessage(text: string): Promise<Message>;
}
