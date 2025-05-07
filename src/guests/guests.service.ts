import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class GuestsService {

    constructor(private readonly prismaService: PrismaService){}

    async findAll(paginationDto: PaginationDto){
        const {limit = 10, offset = 0} = paginationDto

        const allGuests = await this.prismaService.guest.findMany({
            take:limit,
            skip: offset,
            orderBy:{
                created: 'desc'
            }
        })
        return allGuests
    }

    async findOne(id: number){
        const guest = await this.prismaService.guest.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,
                email: true,
                teacher: true
            }
        })

        if(guest) return guest

        throw new HttpException("This guest doesn't exist!", HttpStatus.NOT_FOUND)
    }

    async create(createGuestDto: CreateGuestDto){
        try{
            const newGuest = await this.prismaService.guest.create({
                data: {
                    name: createGuestDto.name,
                    email: createGuestDto.email,
                    presence: false
                }
            })
            return newGuest
        }catch(e){
            throw new HttpException("Unable to create guest!", HttpStatus.BAD_REQUEST)
        }
    }

    async update(id: number, updateGuestDto: UpdateGuestDto){
        try{
            const findGuest = await this.prismaService.guest.findFirst({
                where: {
                    id: id
                }
            })

            if (!findGuest)
                throw new HttpException("This guest doesn't exist!", HttpStatus.NOT_FOUND)

            const guest = await this.prismaService.guest.update({
                where: {
                    id: findGuest.id
                },
                data: updateGuestDto
            })
            return guest
        } catch(e){
            throw new HttpException("Unable to update guest!", HttpStatus.BAD_REQUEST)
        }
    }

    async delete(id: number){
        try{
            const findGuest = await this.prismaService.guest.findFirst({
                where: {
                    id: id
                }
            })

            if(!findGuest)
                throw new HttpException("This guest doesn't exist!", HttpStatus.NOT_FOUND)

            await this.prismaService.guest.delete({
                where: {
                    id: findGuest.id
                }
            })
            return "Deleted guest sucessfully!"
        } catch(e){
            throw new HttpException("Unable to delete guest!", HttpStatus.BAD_REQUEST)
        }
    }
}
