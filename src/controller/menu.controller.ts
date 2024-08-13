import { MenuService } from '../service/menu.service';
import { BusinessLogic } from '../shared/BusinessLogicInterface';
import { MenuInfo } from '../shared/DataTransferObject';
import { MenuRepository } from '../repository/menu.repository';
import { RestaurantService } from '../service/restaurant.service';
import { RestaurantRepository } from '../repository/restaurant.repository';

export class MenuController {
    private menuService: MenuService = new MenuService(
        MenuRepository.getQueryRepository(),
        new RestaurantService(RestaurantRepository.getQueryRepository())
    );

    public createMenu: BusinessLogic = async(req, res, next) => {
        const menuInfo = req.body as MenuInfo;
        const user = req.decoded;

        const response = await this.menuService.createMenu(menuInfo, user);

        return res.status(201).json(response);
    }

    public updateMenu: BusinessLogic = async(req, res, next) => {
        const menuId = Number(req.params.menu_id);
        const menuInfo = {
            id: menuId,
            ...req.body
        } as MenuInfo;

        const user = req.decoded;

        await this.menuService.updateMenu(menuInfo, user);

        return res.status(200).json({ message: 'Update menu success' });
    }

    public getMenuById: BusinessLogic = async(req, res, next) => {
        const menuId = Number(req.params.menu_id);

        const response = await this.menuService.getMenuById(menuId);

        return res.status(200).json(response);
    }

    public getMenusByRestaurant: BusinessLogic = async(req, res, next) => {
        const restaurantId = Number(req.params.restaurant_id);
        
        const response = await this.menuService.getMenusByRestaurant(restaurantId);
        
        return res.status(200).json(response);
    }

    public deleteMenu: BusinessLogic = async(req, res, next) => {
        const menuId = Number(req.params.menu_id);
        const user = req.decoded;

        await this.menuService.deleteMenu(menuId, user);

        return res.status(204).json({ message: 'Delete menu success' });
    }
}
