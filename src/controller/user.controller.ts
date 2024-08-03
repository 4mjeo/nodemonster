import { response } from "express";
import { REFRESH_TOKEN_COOKIE_KEY } from "../constants/auth";
import { UserRepository } from '../repository/user.repository';
import { UserService } from '../service/user.service';
import { BusinessLoigc } from "../shared/BusinessLogicInterface";
import {
    ShowUserInfoResobj,
    UserInfo,
    UserInfoResobj,
    UserLoginInfo,
    UserTokenResobj,
    UserUpdateInfo,
} from '../shared/DataTransferObject';

export class UserController {
    private userService: UserService = new UserService(UserRepository.getQueryRepository());

    public createUser: BusinessLoigc = async (req, res, next) => {
        const userInfoToCreate = req.body as UserInfo;

        const response: UserTokenResobj = await this.userService.createUser(userInfoToCreate);
        return res.status(201).json(response);
    };

    public login: BusinessLoigc = async (req, res, next) => {
        const userInfoToLogin = req.body as UserLoginInfo;

        const response: UserTokenResobj = await this.userService.login(userInfoToLogin);
        return res.status(200).json(response);
    }

    public updateInfo: BusinessLoigc = async (req, res, next) => {
        const { nickname } = req.body;
        const { id } = req.decoded;

        const response: UserUpdateInfo = await this.userService.updateUserInfo({ nickname, id });
        return res.status(200).json(response);
    };

    public cancelMember: BusinessLoigc = async (req, res, next) => {
        const response = await this.userService.cancelMember(req.decoded.id, req.body.password);
    
        return res.status(204).json(response);
      };

    public refreshToken: BusinessLoigc = async (req, res, next) => {
        const refreshToken: string = req.headers.authorization['refresh-token'] as string;
        const response: UserTokenResobj = await this.userService.refreshToken(
            req.decoded.sub,
            refreshToken.slice(7),
        );
        return res.status(200).json(response);
    };

    public showUserInfo: BusinessLoigc = async (req, res, next) => {
        const response: UserInfoResobj = await this.userService.showUserInfo(req.params.id);
        return res.status(200).json(response);
    };

    public showMyInfo: BusinessLoigc = async (req, res, next) => {
        const user = req.decoded;

        const repponse: ShowUserInfoResobj = await this.userService.showMyInfo(user);
        return res.status(200).json(response);
    };

    public logout: BusinessLoigc = async (req, res, next) => {
        try {
            res.clearCookie(REFRESH_TOKEN_COOKIE_KEY);
            return res.status(204).end();
        } catch (err) {
            next(err);
        }
    };
}