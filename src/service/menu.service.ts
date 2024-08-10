import { MenuRepository } from '../repository/menu.repository';
import { RestaurantService } from './restaurant.service';
import { Menu } from '../entity/menu';
import { Restaurant } from '../entity/restaurant';
import { MenuInfo } from '../shared/DataTransferObject';
import { User } from '../entity/user';
import { Validation } from '../shared/validation';

export class MenuService {
    constructor(
        private menuRepository: MenuRepository,
        private restaurantService: RestaurantService
    ) {}

    async createMenu(menuInfo: MenuInfo, user: User): Promise<Menu> {
        const restaurant = await this.restaurantService.getOneRestaurant(menuInfo.restaurantId);
        Validation.checkRestaurantExist(restaurant);

        await Validation.checkIsOwner(restaurant, user);

        return this.menuRepository.createMenu(menuInfo, restaurant);
    }

    async updateMenu(menuInfo: MenuInfo, user: User): Promise<void> {
        const menu = await this.menuRepository.findOne(menuInfo.id);
        Validation.checkMenuExist(menu);

        const restaurant = await this.restaurantService.getOneRestaurant(menuInfo.restaurantId);
        Validation.checkRestaurantExist(restaurant);
        await Validation.checkIsOwner(restaurant, user);

        await this.menuRepository.updateMenu(menuInfo);
    }

    async getMenuById(menuId: number): Promise<Menu> {
        const menu = await this.menuRepository.findOne(menuId);
        Validation.checkMenuExist(menu);
        return menu;
    }

    async getMenusByRestaurant(restaurantId: number): Promise<Menu[]> {
        await this.restaurantService.getOneRestaurant(restaurantId);

        return this.menuRepository.getMenuByRestaurant(restaurantId);
    }

    async deleteMenu(menuId: number, user: User): Promise<void> {
        const menu = await this.menuRepository.findOne(menuId);
        Validation.checkMenuExist(menu);

        const restaurant = await this.restaurantService.getOneRestaurant(menu.restaurant.id);
        Validation.checkRestaurantExist(restaurant);
        await Validation.checkIsOwner(restaurant, user);

        await this.menuRepository.deleteMenu(menuId);
    }
}
