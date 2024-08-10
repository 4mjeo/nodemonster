import jwt from 'jsonwebtoken';
import { config } from '../config';
import { User } from '../entity/user';
import { UserRepository } from '../repository/user.repository';
import { UserType } from '../entity/enum/usertype';
import {
	UpdateInfo,
	UserInfo,
	UserInfoResObj,
	UserLoginInfo,
	UserTokenResObj,
	UserUpdateInfo,
} from '../shared/DataTransferObject';
import {
	ConflictError,
	ForbiddenError,
	NotFoundError,
	UnAuthorizedError,
} from '../shared/exception';
import { comparePassword, generateHash } from '../utils/hash';

export class UserService {
	constructor(private userRepository: UserRepository) {}

	async getUser(id: number): Promise<{ email: string; nickname: string } & UpdateInfo> {
		const user = await this.userRepository.findUserById(id);
		if (!user) {
			throw new NotFoundError('User Not Found');
		}
		const { email, nickname, createdAt, updatedAt } = user;
		return { email, nickname, createdAt, updatedAt };
	}

	async createUser(userInfo: UserInfo): Promise<{ id: number } & UpdateInfo & UserTokenResObj> {
		const alreadyRegisteredUser = await this.userRepository.findUserByEmail(userInfo.email);
		if (alreadyRegisteredUser) {
			throw new ConflictError();
		}
	
		const hashedPassword = generateHash(userInfo.password);
	
		const userInfoToCreate = { ...userInfo, password: hashedPassword };
		const { id, createdAt, updatedAt, userType } = await this.userRepository.createUser(userInfoToCreate);
	
		return {
			id,
			createdAt,
			updatedAt,
			access_token: await this.issuanceToken(userInfo.email, userType, 'access'),
			refresh_token: await this.issuanceToken(userInfo.email, userType, 'refresh'),
		};
	}

	async login({ email, password }: UserLoginInfo): Promise<UserTokenResObj> {
		const user = await this.userRepository.findUserByEmail(email);

		if (!user) {
			throw new NotFoundError('User Not Found');
		}

		const isValid = comparePassword(user.password, password);
		if (!isValid) {
			throw new UnAuthorizedError();
		}

		return {
			access_token: await this.issuanceToken(user.email, user.userType, 'access'),
			refresh_token: await this.issuanceToken(user.email, user.userType, 'refresh'),
		};
	}

	async updateUserInfo(userUpdateInfo: UserUpdateInfo): Promise<UserUpdateInfo & UpdateInfo> {
		const user = await this.userRepository.findUserById(userUpdateInfo.id);

		if (!user) {
			throw new ForbiddenError();
		} else {
			const { id, nickname, createdAt, updatedAt } = await this.userRepository.updateUserInfo(
				userUpdateInfo,
			);
			return {
				id,
				nickname,
				createdAt,
				updatedAt,
			};
		}
	}

	async cancelMember(id: number, password: string): Promise<void> {
		const user = await this.userRepository.findUserById(id);

		if (!user) throw new NotFoundError('User Not Found');

		const isValid = comparePassword(user.password, password);
		if (!isValid) {
			throw new UnAuthorizedError('Password MisMatch Error');
		} else {
			this.userRepository.cancelMember(id);
		}
	}

	public async refreshToken(email: string, refreshToken: string): Promise<UserTokenResObj> {
		const user = await this.userRepository.findUserByEmail(email);
		if (!user) {
			throw new NotFoundError('User Not Found');
		}
		const accessToken: string = await this.issuanceToken(email, user.userType, 'access');
		return {
			access_token: accessToken,
			refresh_token: refreshToken,
		};
	}

	public async showUserInfo(id: string): Promise<UserInfoResObj> {
		const user = await this.userRepository.findUserByIdentity(id);

		if (!user) {
			throw new NotFoundError('User Not Found');
		}
		return { ...user };
	}

	public async showMyInfo(user: User) {
		return this.userRepository.getMyInfo(user);
	}

	private async issuanceToken(email: string, userType: UserType, type: string): Promise<string> {
		const user = await this.userRepository.findUserByEmail(email);
		return jwt.sign(
			{
				sub: `${email}`,
				id: user.id,
				userType,
				type,
			},
			config.jwtSecret,
			{
				algorithm: 'HS256',
				expiresIn: type === 'access' ? '2h' : '14d',
			},
		);
	}
}
