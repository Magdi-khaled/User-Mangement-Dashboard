import { defineStore } from "pinia";
import type { User } from "../types/user";
import { users } from "../composables/useUsers";
import axios from "axios";

const apiDelay = () =>
  new Promise((resolve) => setTimeout(resolve, Math.random() * 500 + 300));

export const useUserStore = defineStore("users", {
  state: () => ({
    users: users as User[],
  }),
  actions: {
    async fetchUsers(query = "") {
      try {
        await apiDelay();
        console.log(query);
        // const response = axios.get(`/api/get/users/:${query}`);
        // this.users = response.data;
        let filteredUsers: User[] = [...this.users];

        // Filtering
        if (query) {
          filteredUsers = filteredUsers.filter(
            (user) =>
              user.name.toLowerCase().includes(query.toLowerCase()) ||
              user.email.toLowerCase().includes(query.toLowerCase())
          );
        }

        return filteredUsers;
      } catch (err) {
        console.error("Fetching Erorr", err);
      }
    },
    async createUser(newUser: Omit<User, "id">) {
      try {
        await apiDelay();
        // const response = axios.post("/api/users",newUser);
        const id = this.users.length + 1;
        const user = { id, ...newUser };
        this.users.push(user);
      } catch (err) {
        console.error("Add User Error", err);
      }
    },
    async editUser(id: number, name: string, role: string, status: string) {
      try {
        await apiDelay();
        // const response = axios.post(`/api/users/:${id}`, newUser);

        const userIndex = this.users.findIndex((u) => u.id === id);

        if (userIndex !== -1) {
          const updatedUser = { ...this.users[userIndex], name, role, status };
          this.users[userIndex] = updatedUser;
        } else {
          console.error("User Not Found");
        }
      } catch (err) {
        console.error("Update User Error", err);
      }
    },
    async deleteUser(id: number) {
      try {
        await apiDelay();

        // const response = axios.delete("/api/users/:${id}");
        const userIndex = this.users.findIndex((u) => u.id === id);
        if (userIndex === -1) {
          console.error("User Not Found");
          return;
        }
        // Remove the user from the list
        this.users.splice(userIndex, 1);
        console.log(`User with ID ${id} has been deleted.`);
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    },
  },
});
