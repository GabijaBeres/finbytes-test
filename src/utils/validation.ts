import { OrderType } from "../types/enums";
import { ValidationErrors } from "../types/stockOrderTypes";

export const validateStockOrderInputs = (
  shares: number | null,
  orderType: OrderType,
  customPrice: number | null,
  currentPrice: number
): { valid: boolean; errors: ValidationErrors } => {
  let valid = true;
  const validationErrors: ValidationErrors = {};

  if (shares === null || shares <= 0) {
    validationErrors.shares = "Shares must be a positive number.";
    valid = false;
  }

  if (
    (orderType === OrderType.Limit || orderType === OrderType.Stop) &&
    (customPrice === null || customPrice <= 0)
  ) {
    validationErrors.customPrice = "Price must be a positive number.";
    valid = false;
  }

  if (customPrice !== null) {
    if (orderType === OrderType.Limit && customPrice >= currentPrice) {
      validationErrors.customPrice =
        "Limit price must be lower than the current price.";
      valid = false;
    }

    if (orderType === OrderType.Stop && customPrice <= currentPrice) {
      validationErrors.customPrice =
        "Stop price must be higher than the current price.";
      valid = false;
    }
  }

  return { valid, errors: validationErrors };
};

