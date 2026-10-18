import EventEmitter from "node:events";
import { subscribeToRetrievalEvent } from "../../../retrieval/shared/retrieval-event";
import { StoreService } from "../../shared/store-service";

export interface SportEvent {
  event: string;
  quotes: Map<string, [number, number]>;
}

export type DataStore = Map<string, SportEvent>;

const dataStore = new Map<string, SportEvent>() satisfies DataStore;

const emitter = new EventEmitter();

export const storeRetrievedData: StoreService = () => {
  const unsubscribe = subscribeToRetrievalEvent((event) => {
    if (dataStore.has(event.event)) {
      dataStore.get(event.event)!.quotes.set(event.sportsbook, event.quotes);
    } else {
      dataStore.set(event.event, {
        event: event.event,
        quotes: new Map([[event.sportsbook, event.quotes]]),
      });
    }
    emitter.emit("update", dataStore);
  });
  return () => unsubscribe;
};

export const subscribeToStore = (callback: (data: DataStore) => void) => {
  emitter.addListener("update", callback);
  return () => emitter.removeListener("update", callback);
};
