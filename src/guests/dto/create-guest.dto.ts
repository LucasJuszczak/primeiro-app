import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class CreateGuestDto{
    @IsString({message:"O nome precisa ser um texto!"})
    @IsNotEmpty({message:"O nome não pode ser vazio!"})
    @MinLength(5, {message:"O nome precisa ter no mínimo 5 caracteres!"})
    @MaxLength(40, {message:"O nome precisa ter no máximo 40 caracteres!"})
    readonly name: string

    @IsString({message:"O email precisa ser um texto!"})
    @IsNotEmpty({message:"O email não pode ser vazio!"})
    @MaxLength(40, {message:"O email precisa ter no máximo 40 caracteres!"})
    readonly email: string
}