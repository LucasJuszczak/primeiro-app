import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { HashingServiceProtocol } from "src/auth/hash/hashing.service";


@Injectable()
export class UsersService {

    constructor(private readonly prismaService: PrismaService,
                private readonly hashingService: HashingServiceProtocol) {}

    async findAll(paginationDto: PaginationDto){
        const {limit = 10, offset = 0} = paginationDto

        const allTasks = await this.prismaService.user.findMany({
            take:limit,
            skip: offset,
            orderBy:{
                created: 'desc'
            }
        })
        return allTasks
    }

    async findOne(id: number){
        const user = await this.prismaService.user.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,
                email: true,
                task: true
            }
        })

        if(user) return user

        throw new HttpException("User not found!", HttpStatus.NOT_FOUND)
    }

    async create(createUserDto: CreateUserDto){
        try{
            const newUser = await this.prismaService.user.create({
                data: {
                    name: createUserDto.name,
                    passwordHash: createUserDto.password,
                    email: createUserDto.email
                },
                select:{
                    id: true,
                    name: true,
                    email: true
                }
            })
            return newUser
        }catch(e){
            throw new HttpException("Unable to create user!", HttpStatus.BAD_REQUEST)
        }
    }

    async update(id: number, updateUserDto: UpdateUserDto){
        try{
            const findUser = await this.prismaService.user.findFirst({
                where: {
                    id: id
                }
            })

            if (!findUser)
                throw new HttpException("This user doesn't exist!", HttpStatus.NOT_FOUND)

            const dataUser: { name?: string, passwordHash?: string } = {
                name: updateUserDto.name ? updateUserDto.name : findUser.name
            }

            if (updateUserDto?.password){
                const passwordHash = await this.hashingService.hash(updateUserDto?.password)
                dataUser['passwordHash'] = passwordHash
            }

            const user = await this.prismaService.user.update({
                where: {
                    id: findUser.id
                },
                data: {
                    name: dataUser.name,
                    passwordHash: dataUser?.passwordHash ? dataUser?.passwordHash : findUser.passwordHash
                },
                select:{
                    id: true,
                    name: true,
                    email: true
                }
            })
            return user
        } catch(e){
            throw new HttpException("Unable to update user!", HttpStatus.BAD_REQUEST)
        }
    }

    async delete(id: number){
        try{
            const findUser = await this.prismaService.user.findFirst({
                where: {
                    id: id
                }
            })

            if(!findUser)
                throw new HttpException("This user doesn't exist!", HttpStatus.BAD_REQUEST)

            await this.prismaService.user.delete({
                where: {
                    id: findUser.id
                }
            })
            return "Deleted user sucessfully!"
        } catch(e){
            throw new HttpException("Unable to delete user!", HttpStatus.BAD_REQUEST)
        }
    }
}