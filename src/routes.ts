import { Router } from "express";
import { IRequest } from "./types";
import { create, update, view } from "./controller/User";

const routes = Router();

routes.get("/users/create", async (req: IRequest, res) => {
  const user = {
    firstName: "Saurbh 2",
    lastName: "sharam",
    email: "firstty@gmail.com",
    bio: "T wirte awesome bios",
    password: "FULLY ENCRIPYTRED PASSWORD NOW",
  };
  const response = await create({ db: req.db, data: user });

  return res.json(response);
});

routes.get("/users/update", async (req: IRequest, res) => {
  const user = {
    firstName: "Saurbh 219198",
    lastName: "awsome",
    email: "secondty@gmail.com",
    bio: "T worte awesome bios",
    password: "FULLY PASSWORD NOW",
  };
  const where = { id: 1 };
  const response = await update({ db: req.db, where, data: user });

  return res.json(response);
});

routes.get("/users/:id", async (req: IRequest, res) => {
  const where = { id: parseInt(req.params.id) };
  const response = await view({ db: req.db, where });

  return res.json(response);
});

export default routes;
