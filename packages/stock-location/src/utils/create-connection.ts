import { MikroORM, PostgreSqlDriver } from "@mikro-orm/postgresql"
import { types } from "pg"
import { ModuleServiceInitializeOptions } from "@medusajs/types"

export async function createConnection(
  database: ModuleServiceInitializeOptions["database"],
  entities: any[]
) {
  const schema = database.schema || "public"
  const orm = await MikroORM.init<PostgreSqlDriver>({
    discovery: { disableDynamicFileAccess: true },
    entities,
    debug: database.debug ?? process.env.NODE_ENV?.startsWith("dev") ?? false,
    baseDir: process.cwd(),
    clientUrl: database.clientUrl,
    schema,
    driverOptions: database.driverOptions ?? {
      connection: { ssl: true },
    },
    tsNode: process.env.APP_ENV === "development",
    type: "postgresql",
    migrations: {
      path: __dirname + "/../migrations",
    },
  })

  types.setTypeParser(1700, (val) => val)

  return orm
}