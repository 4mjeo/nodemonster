import { BusinessLoigc } from "../shared/BusinessLogicInterface";
import { logger } from "../shared/logger";

export const errorHandler = (myFunc: BusinessLoigc): BusinessLoigc => {
  return async (req, res, next) => {
    try {
      await myFunc(req, res, next);
    } catch (err) {
      console.error(err);
      logger.error(err.message);
      next(err);
    }
  };
};
