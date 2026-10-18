import { waitFor } from "../../../../utils/wait-for";
import { getRandomInRange } from "../../../../utils/random-range";
import { RetrieverService } from "../../shared/retriever-service";
import { publishRetrievalEvent } from "../../shared/retrieval-event";

export const retrievePinnacleData: RetrieverService = () => {
  let canceled = false;

  (async () => {
    while (!canceled) {
      const quoteDivider = Math.random();
      publishRetrievalEvent({
        sportsbook: "pinnacle",
        event: "Soccer - Team A / Team B",
        quotes: [1 / quoteDivider, 1 - 1 / quoteDivider],
      });
      await waitFor(getRandomInRange(250, 5000));
    }
  })();

  return () => (canceled = true);
};
