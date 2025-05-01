import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";


@Injectable()
export class AuthAdminGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const request = context.switchToHttp().getRequest()
        //Verificando se existe o user que vem do middleware

        console.log("-------------------------------------")
        console.log(request['user'])
        console.log("-------------------------------------")

        if(request['user']?.role === 'admin')
            return true

        return false // true = Seguir o fluxo, false = Parar o fluxo
    }
}