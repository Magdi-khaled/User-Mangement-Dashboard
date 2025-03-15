import { defineStore } from "pinia";
import type { User } from "../types/user";

export const useUsersStore = defineStore("users", {
  state: (): User => ({
    id: null,
    name: "",
    email: "",
    password: "",
    role: null,
    status: null,
  }),
  getters: {
    
  },
  actions: {
    async addUser(user: User) {
      try {
        console.log(user);
      } catch (err) {
        console.error("Add User Error", err);
      }
    },
    async editUser(
      name: string,
      password: string,
      role: string,
      status: string
    ) {
      try {
        console.log(name);
        console.log(password);
        console.log(role);
        console.log(status);
      } catch (err) {
        console.error("Edit User Error", err);
      }
    },
  },
});
