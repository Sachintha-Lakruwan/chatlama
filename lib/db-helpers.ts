import { db, ChatMessage, aMessage } from "./db";
import { memory } from "./askOllama";

export interface ChatListItem {
  chatId: string;
  firstMessage: aMessage;
  timestamp: number;
}

export async function getChatHistory(
  chatId: string,
  setChatHistory: (chatHistory: aMessage[]) => void
) {
  const messages = await db.messages.where("chatId").equals(chatId).toArray();
  const chatHistory = messages.map((message) => message.message[0]);
  await memory.clear();

  // Update memory with chat history
  for (const msg of chatHistory) {
    if (msg.type === "user") {
      memory.chatHistory.addUserMessage(msg.content);
    } else {
      memory.chatHistory.addAIChatMessage(msg.content);
    }
  }

  setChatHistory(chatHistory);
}

export async function addMessageToChat(chatId: string, message: aMessage) {
  await db.messages.add({
    chatId,
    message: [message],
    timestamp: Date.now(),
  } as ChatMessage);
}

export async function deleteChat(chatId: string) {
  await db.messages.where("chatId").equals(chatId).delete();
}

export async function getChatList(): Promise<ChatListItem[]> {
  // Get unique chatIds using Dexie's distinct operation
  const uniqueChatIds = await db.messages.orderBy("chatId").uniqueKeys();

  // Get the first message for each chatId
  const chatList = await Promise.all(
    uniqueChatIds.map(async (chatId) => {
      const firstMessage = await db.messages
        .where("chatId")
        .equals(chatId)
        .first();

      return {
        chatId,
        firstMessage: firstMessage?.message[0],
        timestamp: firstMessage?.timestamp,
      } as ChatListItem;
    })
  );

  // Sort by timestamp, latest first
  return chatList.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
}
