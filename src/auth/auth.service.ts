import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashingServiceProtocol } from './hash/hashing.service';
import jwtConfig from './config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private prisma: PrismaService,
        private readonly hashingService: HashingServiceProtocol,

        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
        private readonly jwtService: JwtService
    ) {}

    async authenticate(signInDto: SignInDto){
        const user = await this.prisma.user.findFirst({
            where: {
                email: signInDto.email
            }
        })

        if (!user)
            throw new HttpException("Failed to login!", HttpStatus.UNAUTHORIZED)

        //Validar a senha
        const passwordIsValid = await this.hashingService.compare(signInDto.password, user.passwordHash)

        if(!passwordIsValid)
            throw new HttpException("Failed to login!", HttpStatus.UNAUTHORIZED)

        const token = await this.jwtService.signAsync(
            {
                sub: user.id,
                email: user.email
            },
            {
                secret: this.jwtConfiguration.secret,
                expiresIn: this.jwtConfiguration.jwtTtl,
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer
            }
        )

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}