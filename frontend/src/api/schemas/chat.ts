export interface Chat {
  /** UUID */
  id: string;
  /** Owner user UUID */
  userId: string;
  /** ISO timestamp */
  createdAt: string;
  /** ISO timestamp, optional */
  updatedAt?: string | null;
  /** Optional human-friendly title */
  title?: string | null;
  /** Optional metadata bag */
  metadata?: Record<string, any> | null;
}
