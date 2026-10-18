import EventEmitter from "node:events";

export interface RetrievalEvent {
  sportsbook: string;
  event: string;
  quotes: [number, number];
}

const emitter = new EventEmitter();

// Publish
export const publishRetrievalEvent = (event: RetrievalEvent) => {
  emitter.emit("data", event);
};

// Subscribe
export const subscribeToRetrievalEvent = (
  callback: (event: RetrievalEvent) => void
) => {
  emitter.addListener("data", callback);
  return () => emitter.removeListener("data", callback);
};
