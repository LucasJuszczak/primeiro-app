import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength } from "class-validator"

export class CreateUserDto{
    @IsString({message:"The name field must be text!"})
    @IsNotEmpty({message:"The name field can't be empty!"})
    @MaxLength(40, {message:"The name field must have a maximum of 40 characters!"})
    readonly name: string

    @IsString()
    @IsStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })
    password: string

    @IsEmail()
    @IsString({message:"The email field must be text!"})
    @IsNotEmpty({message:"The email field can't be empty!"})
    @MaxLength(40, {message:"The email field must have a maximum of 40 characters!"})
    readonly email: string
}