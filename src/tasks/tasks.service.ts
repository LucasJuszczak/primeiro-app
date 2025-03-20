import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {

    findAll(){
        return [
            {
                id : 1,
                task: "Aprendendo NestJS"
            },
            {
                id : 2,
                task: "Estudando NestJS"
            }
        ]
    }

    findOne(){
        return "Retornando apenas uma tarefa!"
    }

//    create()

//    update()

//    remove()
}
