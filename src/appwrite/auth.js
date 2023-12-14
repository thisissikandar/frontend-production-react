import { Account, Client, ID } from "appwrite";
import config from "../config/config.js";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setEndpoint(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      //  Whenever user Async await in try catch block
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        // return userAccount;
        // Another method
        // if you want user logeed in when register
        this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }
    return null;
  }

  async logOut() {
    try {
      await this.account.deleteSessions("current");
    } catch (error) {
      console.log("Appwrite Service :: logout :: error", error);
    }
  }
}

const authService = new AuthService();

export default authService;
