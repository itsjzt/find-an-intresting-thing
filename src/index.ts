import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import Routes from "./routes";
import { IRequest } from "./types";

const PORT = process.env.PORT || 3000;
const server = express();

server.use((req: IRequest, _res, next) => {
  createConnection()
    .then(async (connection) => {
      req.db = connection;
      next();
    })
    .catch((error) => console.log(error));
});
server.use(Routes);
server.use((_req, res) => res.send("404"));

server.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
