import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    //Lista em memória para teste!
    private tasks: Task[] = [
        {
            id: 1,
            name: "NestJS",
            description: "First task",
            completed: false
        }
    ]

    findAll(){
        return this.tasks
    }

    findOne(id: string){
        const task = this.tasks.find(task => task.id === Number(id))

        if(task) return task

        throw new HttpException("This task doesn't exist!", HttpStatus.NOT_FOUND)
    }

    create(createTaskDto: CreateTaskDto){
        const newId = this.tasks.length + 1

        const newTask = {
            id: newId,
            ...createTaskDto,
            completed: false
        }

        this.tasks.push(newTask)

        return newTask
    }

    update(id: string, updateTaskDto: UpdateTaskDto){
        const taskIndex = this.tasks.findIndex(task => task.id === Number(id))

        if(taskIndex < 0)
            throw new HttpException("This task doesn't exist!", HttpStatus.NOT_FOUND)

        const taskItem = this.tasks[taskIndex]

        this.tasks[taskIndex] = {
            ...taskItem,
            ...updateTaskDto
        }

        return "Updated Task!"
    }

    remove(id: string){
        const taskIndex = this.tasks.findIndex(task => task.id === Number(id))

        if(taskIndex < 0)
            throw new HttpException("This task doesn't exist!", HttpStatus.NOT_FOUND)

        this.tasks.splice(taskIndex, 1)

        return "Deleted Task!!"
    }
}
