import { RestaurantRepository } from '../repository/restaurant.repository';
import { User } from '../entity/user';
import { UserType } from '../entity/enum/usertype';
import { Restaurant } from '../entity/restaurant'
import { ForbiddenError, NotFoundError } from '../shared/exception';
import { RestaurantInfo, RestaurantUpdateInfo } from '../shared/DataTransferObject';

export class RestaurantService {
    constructor (
        private restaurantRepository: RestaurantRepository
    ) {}

    async createRestaurant(restaurantInfo: RestaurantInfo, user: User): Promise<Restaurant> {
        await this.checkIsSeller(user);

        return await this.restaurantRepository.createRestaurant(restaurantInfo, user);
    }

    async updateRestaurant(restaurantUpdateInfo: RestaurantUpdateInfo, user: User): Promise<void> {
        const restaurant = await this.restaurantRepository.findOne(restaurantUpdateInfo.id);

        await this.checkRestaurantExist(restaurant);
        await this.checkIsOwner(restaurant, user);

        await this.restaurantRepository.updateRestaurant(restaurantUpdateInfo);
    }

    async deleteRestaurant(restaurantId: number, user: User): Promise<void> {
        const restaurant = await this.restaurantRepository.findOne(restaurantId);

        await this.checkRestaurantExist(restaurant);
        await this.checkIsOwner(restaurant, user);

        await this.restaurantRepository.deleteRestaurant(restaurantId);
    }

    async getAllRestaurant(): Promise<Restaurant[]> {
        return this.restaurantRepository.getAllRestaurant();
    }

    async getOneRestaurant(id: number): Promise<Restaurant> {
        const restaurant = await this.restaurantRepository.getOneRestaurant(id);

        await this.checkRestaurantExist(restaurant);

        return restaurant;
    }

    async searchRestaurant(searchWord: string): Promise<Restaurant[]> {
        return this.restaurantRepository.searchRestaurant(searchWord);
    }

    async checkIsSeller(user: User) {
        if (user.type !== UserType.seller) {
            throw new ForbiddenError('Only sellers can create or update restaurants');
        }
    }

    async checkRestaurantExist(restaurant: Restaurant) {
        if (!restaurant) {
            throw new NotFoundError('Restaurant not food');
        }
    }

    async checkIsOwner(restaurant: Restaurant, user: User) {
        if (restaurant.user.id !== user.id) {
            throw new ForbiddenError('You can onliy update your own restaurant');
        }
    }
}   
