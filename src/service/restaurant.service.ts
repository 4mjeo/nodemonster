import { RestaurantRepository } from '../repository/restaurant.repository';
import { User } from '../entity/user';
import { Restaurant } from '../entity/restaurant';
import { RestaurantInfo, RestaurantUpdateInfo } from '../shared/DataTransferObject';
import { Validation } from '../shared/validation';

export class RestaurantService {
    constructor (
        private restaurantRepository: RestaurantRepository
    ) {}

    async createRestaurant(restaurantInfo: RestaurantInfo, user: User): Promise<Restaurant> {
        Validation.checkIsSeller(user);

        return await this.restaurantRepository.createRestaurant(restaurantInfo, user);
    }

    async updateRestaurant(restaurantUpdateInfo: RestaurantUpdateInfo, user: User): Promise<void> {
        const restaurant = await this.restaurantRepository.findOne({
            where: { id: restaurantUpdateInfo.id },
            relations: ['user']
        });

        Validation.checkRestaurantExist(restaurant);
        await Validation.checkIsOwner(restaurant, user);

        await this.restaurantRepository.updateRestaurant(restaurantUpdateInfo);
    }

    async deleteRestaurant(restaurantId: number, user: User): Promise<void> {
        const restaurant = await this.restaurantRepository.findOne(restaurantId);

        Validation.checkRestaurantExist(restaurant);
        await Validation.checkIsOwner(restaurant, user);

        await this.restaurantRepository.deleteRestaurant(restaurantId);
    }

    async getAllRestaurant(): Promise<Restaurant[]> {
        return this.restaurantRepository.getAllRestaurant();
    }

    async getOneRestaurant(id: number): Promise<Restaurant> {
        const restaurant = await this.restaurantRepository.getOneRestaurant(id);

        Validation.checkRestaurantExist(restaurant);

        return restaurant;
    }

    async searchRestaurant(searchWord: string): Promise<Restaurant[]> {
        return this.restaurantRepository.searchRestaurant(searchWord);
    }
}
