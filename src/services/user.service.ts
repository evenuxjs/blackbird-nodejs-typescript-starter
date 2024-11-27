import { findAllUsers, User } from "../models";

export const listUsers = async (): Promise<User[] | null> => {
  const users = await findAllUsers();
  if (!users || !users.length) {
    return null;
  }

  for (const user of users) {
    delete user.password;
  }

  return users;
};
