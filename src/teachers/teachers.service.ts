import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Teacher } from './entities/teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeachersService {
    private teachers: Teacher[] = [
        {
            id: 1,
            name: "Kishibe",
            registration: "0123456789",
            email: "teacher.kishibe@email.com"
        }
    ]

    findAll(){
        return this.teachers
    }

    findOne(id: number){
        const teacher = this.teachers.find(teacher => teacher.id === id)

        if(teacher) return teacher

        throw new HttpException("This teacher doesn't exist!", HttpStatus.NOT_FOUND)
    }

    create(createTeacherDto: CreateTeacherDto){
        const newId = this.teachers.length + 1

        const newTeacher = {
            id: newId,
            ...createTeacherDto,
        }

        this.teachers.push(newTeacher)

        return newTeacher
    }

    update(id: number, updateTeacherDto: UpdateTeacherDto){
        const teacherIndex = this.teachers.findIndex(teacher => teacher.id === id)

        if(teacherIndex < 0)
            throw new HttpException("This teacher doesn't exist!", HttpStatus.NOT_FOUND)

        const teacherItem = this.teachers[teacherIndex]

        this.teachers[teacherIndex] = {
            ...teacherItem,
            ...updateTeacherDto
        }

        return "Updated Teacher!"
    }

    remove(id: number){
        const teacherIndex = this.teachers.findIndex(teacher => teacher.id === id)

        if(teacherIndex < 0)
            throw new HttpException("This teacher doesn't exist!", HttpStatus.NOT_FOUND)

        this.teachers.splice(teacherIndex, 1)

        return "Deleted Teacher!!"
    }
}
