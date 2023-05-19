require("dotenv").config();

export class Environment {
  static current: string = (process.env.DCX_ENV ||
    process.env.NODE_ENV) as string;
  static node: string = process.env.NODE_ENV as string;

  static isTest(): boolean {
    return Environment.node == "test";
  }

  static isDevelopment(): boolean {
    return Environment.node == "development";
  }

  static isStaging(): boolean {
    return Environment.node == "staging";
  }

  static isPreprod(): boolean {
    return Environment.current == "preprod";
  }

  static isProduction(): boolean {
    return Environment.node == "production";
  }
}