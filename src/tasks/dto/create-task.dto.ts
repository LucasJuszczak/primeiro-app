/*
DTO (Data Transfer Object) - Objeto de Transferência de Dados
Objetivo: Validar dados, transformar.
É utilizado para representar quais dados e em que formatos 
uma determinada camada aceita e trabalha
*/

import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class CreateTaskDto{
    @IsString({message:"O nome precisa ser um texto!"})
    @IsNotEmpty({message:"O nome não pode ser vazio!"})
//  @MinLength(5, {message:"O nome precisa ter no mínimo 5 caracteres!"})
    @MaxLength(30, {message:"O nome precisa ter no máximo 30 caracteres!"})
    readonly name: string

    @IsString({message:"A descrição precisa ser um texto!"})
    @IsNotEmpty({message:"A descrição não pode ser vazia!"})
    @MaxLength(200, {message:"A descrição precisar ter no máximo 200 caracteres!"})
    readonly description: string
}