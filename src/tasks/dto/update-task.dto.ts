import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator"
import { CreateTaskDto } from "./create-task.dto"
import { PartialType } from "@nestjs/mapped-types"

export class UpdateTaskDto extends PartialType(CreateTaskDto){


    @IsBoolean()
    @IsOptional()
    readonly completed?: boolean
}