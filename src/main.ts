import { retrievePinnacleData } from "./domains/retrieval/services/retriever-pinnacle";
import { retrieveTipicoData } from "./domains/retrieval/services/retriever-tipico";
import {
  storeRetrievedData,
  subscribeToStore,
} from "./domains/storage/services/store";

// Run all services
const cancelStore = storeRetrievedData();
const cancelPinnacleRetriever = retrievePinnacleData();
const cancelTipicoRetriever = retrieveTipicoData();

const unsubscribeFromStore = subscribeToStore((data) => {
  console.clear();
  console.log(
    "Store update",
    JSON.stringify(
      Object.fromEntries(
        [...data.entries()].map(([event, data]) => [
          event,
          {
            event: data.event,
            quotes: Object.fromEntries(data.quotes.entries()),
          },
        ])
      ),
      null,
      2
    )
  );
});

// setTimeout(() => {
//   cancelPinnacleRetriever();
//   cancelTipicoRetriever();
//   cancelStore();
//   unsubscribeFromStore();
// }, 10000);
