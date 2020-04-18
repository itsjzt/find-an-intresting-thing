import { create, update } from "./User";
import { User } from "../entity/User";
import { sleep } from "../utils/sleep";

const db: any = {
  manager: {
    async save(data) {
      await sleep(50);
      return data;
    },
  },
};

test("create User", () => {
  const user: Omit<User, "media" | "id"> = {
    bio: "You already know me, I'm winston churchill",
    email: "winston@hey.com",
    firstName: "winston",
    lastName: "churchill",
    password: "randomCRYPTEDPassword",
  };

  create({ db, user }).then((data) => {
    expect(data).toStrictEqual(user);
  });
});
