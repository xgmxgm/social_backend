import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client'
import { JwtService } from "@nestjs/jwt"
import * as bcrypt from "bcrypt"

import { LoginDto } from './login.dto'

const prisma = new PrismaClient();

@Injectable()
export class LoginService {
	constructor(
		private jwtService: JwtService
	) {}

	async authUser(dto: LoginDto) {
		try {
			const user = await prisma.user.findFirst({
				where: {
					email: dto.email
				}
			})
	
			if (!user) {
				throw new BadRequestException();
			}
	
			const isValidPass = await bcrypt.compare(dto.password, user.passwordHash);
	
			if (!isValidPass) {
				throw new BadRequestException();
			}

			const posts = await prisma.post.findMany({
				where: {
					authorId: user.id
				}
			})

			const following = await prisma.following.findMany({
				where: {
					authorId: user.id
				}
			})

			const followers = await prisma.followers.findMany({
				where: {
					authorId: user.id
				}
			})
	
			const {passwordHash, ...userData} = user;

			const Data = {
				token: await this.jwtService.signAsync(userData),
				userData: userData,
				userPosts: posts,
				following,
				followers
			}

			return Data;
		} catch (err) {
			console.error(err)
			throw new BadRequestException("Wrong login or password !")
		}
	}
}