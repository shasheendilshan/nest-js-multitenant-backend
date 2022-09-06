import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { getConnection, getManager } from "typeorm";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

import { AppModule } from "./app.module";
import { getTenantConnection } from "./modules/tenancy/tenancy.utils";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await getConnection().runMigrations();

  const schemas = await getManager().query(
    "select schema_name as name from information_schema.schemata;"
  );

  for (let i = 0; i < schemas.length; i += 1) {
    const { name: schema } = schemas[i];

    if (schema.startsWith("tenant_")) {
      const tenantId = schema.replace("tenant_", "");
      const connection = await getTenantConnection(tenantId);
      await connection.runMigrations();
      await connection.close();
    }
  }

  const config = new DocumentBuilder()
    .setTitle("Multi-tenant Nest Js Api")
    .setDescription("Modern walk multi-tenant backend")
    .setVersion("1.0")
    .addTag("Modern walk")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
