/*
DTO (Data Transfer Object) - Objeto de Transferência de Dados
Objetivo: Validar dados, transformar.
É utilizado para representar quais dados e em que formatos 
uma determinada camada aceita e trabalha
*/

import { IsNotEmpty, IsString, MaxLength } from "class-validator"

export class CreateTaskDto{
    @IsString({message:"The name field must be text!"})
    @IsNotEmpty({message:"The name field can't be empty!"})
    @MaxLength(40, {message:"The name field must have a maximum of 40 characters!"})
    readonly name: string

    @IsString({message:"The description field must be text!"})
    @IsNotEmpty({message:"The description field can't be empty!"})
    @MaxLength(200, {message:"The description field must be a maximum of 200 characters!"})
    readonly description: string
}