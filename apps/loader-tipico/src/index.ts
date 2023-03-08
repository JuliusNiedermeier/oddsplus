import { getCompetitions, getEvents, getSports } from "./normalize.js";
import { diffEntityArrays } from "./diffEntityArrays.js";
import { streamData } from "./streamData.js";
import { Event, Sport, Competition } from "./types/index.js";

let previousSports: Sport[] = [];
let previousCompetitions: Competition[] = [];
let previousEvents: Event[] = [];

const unsubscribe = streamData((data) => {
  console.time("Analyzed data in");
  // Sports
  const sports = getSports(data);
  const changedSports = diffEntityArrays(previousSports, getSports(data));
  previousSports = sports;

  // Competitions
  const competitions = getCompetitions(data);
  const changedCompetitions = diffEntityArrays(
    previousCompetitions,
    getCompetitions(data)
  );
  previousCompetitions = competitions;

  // Events
  const events = getEvents(data);
  const changedEvents = diffEntityArrays(previousEvents, getEvents(data));
  previousEvents = events;

  console.timeEnd("Analyzed data in");
  console.table({
    sports: {
      created: changedSports.created.length,
      updated: changedSports.updated.length,
      deleted: changedSports.deleted.length,
    },
    competitions: {
      created: changedCompetitions.created.length,
      updated: changedCompetitions.updated.length,
      deleted: changedCompetitions.deleted.length,
    },
    events: {
      created: changedEvents.created.length,
      updated: changedEvents.updated.length,
      deleted: changedEvents.deleted.length,
    },
  });
});
