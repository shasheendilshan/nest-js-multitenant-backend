import { SnakeNamingStrategy } from "./snake-naming.strategy";

import { join } from "path";

module.exports = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "10445609",
  database: "multitenant",
  namingStrategy: new SnakeNamingStrategy(),
  logging: true,
  autoLoadEntities: true,
  entities: [join(__dirname, "./modules/public/**/*.entity{.ts,.js}")],
  // migrations: [join(__dirname, "./migrations/public/*{.ts,.js}")],
  synchronize: true,
};
