import { Injectable } from '@nestjs/common';
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
        return [
            {
                id : 1,
                name: "Aprendendo NestJS"
            },
            {
                id : 2,
                name: "Estudando NestJS"
            }
        ]
    }

    findOne(id: string){
        return "Tarefa de id: " + id
    }

    create(body: any){
        return body
    }

    update(id: string, body: any){
        return "Atualizando o id " + id
    }

    remove(id: string){
        return "Deletando o id " + id
    }
}
