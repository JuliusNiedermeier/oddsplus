import { Competition, Event, Sport, TipicoData } from "./types/index.js";

export const getSports = (data: TipicoData): Sport[] => {
  return data.SELECTION.sports.map((sport) => ({
    id: sport.sportId,
    name: sport.sportId,
  }));
};

export const getCompetitions = (data: TipicoData): Competition[] => {
  return Object.keys(data.SELECTION.sportCompetitionMap).reduce(
    (competitions, sportId) => {
      competitions.push(
        ...data.SELECTION.sportCompetitionMap[sportId].map((competition) => ({
          id: competition.groupIdString,
          sportId: sportId,
          name: competition.name,
        }))
      );
      return competitions;
    },
    [] as Competition[]
  );
};

export const getEvents = (data: TipicoData): Event[] => {
  return Object.keys(data.SELECTION.events).map((eventId) => {
    const event = data.SELECTION.events[eventId];
    return {
      id: eventId,
      name: event.eventName,
      competitionId: event.competitionId.toString(),
      startTime: event.eventStartTime.toString(),
      status: event.status,
      date: event.date,
    };
  });
};
