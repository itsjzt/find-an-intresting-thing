import { User } from "../entity/User";
import { Connection } from "typeorm";

export interface createControllerArg {
  db: Connection;
  user: Omit<User, "media" | "id">;
}

export function create({ db, user }: createControllerArg) {
  const newUser = new User();
  newUser.bio = user.bio;
  newUser.email = user.email;
  newUser.firstName = user.firstName;
  //   newUser.lastName = user.lastName;
  newUser.password = user.password;

  return db.manager.save(newUser);
}

export function update() {}
