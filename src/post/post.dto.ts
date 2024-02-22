import { IsArray, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator'

export class createPostDto {
	@IsString()
	title: string;

	@IsString()
	text: string;

	@IsUrl()
	@IsOptional()
	imgURL?: string;

	@IsNumber()
	authorId: number;

	@IsArray()
	tags: string[];
}

export class deletePostDto {
	@IsNumber()
	postId: number;
}

export class editPostDto {
	@IsNumber()
	postId: number;

	@IsString()
	title: string;

	@IsString()
	text: string;

	@IsOptional()
	@IsUrl()
	imgURL: string;

	@IsArray()
	tags: string[];
}