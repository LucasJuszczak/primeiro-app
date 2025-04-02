import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";


@Injectable()
export class UsersService {
    private users: User[] = [
        {
            id: 1,
            name: "Usuário 01",
            email: "user.usuario01@email.com"
        }
    ]

    findAll(){
        return this.users
    }

    findOne(id: string){
        const user = this.users.find(user => user.id === Number(id))

        if(user) return user
        
        throw new HttpException("This user doesn't exist!", HttpStatus.NOT_FOUND)
    }

    create(createUserDto: CreateUserDto){
        const newId = this.users.length + 1

        const newUser = {
            id: newId,
            ...createUserDto
        }

        this.users.push(newUser)

        return newUser
    }

    update(id: string, updateUserDto: UpdateUserDto){
        const userIndex = this.users.findIndex(user => user.id === Number(id))

        if(userIndex < 0)
            throw new HttpException("This user doesn't exist!", HttpStatus.NOT_FOUND)

        const userItem = this.users[userIndex]

        this.users[userIndex] = {
            ...userItem,
            ...updateUserDto
        }

        return "Updated User!!"
    }

    remove(id: string){
        const userIndex = this.users.findIndex(user => user.id === Number(id))

        if(userIndex < 0)
            throw new HttpException("This user doesn't exist!", HttpStatus.NOT_FOUND)

        this.users.splice(userIndex, 1)

        return "Deleted User!!"
    }
}