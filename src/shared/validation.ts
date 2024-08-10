import { NotFoundError, ForbiddenError } from '../shared/exception';
import { Restaurant } from '../entity/restaurant';
import { Menu } from '../entity/menu';
import { User } from '../entity/user';
import { UserType } from '../entity/enum/usertype';

export class Validation {
    static checkRestaurantExist(restaurant: Restaurant) {
        if (!restaurant) {
            throw new NotFoundError('Restaurant not found');
        }
    }

    static checkMenuExist(menu: Menu) {
        if (!menu) {
            throw new NotFoundError('Menu not found');
        }
    }

    static async checkIsOwner(restaurant: Restaurant, user: User) {
        if (restaurant.user.id !== user.id) {
            throw new ForbiddenError('You can only modify your own restaurant');
        }
    }

    static checkIsSeller(user: User) {
        if (user.userType !== UserType.seller) {
            throw new ForbiddenError('Only sellers can create or update restaurants');
        }
    }
}
