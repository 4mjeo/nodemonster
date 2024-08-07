import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { Restaurant } from '../entity/restaurant';
import { User } from '../entity/user';
import { RestaurantInfo, RestaurantUpdateInfo } from '../shared/DataTransferObject';

@EntityRepository(Restaurant)
export class RestaurantRepository extends Repository<Restaurant> {
    static getQueryRepository() {
        return getCustomRepository(RestaurantRepository);
    }

    async createRestaurant(restaurantInfo: RestaurantInfo, user: User): Promise<Restaurant> {
        const newRestaurant = this.create({
            restaurantName: restaurantInfo.restaurantName,
            minOrderPrice: restaurantInfo.minOrderPrice,
            deliveryFee: restaurantInfo.deliveryFee,
            address: restaurantInfo.address,
            phoneNum: restaurantInfo.phoneNum,
            introduction: restaurantInfo.introduction,
            user: user,
        });

        return await this.save(newRestaurant);
    }

    async updateRestaurant(restaurantUpdateInfo: RestaurantUpdateInfo) {
        return this.update(
            {
                id: restaurantUpdateInfo.id
            },
            {
                restaurantName: restaurantUpdateInfo.restaurantName,
                minOrderPrice: restaurantUpdateInfo.minOrderPrice,
                deliveryFee: restaurantUpdateInfo.deliveryFee,
                address: restaurantUpdateInfo.address,
                phoneNum: restaurantUpdateInfo.phoneNum,
                introduction: restaurantUpdateInfo.introduction,
            },
        );
    }

    async findByName(restaurantName: string): Promise<Restaurant> {
		return this.findOne({ restaurantName });
	}

    async deleteRestaurant(restaurantId: number) {
		return this.delete({
			id: restaurantId
		});
	}

    async getAllRestaurant() {
        return this.createQueryBuilder('restaurant')
            .select('restaurant.id')
            .addSelect('restaurant.restaurantName')
            .addSelect('restaurant.minOrderPrice')
            .addSelect('restaurant.deliveryFee')
            .addSelect('restaurant.address')
            .addSelect('restaurant.phoneNum')
            .addSelect('restaurant.introduction')
            .innerJoin('restaurant.user', 'user')
            .innerJoin('restaurant.menu', 'menu')
            .getMany();
    }

    async getOneRestaurant(id: number): Promise<Restaurant> {
        return this.createQueryBuilder('restaurant')
            .select('restaurant.id')
            .addSelect('restaurant.restaurantName')
            .addSelect('restaurant.minOrderPrice')
            .addSelect('restaurant.deliveryFee')
            .addSelect('restaurant.address')
            .addSelect('restaurant.phoneNum')
            .addSelect('restaurant.introduction')
            .addSelect('user.id')
            .addSelect('user.nickname')
            .innerJoin('restaurant.user', 'user')
            .where('restaurant.id = :restaurant_id', { restaurant_id: id })
            .getOne();  
    }

    async searchRestaurant(searchWord: string) {
        return this.createQueryBuilder('restaurant')
            .select('restaurant.id')
            .addSelect('restaurant.restaurantName')
            .addSelect('user.id')
            .addSelect('user.nickname')
            .addSelect('restaurant.introduction')
            .innerJoin('restaurant.user', 'user')
            .where('restaurant.restaurantName like :searchWord OR restaurant.introduction like :searchWord', {
                searchWord: `${searchWord}%`,
            })
            .getMany();
    }
 }  