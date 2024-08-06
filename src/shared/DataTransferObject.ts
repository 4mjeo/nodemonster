import Joi from 'joi';
import { Post } from '../entity/post';
import { Restaurant } from '../entity/restaurant';

export class UserLoginInfo {
	email: string;
	password: string;
}

export class UpdateInfo {
	createdAt: Date;
	updatedAt: Date;
}

export class UserInfo {
	email: string;
	password: string;
	nickname: string;
}

export class UserUpdateInfo {
	id: number;
	nickname: string;
}

export class UserInfoResObj {
	id: number;
	email: string;
	nickname: string;
	createdAt: Date;
	updatedAt: Date;
}

export class ShowUserInfoResObj {
	id: number;
	email: string;
	nickname: string;
}

export class UserTokenResObj {
	access_token: string;
	refresh_token: string;
}

export class ProvideUserTokenDto {
    code: string;
}

export class PostInfo extends Post {
	id: number;
	title: string;
	content: string;
}

export class PostUpdateInfo extends Post {
	id: number;
	title: string;
	content: string;
}

export class RestaurantInfo extends Restaurant {
	id: number;
	restaurantName: string;
	minOrderPrice: number;
	deliveryFee: number;
	address: string;
	phoneNum: string;
	introduction: string;
}

export class RestaurantUpdateInfo extends Restaurant {
	id: number;
	restaurantName: string;
	minOrderPrice: number;
	deliveryFee: number;
	address: string;
	phoneNum: string;
	introduction: string;
}

export const ProvideUserTokenSchema: Joi.ObjectSchema<ProvideUserTokenDto> = Joi.object().keys({
	code: Joi.string().required(),
});
