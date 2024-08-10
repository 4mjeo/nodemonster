import { MenuRepository } from '../repository/menu.repository';
import { RestaurantRepository } from '../repository/restaurant.repository';
import { Menu } from '../entity/menu';
import { Restaurant } from '../entity/restaurant';
import { NotFoundError, ForbiddenError } from '../shared/exception';
import { MenuInfo } from '../shared/DataTransferObject';
import { RestaurantService } from './restaurant.service';

export class MenuService {
    constructor(
        private menuRepository: MenuRepository,
        private restaurantService: RestaurantService
    ) {}

    async createMenu(menuInfo: MenuInfo): Promise<Menu> {
        const restaurant = await this.restaurantService.getOneRestaurant(menuInfo.restaurantId);
        if (!restaurant) {
            throw new NotFoundError('Restaurant not found');
        }

        return this.menuRepository.createMenu(menuInfo, restaurant)
    }

    async updateMenu(menuInfo: MenuInfo): Promise<void> {
        const menu = await this.menuRepository.findOne(menuInfo.id);
        if (!menu) {
            throw new NotFoundError('Menu not found');
        }

        return this.menuRepository.updateMenu(menuInfo);
    }

    async getMenuById(menuId: number): Promise<Menu> {
        const menu = await this.menuRepository.findOne(menuId);
        if (!menu) {
            throw new NotFoundError('Menu not found');
        }

        return menu;
    }

    async getMenuByRestaurant(restaurantId: number): Promise<Menu[]> {
        const restaurant = await this.restaurantService.getOneRestaurant(restaurantId);
        if (!restaurant) {
            throw new NotFoundError('Restaurant not found');
        }

        return this.menuRepository.getMenuByRestaurant(restaurantId);
    } 

    async deleteMenu(menuId: number): Promise<void> {
        const menu = await this.menuRepository.fidnOne(menuId);
        if (!menu) {
            throw new NotFoundError('Menu not found');
        }

        await this.menuRepository.deleteMenu(menuId);
    }

    async checkMenuExist(menu: Menu) {
        if(!menu) {
            throw new NotFoundError('Menu not found');
        }
    }
}
