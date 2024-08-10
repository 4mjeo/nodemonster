import { MenuRepository } from '../repository/menu.repository';
import { RestaurantService } from './restaurant.service';
import { Menu } from '../entity/menu';
import { Restaurant } from '../entity/restaurant';
import { NotFoundError, ForbiddenError } from '../shared/exception';
import { MenuInfo } from '../shared/DataTransferObject';
import { User } from '../entity/user';

export class MenuService {
    constructor(
        private menuRepository: MenuRepository,
        private restaurantService: RestaurantService
    ) {}

    async createMenu(menuInfo: MenuInfo, user: User): Promise<Menu> {
        const restaurant = await this.restaurantService.getOneRestaurant(menuInfo.restaurantId);
        if (!restaurant) {
            throw new NotFoundError('Restaurant not found');
        }

        await this.checkIsOwner(restaurant, user);

        return this.menuRepository.createMenu(menuInfo, restaurant);
    }

    async updateMenu(menuInfo: MenuInfo, user: User): Promise<void> {
        const menu = await this.menuRepository.findOne(menuInfo.id);
        await this.checkMenuExist(menu);

        const restaurant = await this.restaurantService.getOneRestaurant(menuInfo.restaurantId);
        if (!restaurant) {
            throw new NotFoundError('Restaurant not found');
        }
        await this.checkIsOwner(restaurant, user);

        await this.menuRepository.updateMenu(menuInfo);
    }

    async getMenuById(menuId: number): Promise<Menu> {
        const menu = await this.menuRepository.findOne(menuId);
        await this.checkMenuExist(menu);
        return menu;
    }

    async getMenusByRestaurant(restaurantId: number): Promise<Menu[]> {
        await this.restaurantService.getOneRestaurant(restaurantId);

        return this.menuRepository.getMenuByRestaurant(restaurantId);
    }

    async deleteMenu(menuId: number, user: User): Promise<void> {
        const menu = await this.menuRepository.findOne(menuId);
        await this.checkMenuExist(menu);

        const restaurant = await this.restaurantService.getOneRestaurant(menu.restaurant.id);
        if (!restaurant) {
            throw new NotFoundError('Restaurant not found');
        }
        await this.checkIsOwner(restaurant, user);

        await this.menuRepository.deleteMenu(menuId);
    }

    private async checkMenuExist(menu: Menu) {
        if (!menu) {
            throw new NotFoundError('Menu not found');
        }
    }

    private async checkIsOwner(restaurant: Restaurant, user: User) {
        if (restaurant.user.id !== user.id) {
            throw new ForbiddenError('You can only update menus for your own restaurant');
        }
    }
}
