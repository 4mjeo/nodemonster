import Joi from 'joi';

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

export class UserInfoResobj {
    id: number;
    email: string;
    nickname: string;
    createdAt: Date;
    updatedAt: Date;
}

export class ShowUserInfoResobj {
    id: number;
    email: string;
    nickname: string;
}

export class UserTokenResobj {
    access_token: string;
    refresh_token: string;
}

export class ProvideUserTokenDto {
    code: string;
}

export const ProvideUserTokenSchema: Joi.ObjectSchema<ProvideUserTokenDto> = Joi.object().keys({
    code: Joi.string().required(),
});