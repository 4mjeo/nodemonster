import { RestaurantService } from '../service/restaurant.service';
import { BusinessLogic } from '../shared/BusinessLogicInterface';
import { RestaurantInfo, RestaurantUpdateInfo } from '../shared/DataTransferObject';
import { RestaurantRepository } from '../repository/restaurant.repository';

export class RestaurantController {
    private restaurantService: RestaurantService = new RestaurantService(
        RestaurantRepository.getQueryRepository(), 
    );

    public createRestaurant: BusinessLogic = async(req, res, next) => {
        const restaurantInfo = req.body as RestaurantInfo;
        const user = req.decoded;

        const response = await this.restaurantService.createRestaurant(restaurantInfo, user);

        return res.status(201).json(response);
    }

    public updateRestaurant: BusinessLogic = async(req, res, next) => {
        const restaurantUpdateInfo = req.body as RestaurantUpdateInfo;
        const user = req.decoded;

        await this.restaurantService.updateRestaurant(restaurantUpdateInfo, user);

        return res.status(200).json({ message: 'updateRestaurant success' });
    }

    public deleteRestaurant: BusinessLogic = async(req, res, next) => {
        const restaurantId = Number(req.params.restaurant_id);
        const user = req.decoded;

        await this.restaurantService.deleteRestaurant(restaurantId, user);

        return res.status(200).json({ message: 'deleteRestaurant success' });
    };

    public getOneRestaurant: BusinessLogic = async(req, res, next) => {
        const restaurantId = Number(req.params.restaurant_id);

        const response = await this.restaurantService.getOneRestaurant(restaurantId);

        return res.status(200).json(response);
    };

    public getAllRestaurant: BusinessLogic = async(req, res, next) => {
        const response = await this.restaurantService.getAllRestaurant();

        return res.status(200).json(response);
    };

    public searchRestaurant: BusinessLogic = async(req, res, next) => {
        const searchWord = req.query.q as string;

        const response = await this.restaurantService.searchRestaurant(searchWord);

        return res.status(200).json(response);
    };
}
