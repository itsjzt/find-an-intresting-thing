import { User } from "../entity/User";
import {
  updateControllerArg,
  createControllerArg,
  viewControllerArg,
} from "../types";

export function create({ db, data }: createControllerArg<Omit<User, "media">>) {
  const newUser = new User();
  for (const property in data) {
    newUser[property] = data[property];
  }
  return db.manager.save(newUser);
}

export async function update({ db, data, where }: updateControllerArg<User>) {
  await db.manager.update(User, where.id, data);

  return db.manager.findOneOrFail(User, where.id);
}

export function view({ db, where }: viewControllerArg) {
  return db.manager.findOneOrFail(User, where.id);
}
