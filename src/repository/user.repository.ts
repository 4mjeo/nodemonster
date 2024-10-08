import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { User } from '../entity/user';
import { UserInfo, UserUpdateInfo } from '../shared/DataTransferObject';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
	static getQueryRepository() {
		return getCustomRepository(UserRepository);
	}

	async findUserById(id: number): Promise<User> {
		const user = await this.findOne(id);
		return user;
	}

	async findUserByEmail(email: string): Promise<User> {
		const user = await this.findOne({ email });
		return user;
	}

	async createUser(userInfo: UserInfo): Promise<User> {
		const newUser = this.create(userInfo);
		const createUser = await this.save(newUser);
		return createUser;
	}

	async findUserByIdentity(id: string): Promise<User> {
		return this.createQueryBuilder('user')
			.select('user.id')
			.addSelect('user.nickname')
			.addSelect('user.email')
			.addSelect('user.createdAt')
			.addSelect('user.updatedAt')
			.where('user.id = :id')
			.setParameter('id', id)
			.getOne();
	}

	async getMyInfo(user: User): Promise<User> {
		return this.createQueryBuilder('user')
			.select('user.id')
			.addSelect('user.email')
			.addSelect('user.nickname')
			.where('user.id = :id', { id: user.id })
			.getOne();
	}

	async updateUserInfo(userUpdateInfo: UserUpdateInfo): Promise<User> {
		const user = await this.findOne(userUpdateInfo.id);

		this.merge(user, userUpdateInfo);
		await this.save(user);

		const newInfo = await this.findOne(userUpdateInfo.id);

		return newInfo;
	}

	async cancelMember(id: number): Promise<void> {
		await this.delete({ id });
	}
}
