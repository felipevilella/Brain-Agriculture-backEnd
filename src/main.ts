import { NestFactory } from "@nestjs/core";
import * as cors from "cors";

import { AppModule } from "./module/app.module";
import { AllExceptionsFilter } from "./infra/helpers/all-exceptions.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(3333);
}

bootstrap().catch((error) => {
  console.error("Error start application:", error);
  process.exit(1);
});
