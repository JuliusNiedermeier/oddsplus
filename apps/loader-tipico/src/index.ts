import { getCompetitions, getEvents, getSports } from "./normalize.js";
import { streamData } from "./streamData.js";

const unsubscribe = streamData((data) =>
  console.log({
    sports: getSports(data).length,
    competitions: getCompetitions(data).length,
    events: getEvents(data).length,
  })
);

setTimeout(unsubscribe, 10000);
