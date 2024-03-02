import { IsOptional, IsString, IsUrl, MinLength } from 'class-validator'

export class RegisterDto {
	@IsString()
	firstName: string;

	@IsString()
	lastName: string;

	@IsString()
	email: string;

	@IsString()
	@MinLength(6)
	password: string;
	
	@IsOptional()
	@IsUrl()
	avatarURL: string;
}