import { fetchTipicoData } from "./fetchTipicoData.js";
import { TipicoData, TipicoDataSchema } from "./types/index.js";

type DataCallback = (data: TipicoData) => void;

const fetch = async (onData: DataCallback) => {
  const data = await fetchTipicoData();
  TipicoDataSchema.parse(data);
  onData(data);
};

export const streamData = (onData: DataCallback) => {
  let subscribed = true;

  (async () => {
    while (subscribed) await fetch(onData);
  })();

  return () => {
    subscribed = false;
  };
};
