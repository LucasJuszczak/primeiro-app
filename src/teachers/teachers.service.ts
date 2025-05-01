import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Teacher } from './entities/teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class TeachersService {

    constructor(private readonly prismaService: PrismaService){}

    async findAll(paginationDto: PaginationDto){
        const {limit = 10, offset = 0} = paginationDto

        const allTeachers = await this.prismaService.teacher.findMany({
            take:limit,
            skip: offset,
            orderBy:{
                created: 'desc'
            }
        })
        return allTeachers
    }

    async findOne(id: number){
        const teacher = await this.prismaService.teacher.findFirst({
            where: {
                id: id
            }
        })

        if(teacher?.name) return teacher

        throw new HttpException("This teacher doesn't exist!", HttpStatus.NOT_FOUND)
    }

    async create(createTeacherDto: CreateTeacherDto){
        try{
            const newTeacher = await this.prismaService.teacher.create({
                data: {
                    name: createTeacherDto.name,
                    registration: createTeacherDto.registration,
                    email: createTeacherDto.email
                }
            })
            return newTeacher
        }catch(e){
            throw new HttpException("Unable to create teacher!", HttpStatus.BAD_REQUEST)
        }
    }

    async update(id: number, updateTeacherDto: UpdateTeacherDto){
        try{
            const findTeacher = await this.prismaService.teacher.findFirst({
                where: {
                    id: id
                }
            })

            if (!findTeacher)
                throw new HttpException("This teacher doesn't exist!", HttpStatus.NOT_FOUND)

            const teacher = await this.prismaService.teacher.update({
                where: {
                    id: findTeacher.id
                },
                data: {
                    name: updateTeacherDto.name ? updateTeacherDto.name : findTeacher.name,
                    registration: updateTeacherDto.registration ? updateTeacherDto.registration : findTeacher.registration,
                    email: updateTeacherDto.email ? updateTeacherDto.email : findTeacher.email
                }
            })
            return teacher
        } catch(e){
            throw new HttpException("Unable to update teacher!", HttpStatus.BAD_REQUEST)
        }
    }

    async delete(id: number){
        try{
            const findTeacher = await this.prismaService.teacher.findFirst({
                where: {
                    id: id
                }
            })

            if(!findTeacher)
                throw new HttpException("This teacher doesn't exist!", HttpStatus.NOT_FOUND)

            await this.prismaService.teacher.delete({
                where: {
                    id: findTeacher.id
                }
            })
            return "Deleted teacher sucessfully!"
        } catch(e){
            throw new HttpException("Unable to delete teacher!", HttpStatus.BAD_REQUEST)
        }
    }
}
