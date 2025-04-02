import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

/*
- app.module.ts : É o módulo principal do aplicativo
- app.controller.ts : Define as rotas e lida com as requisições
- app.service.ts : Contém a lógica do negócio, separado do controlador
*/

// Metódo que inicia o nosso projeto
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe) //Trabalhar com validação global
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
