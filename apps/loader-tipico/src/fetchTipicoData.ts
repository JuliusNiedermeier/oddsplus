import fetch from "node-fetch";
import { TipicoData } from "./TipicoDataSchema.js";

const URL = "https://sports.tipico.de/json/program/selectedEvents/all/1101";

const userAgent =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36";

export const fetchTipicoData = async () => {
  const response = await fetch(URL, {
    method: "GET",
    headers: { "User-Agent": userAgent },
  });
  return response.json() as Promise<TipicoData>;
};
