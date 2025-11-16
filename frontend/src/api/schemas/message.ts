export type MessageRole = "system" | "user" | "assistant" | "tool";

export interface Message {
  /** UUID */
  id: string;
  /** Chat UUID this message belongs to */
  chatId: string;
  /** Sender role */
  role: MessageRole;
  /** Optional sender user id (for role 'user') */
  userId?: string | null;
  /** Message text */
  content: string;
  /** Optional structured content (e.g., blocks, embeds) */
  contentStructured?: unknown | null;
  /** ISO timestamp */
  createdAt: string;
  /** Optional ISO timestamp */
  updatedAt?: string | null;
  /** Whether the message is final (assistant finished) */
  isFinal?: boolean;
  /** Optional metadata (e.g., model, finish_reason) */
  metadata?: Record<string, any> | null;
}
