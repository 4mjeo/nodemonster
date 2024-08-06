import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { Restaurant } from '../entity/restaurant';
import { User } from '../entity/user';
import { RestaurantInfo, RestaurantUpdateInfo } from '../shared/DataTransferObject';

@EntityRepository(Restaurant)
export class RestaurantRepository extends Repository<Restaurant> {
    static getQueryRepository() {
        return getCustomRepository(RestaurantRepository);
    }

    async createRestaurant(restaurantInfo: RestaurantInfo): Promise<Restaurant> {
        const newRestaurant = new Restaurant();

        newRestaurant.restaurantName = restaurantInfo.restaurantName;
        newRestaurant.minOrderPrice = restaurantInfo.minOrderPrice;
        newRestaurant.deliveryFee = restaurantInfo.deliveryFee;
        newRestaurant.address = restaurantInfo.address;
        newRestaurant.phoneNum = restaurantInfo.phoneNum;
        newRestaurant.introduction = restaurantInfo.introduction;

        return this.save(newRestaurant);
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