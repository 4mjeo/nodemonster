import { REFRESH_TOKEN_COOKIE_KEY } from '../constants/auth';
import { UserRepository } from '../repository/user.repository';
import { UserService } from '../service/user.service';
import { BusinessLogic } from '../shared/BusinessLogicInterface';
import {
	ShowUserInfoResObj,
	UserInfo,
	UserInfoResObj,
	UserLoginInfo,
	UserTokenResObj,
	UserUpdateInfo,
} from '../shared/DataTransferObject';

export class UserController {
	private userService: UserService = new UserService(UserRepository.getQueryRepository());

	public createUser: BusinessLogic = async (req, res, next) => {
		const userInfoToCreate = req.body as UserInfo;

		const response: UserTokenResObj = await this.userService.createUser(userInfoToCreate);
		return res.status(201).json(response);
	};

	public login: BusinessLogic = async (req, res, next) => {
		const userInfoToLogin = req.body as UserLoginInfo;

		const response: UserTokenResObj = await this.userService.login(userInfoToLogin);
		return res.status(200).json(response);
	};

	public updateInfo: BusinessLogic = async (req, res, next) => {
		const { nickname } = req.body;
		const { id } = req.decoded;

		const response: UserUpdateInfo = await this.userService.updateUserInfo({ nickname, id });
		return res.status(200).json(response);
	};

	public logout: BusinessLogic = async (req, res, next) => {
		try {
			res.clearCookie(REFRESH_TOKEN_COOKIE_KEY);
			return res.status(204).end();
		} catch (err) {
			next(err);
		}
	};

	public cancelMember: BusinessLogic = async (req, res, next) => {
		const response = await this.userService.cancelMember(req.decoded.id, req.body.password);

		return res.status(204).json(response);
	};

	public refreshToken: BusinessLogic = async (req, res, next) => {
        try {
            const refreshTokenHeader = req.headers['refresh-token'] as string;
            const refreshToken: string = refreshTokenHeader.slice(7);
    
            const response: UserTokenResObj = await this.userService.refreshToken(
                req.decoded.sub,
                refreshToken,
            );
            return res.status(200).json(response);
        } catch (err) {
            next(err);
        }
    };

	public showUserInfo: BusinessLogic = async (req, res, next) => {
		const response: UserInfoResObj = await this.userService.showUserInfo(req.params.id);
		return res.status(200).json(response);
	};

	public showMyInfo: BusinessLogic = async (req, res, next) => {
		const user = req.decoded;

		const response: ShowUserInfoResObj = await this.userService.showMyInfo(user);
		return res.status(200).json(response);
	};
}