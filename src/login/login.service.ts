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
				const Data = {
					message: "Wrong login or password",
				};

				return Data
			}
	
			const isValidPass = await bcrypt.compare(dto.password, user.passwordHash);
	
			if (!isValidPass) {
				const Data = {
					message: "Wrong login or password",
				};

				return Data
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

			const friends = await prisma.friends.findMany({
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
				friends
			}

			return Data;
		} catch (err) {
			console.error(err)

			const Data = {
				message: "Failed to log in",
			};

			return Data;
		}
	}
}