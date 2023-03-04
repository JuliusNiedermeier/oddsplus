import { fetchTipicoData } from "./fetchTipicoData.js";
import { TipicoDataSchema } from "./TipicoDataSchema.js";
import { diffJSON } from "./diffJSON.js";

let previousResponse = {};

const next = async () => {
  fetchTipicoData().then((data) => {
    TipicoDataSchema.parse(data);
    const changes = diffJSON(previousResponse, data);
    console.log("Found", changes.length, "changes");
    previousResponse = data;
    next();
  });
};

next();
