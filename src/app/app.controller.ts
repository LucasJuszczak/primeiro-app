import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

/* @Get('novarota')
  getNewRoute(){
    return "Aqui é uma nova rota!"
  }

  @Post('novarota')
  createRoute(){
    return "Aqui cria-se uma nova rota!"
  }

  @Patch('novarota')
  updateRoute(){
    return "Atualizando a rota!"
  }

  @Delete('novarota')
  deleteRoute(){
    return "Deletando a rota!"
  } */
}
