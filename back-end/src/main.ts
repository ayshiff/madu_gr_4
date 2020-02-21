import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as helmet from "helmet";
import * as rateLimit from "express-rate-limit";
import { AppModule } from "./app.module";
import { DataFormatterInterceptor } from "./interceptor/data-formatter.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // global
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new DataFormatterInterceptor());

  // security
  app.use(helmet());
  app.enableCors();
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // limit each IP to 100 requests per windowMs
    })
  );

  // swagger
  const options = new DocumentBuilder()
    .setTitle("Madu")
    .setDescription("The OpenAPI documentation for Madu")
    .setVersion("1.0")
    .addTag("User")
    .addTag("Company")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("", app, document);
  await app.listen(3000);
}
bootstrap();
