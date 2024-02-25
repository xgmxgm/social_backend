import { BadRequestException, Injectable } from '@nestjs/common'
import { Prisma, PrismaClient } from '@prisma/client'
import { JwtService } from "@nestjs/jwt"
import * as bcrypt from "bcrypt"

import { RegisterDto } from './register.dto'

const prisma = new PrismaClient();

@Injectable()
export class RegisterService {
	constructor(
		private jwtService: JwtService
	) {}

	async createUser(dto: RegisterDto) {
		try {
			const salt = await bcrypt.genSalt(10);
			const passwordHashing = await bcrypt.hash( dto.password, salt );
	
			const NewUser = await prisma.user.create({
				data: {
					email: dto.email,
					firstName: dto.firstName,
					lastName: dto.lastName,
					passwordHash: passwordHashing,
					avatarURL: dto.avatarURL,
					}
			})
			
			const { passwordHash , ...userData } = NewUser;

			const Data = {
				token: await this.jwtService.signAsync(userData),
				userData,
			}

			return Data;
		} catch (err) {
			console.error(err)

			if (err instanceof Prisma.PrismaClientKnownRequestError) {
				if (err.code === 'P2002') {
					// throw new BadRequestException("Email has already been registered")
					
					const Data = {
						message: "Email has already been registered",
					};

					return Data;
				}
			}

			// throw new BadRequestException("Failed to register")
			
			const Data = {
				message: "Failed to register",
			};

			return Data;
		}
	}
}