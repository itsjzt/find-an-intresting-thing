import { hashSync } from "bcryptjs";

export function createValidator({ user }) {
  return {
    ...user,
    password: hashSync(user.password),
  };
}
