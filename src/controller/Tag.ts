import {
  createControllerArg,
  viewControllerArg,
  viewAllControllerArg,
} from "../types";
import { Tag } from "../entity/Tag";

export function create({ db, data }: createControllerArg<Tag>) {
  const newTag = new Tag();
  for (const property in data) {
    newTag[property] = data[property];
  }

  return db.manager.save(newTag);
}

export function view({ db, where }: viewControllerArg) {
  return db.manager.findOneOrFail(Tag, where.id);
}

export function viewAll({ db }: viewAllControllerArg) {
  return db.manager.findAndCount(Tag, {
    take: 10,
    skip: 0,
  });
}
