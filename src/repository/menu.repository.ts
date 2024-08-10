import { EntityRepository, Repository, getCustomRepository } from 'typeorm';
import { Menu } from '../entity/menu';
import { Restaurant } from '../entity/restaurant';
import { MenuInfo } from '../shared/DataTransferObject';
import { memoryUsage } from 'process';

@EntityRepository(Menu)
export class MenuRepository extends Repository<Menu> {
    static getQueryRepository() {
        return getCustomRepository(MenuRepository);
    }

    async createMenu(menuInfo: MenuInfo, restaurant: Restaurant): Promise<Menu> {
        const newMenu = this.create({
            foodName: menuInfo.foodName,
            foodPrice: menuInfo.foodPrice,
            restaurant: restaurant
        });

        return await this.save(newMenu);
    }

    async updateMenu(menuInfo: MenuInfo): Promise<void> {
        await this.update(
            {
                id: menuInfo.id
            },
            {
                foodName: menuInfo.foodName,
                foodPrice: menuInfo.foodPrice,
            }
        );
    }

    async getMenuById(menuId: number): Promise<Menu> {
        return this.findOne(menuId);
    }
}
