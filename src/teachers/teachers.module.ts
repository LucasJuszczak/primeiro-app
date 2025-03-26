import { Module } from "@nestjs/common";
import { TeachersController } from "./teachers.controller";
import { TeachersService } from "./teachers.service";


@Module({
    imports: [],
    controllers: [TeachersController],
    providers: [TeachersService],
    exports: []
})
export class TeachersModule {}