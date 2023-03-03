import { z } from "zod";

// Schema of a response from https://sports.tipico.de/json/program/selectedEvents/all/1101

export const TipicoDataSchema = z.object({
  /** Contains data for the selected events */
  SELECTION: z.object({
    /** Map ofavailable markets by sport id */
    availableMarkets: z.record(z.string(), z.array(z.string())),

    /** Map of competitions by sport id */
    sportCompetitionMap: z.record(
      /** Sport id */
      z.string(),
      z.array(
        /** Competition */
        z.object({
          name: z.string(),
          parentName: z.string(),
          groupId: z.number() /** Competition id */,
          groupIdString: z.string(),
          sportRadarId: z.optional(z.number()),
          icon: z.string(),
          regionIcon: z.string(),
          groupInfo: z.string(),
          hasSeasonEvents: z.boolean(),
          sort: z.number(),
        })
      )
    ),

    /** Array of sports */
    sports: z.array(
      z.object({
        sportId: z.string(),
        groupId: z.number(),
        count: z.number(),
        sort: z.number(),
      })
    ),

    /** Map of events by competition id */
    competitionEventMap: z.record(z.string(), z.array(z.string())),

    /** Map of events */
    events: z.record(
      z.string(),
      z.object({
        id: z.string(),
        competitionId: z.number(),
        team1: z.union([z.string(), z.null()]),
        team2: z.union([z.string(), z.null()]),
        team1Id: z.union([z.number(), z.null()]),
        team2Id: z.union([z.number(), z.null()]),
        sportRadarMatchId: z.union([z.number(), z.null()]),
        eventStartTime: z.number(),
        midnightTime: z.number(),
        status: z.string(),
        redCards: z.union([z.tuple([z.string(), z.string()]), z.null()]),
        type: z.union([z.string(), z.null()]),
        date: z.string(),
        eventInfo: z.string(),
        eventName: z.string(),
        betMarketsCount: z.number(),
        currentServer: z.null(),
        hasFirstHalfResults: z.boolean(),
        extraTime: z.boolean(),
        penalties: z.boolean(),
        breakBefore: z.union([z.string(), z.null()]),
      })
    ),

    /** Map of scores by event id */
    scores: z.record(
      z.string(),
      z.object({
        currentScore: z.array(z.string()),
        htScore: z.optional(z.tuple([z.string(), z.string()])),
      })
    ),

    /** Map of event ids by sport id */
    eventsBySport: z.record(z.string(), z.array(z.string())),

    /**
     * Map of odd groups by event id
     * Odd groups are Maps of odd lists by market id
     * Odd lists are Arrays of event odds
     * Event odds contain the odds for each event outcome
     * */
    matchOddGroups: z.record(
      z.string(),
      z.record(
        z.string(),
        z.array(
          z.object({
            id: z.number(),
            halftimeResult: z.optional(z.null()),
            fixedParamText: z.union([z.string(), z.null()]),
            section: z.union([z.number(), z.null()]),
            results: z.array(
              z.object({
                id: z.number(),
                caption: z.string(),
                quoteFloatValue: z.number(),
                status: z.optional(z.string()),
              })
            ),
          })
        )
      )
    ),

    outrightOddGroups: z.record(
      z.string(),
      z.record(
        z.string(),
        z.record(
          z.string(),
          z.object({
            id: z.number(),
            quoteFloatValue: z.number(),
            teamId: z.optional(z.number()),
          })
        )
      )
    ),

    sportCompetitionMarketCaptionsMap: z.record(
      z.string(),
      z.record(z.string(), z.record(z.string(), z.array(z.string())))
    ),

    live: z.boolean(),

    pushEligible: z.boolean(),
  }),
});

export type TipicoData = z.infer<typeof TipicoDataSchema>;
