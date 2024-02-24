import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator'

export class follow {
	@IsNumber()
	userId: number;

	@IsNumber()
	MyId: number;
}

export class followDelete {
	@IsNumber()
	followingId: number;

	@IsNumber()
	friendsId: number;
}