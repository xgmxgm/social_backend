import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client'

import { createPostDto, deletePostDto, editPostDto } from './post.dto'

const prisma = new PrismaClient();

@Injectable()
export class PostService {
	async createPost(dto: createPostDto) {
		try {
			const post = await prisma.post.create({
				data: {
					title: dto.title,
					text: dto.text,
					imgURL: dto.imgURL || "",
					authorId: dto.authorId,
					tags: dto.tags
				}
			})

			return post;
		} catch (err) {
			console.error(err)
			throw new BadRequestException("Error")
		}
	}

	async deletePost(dto: deletePostDto) {
		try {
			const post = await prisma.post.delete({
				where: { id: dto.postId }
			})

			return post
		} catch (err) {
			console.error(err)
			throw new BadRequestException("Error")
		}
	}

	async editPost(dto: editPostDto) {
		try {
			const post = await prisma.post.update({
				where: { id: dto.postId },
				data: {
					title: dto.title,
					text: dto.text,
					imgURL: dto.imgURL,
					tags: dto.tags,
				}
			})

			return post
		} catch (err) {
			console.log(err)
			throw new BadRequestException("Error")
		}
	}
}