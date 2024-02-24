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
			const friendsUser = await prisma.user.findFirst({
				where: { id: dto.MyId }
			})
			
			if (!friendsUser) {
				throw new BadRequestException("Not found user !");
			}

			await prisma.user.update({
				where: { id: followingUser.id },
				data: {
					friends: {
						create: {
							userId: friendsUser.id,
							firstName: friendsUser.firstName,
							lastName: friendsUser.lastName,
							avatarURL: friendsUser.avatarURL,
						}
					}
				}
			})

			await prisma.user.update({
				where: { id: friendsUser.id },
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

			const findFriendsUser = await prisma.friends.findFirst({
				where: { id: dto.friendsId }
			});

			if (!findFollowingUser && !findFriendsUser) {
				throw new BadRequestException("Not found user")
			}

			const followingDeleteUser = await prisma.following.delete({
				where: { id: dto.followingId }
			});

			const friendsDeleteUser = await prisma.friends.delete({
				where: { id: dto.friendsId }
			});

			return [followingDeleteUser, friendsDeleteUser]
		} catch (err) {
			console.error(err)
			throw new BadRequestException("Error");
		}
	}
}