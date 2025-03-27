import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';

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

    create(body: any){
        const newId = this.tasks.length + 1

        const newTask = {
            id: newId,
            ...body
        }

        this.tasks.push(newTask)

        return newTask
    }

    update(id: string, body: any){
        const taskIndex = this.tasks.findIndex(task => task.id === Number(id))

        if(taskIndex >= 0){
            const taskItem = this.tasks[taskIndex]

            this.tasks[taskIndex] = {
                ...taskItem,
                ...body
            }
        }

        return "Updated Task!"
    }

    remove(id: string){
        return "Deletando o id " + id
    }
}
