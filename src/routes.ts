import { Router } from "express";
import { IRequest } from "./types";
import { User } from "./entity/User";

const routes = Router();

routes.get("/", (req: IRequest, res) => {
  const user = new User();
  user.lastName = "sharma";
  user.firstName = "saurabh";
  user.bio = "This is #2 time";

  req.db.manager.save(user);

  return res.json(user);
});

export default routes;
