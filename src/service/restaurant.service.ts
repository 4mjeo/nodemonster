import { RestaurantRepository } from '../repository/restaurant.repository';
import { User } from '../entity/user';
import { UserType } from '../entity/enum/usertype';
import { BadRequestError, ConflictError, ForbiddenError, NotFoundError } from '../shared/exception';
import { RestaurantInfo } from '../shared/DataTransferObject';

export class RestaurantService {
    constructor (
        private restaurantRepository: RestaurantRepository
    ) {}

    async createRestaurant(restaurantInfo: RestaurantInfo, user: User) {
        if (user.type !== UserType.seller) {
            throw new ForbiddenError('Only sellers can create restaurants');
        }

        return await this.restaurantRepository.save(restaurantInfo, user);
    }
}