import { Media } from "../entity/Media";
import {
  createControllerArg,
  updateControllerArg,
  viewControllerArg,
  delControllerArg,
  viewAllControllerArg,
} from "../types";

// TODO: This all duplicated logic can be extracted in a crud Controller
// which can be used across all controllers
export function create({ db, data }: createControllerArg<Media>) {
  const newMedia = new Media();
  for (const property in data) {
    newMedia[property] = data[property];
  }

  return db.manager.save(newMedia);
}

export async function update({ db, data, where }: updateControllerArg<Media>) {
  await db.manager.update(Media, where.id, data);

  return db.manager.findOneOrFail(Media, where.id);
}

export function view({ db, where }: viewControllerArg) {
  return db.manager.findOneOrFail(Media, where.id);
}

export function viewAll({ db }: viewAllControllerArg) {
  return db.manager.findAndCount(Media, {
    take: 10,
    skip: 0,
  });
}

export function del({ db, where }: delControllerArg) {
  return db.manager.delete(Media, where.id);
}
