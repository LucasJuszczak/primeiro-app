import { Contains, IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator"

export class CreateTeacherDto{
    @IsString({message:"The name field must be text!"})
    @IsNotEmpty({message:"The name field can't be empty!"})
    @MaxLength(40, {message:"The name field must have a maximum of 40 characters!"})
    readonly name: string

    @IsString({message:"The registration field must be text!"})
    @IsNotEmpty({message:"The registration field can't be empty!"})
    @MaxLength(25, {message:"The registration field must have a maximum of 25 characters!"})
    readonly registration: string

    @IsEmail()
    @IsString({message:"The email field must be text!"})
    @IsNotEmpty({message:"The email field can't be empty!"})
    @MaxLength(40, {message:"The email field must have a maximum of 40 characters!"})
    readonly email: string

    @IsNumber()
    @IsNotEmpty()
    readonly guestId: number
}