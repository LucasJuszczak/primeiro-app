import { Contains, IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator"

export class CreateTeacherDto{
    @IsString({message:"O campo do nome precisa ser um texto!"})
    @IsNotEmpty({message:"O campo do nome não pode ser vazio!"})
    @MaxLength(40, {message:"O campo do nome precisa ter no máximo 40 caracteres!"})
    readonly name: string

    @IsString({message:"O campo da matrícula precisa ser um texto!"})
    @IsNotEmpty({message:"O campo da matrícula não pode ser vazio!"})
    @MaxLength(25, {message:"O campo da matrícula precisa ter no máximo 25 caracteres!"})
    readonly registration: string

    @IsEmail()
    @IsString({message:"O campo de email precisa ser um texto!"})
    @IsNotEmpty({message:"O campo de email não pode ser vazio!"})
    @MaxLength(40, {message:"O campo de email precisa ter no máximo 40 caracteres!"})
    readonly email: string
}