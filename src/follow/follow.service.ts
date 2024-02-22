import { BadRequestException, Injectable } from '@nestjs/common';
import { follow, followDelete } from './follow.dto'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

@Injectable()
export class FollowService {
	async follow(dto: follow) {
		try {
			// Other user
			const followingUser = await prisma.user.findFirst({
				where: { id: dto.userId }
			})
			
			if (!followingUser) {
				throw new BadRequestException("Not found user !");
			}

			// Me
			const followersUser = await prisma.user.findFirst({
				where: { id: dto.MyId }
			})
			
			if (!followersUser) {
				throw new BadRequestException("Not found user !");
			}

			await prisma.user.update({
				where: { id: followingUser.id },
				data: {
					followers: {
						create: {
							userId: followersUser.id,
							firstName: followersUser.firstName,
							lastName: followersUser.lastName,
							avatarURL: followersUser.avatarURL,
						}
					}
				}
			})

			await prisma.user.update({
				where: { id: followersUser.id },
				data: {
					following: {
						create: {
							userId: followingUser.id,
							firstName: followingUser.firstName,
							lastName: followingUser.lastName,
							avatarURL: followingUser.avatarURL,
						}
					}
				}
			})

			const { passwordHash, ...followingUserData } = followingUser

			return followingUserData
		} catch (err) {
			console.error(err)
			throw new BadRequestException();
		}
	}

	async followDelete(dto: followDelete) {
		try {
			const findFollowingUser = await prisma.following.findFirst({
				where: { id: dto.followingId }
			});

			const findFollowersUser = await prisma.followers.findFirst({
				where: { id: dto.followersId }
			});

			if (!findFollowingUser && !findFollowersUser) {
				throw new BadRequestException("Not found user")
			}

			const followingDeleteUser = await prisma.following.delete({
				where: { id: dto.followingId }
			});

			const followersDeleteUser = await prisma.followers.delete({
				where: { id: dto.followersId }
			});

			return [followingDeleteUser, followersDeleteUser]
		} catch (err) {
			console.error(err)
			throw new BadRequestException("Error");
		}
	}
}