import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt"

import { RegisterDto } from './register.dto'

const prisma = new PrismaClient();

@Injectable()
export class RegisterService {
	async createUser(dto: RegisterDto) {
		try {
			console.log(dto)

			const salt = await bcrypt.genSalt(10);
			const passwordHashing = await bcrypt.hash( dto.password, salt );
	
			const NewUser = await prisma.user.create({
				data: {
					email: dto.email,
					firstName: dto.firstName,
					lastName: dto.lastName,
					passwordHash: passwordHashing,
					avatarURL: dto.avatarURL || "",
					}
			})
			
			const { passwordHash , ...userData } = NewUser;

			return { userData };
		} catch (err) {
			console.error(err)
			throw new BadRequestException("Error")
		}
	}
}