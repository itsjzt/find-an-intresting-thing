import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import Routes from "./routes";
import { IRequest } from "./types";

const PORT = process.env.PORT || 3000;

// create connection with database
// note that it's not active database connection
// TypeORM creates connection pools and uses them for your requests
createConnection().then(async (connection) => {
  const server = express();

  server.use(async (req: IRequest, res, next) => {
    req.db = connection;
    next();
  });

  server.use(Routes);
  server.use((_req, res) => res.send("404"));

  server.listen(PORT, () =>
    console.log(`Listening at http://localhost:${PORT}`)
  );
});
