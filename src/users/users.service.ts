import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { PaginationDto } from "src/common/dto/pagination.dto";


@Injectable()
export class UsersService {

    constructor(private readonly prismaService: PrismaService){}

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

            const user = await this.prismaService.user.update({
                where: {
                    id: findUser.id
                },
                data: {
                    name: updateUserDto.name ? updateUserDto.name : findUser.name
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