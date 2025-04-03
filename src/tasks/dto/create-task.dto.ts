/*
DTO (Data Transfer Object) - Objeto de Transferência de Dados
Objetivo: Validar dados, transformar.
É utilizado para representar quais dados e em que formatos 
uma determinada camada aceita e trabalha
*/

import { IsNotEmpty, IsString, MaxLength } from "class-validator"

export class CreateTaskDto{
    @IsString({message:"O campo do nome precisa ser um texto!"})
    @IsNotEmpty({message:"O campo do nome não pode ser vazio!"})
    @MaxLength(40, {message:"O campo do nome precisa ter no máximo 40 caracteres!"})
    readonly name: string

    @IsString({message:"O campo de descrição precisa ser um texto!"})
    @IsNotEmpty({message:"O campo de descrição não pode ser vazia!"})
    @MaxLength(200, {message:"O campo de descrição precisa ter no máximo 200 caracteres!"})
    readonly description: string
}