import { fetchTipicoData } from "./fetchTipicoData.js";
import { TipicoDataSchema } from "./TipicoDataSchema.js";

const next = async () => {
  fetchTipicoData().then((data) => {
    TipicoDataSchema.parse(data);
    console.log("Valid response", new Date().toString());
    next();
  });
};

next();
