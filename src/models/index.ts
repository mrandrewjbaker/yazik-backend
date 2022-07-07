import { Sequelize } from "sequelize-typescript";
import { Dialect } from "sequelize/types";

import { User } from "./user-model";

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT as Dialect,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
  models: [User],
});

export default sequelize;
