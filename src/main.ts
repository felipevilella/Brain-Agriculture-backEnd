import { NestFactory } from "@nestjs/core";
import * as cors from "cors";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

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

  const config = new DocumentBuilder()
    .setTitle("Brain Agriculture API")
    .setDescription("Esta API tem como objetivo gerenciar o cadastro de produtores rurais e suas respectivas propriedades, áreas e culturas agrícolas. Ela permite o armazenamento e a consulta de informações essenciais sobre a produção agrícola no Brasil.")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(3333);
}

bootstrap().catch((error) => {
  console.error("Error start application:", error);
  process.exit(1);
});
