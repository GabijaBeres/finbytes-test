import React, { useState } from "react";
import { Typography } from "@mui/material";
import FBInput from "../input";
import FBToggleButtonGroup from "../toggle";
import FBButton from "../button";
import OrderSummary from "./orderSummary";
import { validateStockOrderInputs } from "../../utils/validation";
import { OrderType } from "../../types/enums";
import { ValidationErrors } from "../../types/stockOrderTypes";

interface StockOrderFormProps {
  stockSymbol: string;
  price: number;
  onSubmit: (
    shares: number | null,
    orderType: OrderType,
    customPrice: number | null
  ) => void;
}

const options = Object.values(OrderType).map((value) => ({
  value,
  label: value.charAt(0) + value.slice(1),
}));

const StockOrderForm: React.FC<StockOrderFormProps> = ({
  stockSymbol,
  price,
  onSubmit,
}) => {
  const [shares, setShares] = useState<number | null>(null);
  const [orderType, setOrderType] = useState<OrderType>(OrderType.Market);
  const [customPrice, setCustomPrice] = useState<number | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleOrderTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: OrderType | null
  ) => {
    if (newValue) {
      setOrderType(newValue);
      setCustomPrice(null);
      setShares(null);
    }
  };

  const validateAndSetErrors = (
    shares: number | null,
    orderType: OrderType,
    customPrice: number | null,
    price: number
  ) => {
    const { errors: validationErrors } = validateStockOrderInputs(
      shares,
      orderType,
      customPrice,
      price
    );
    setErrors(validationErrors);
  };

  const handleSharesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? null : Number(e.target.value);
    setShares(value);
    validateAndSetErrors(value, orderType, customPrice, price);
  };

  const handleCustomPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setCustomPrice(value);
    validateAndSetErrors(shares, orderType, value, price);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateAndSetErrors(shares, orderType, customPrice, price);
    if (Object.keys(errors).length > 0) {
      return;
    } else onSubmit(shares, orderType, customPrice);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" mb={3}>
        Stock Order
      </Typography>

      <FBInput
        value={stockSymbol}
        slotProps={{
          input: {
            readOnly: true,
          },
        }}
        label="Security"
      />

      <FBInput
        value={shares || ""}
        label="Shares"
        type="number"
        error={!!errors.shares}
        helperText={errors.shares}
        onChange={handleSharesChange}
      />

      {(orderType === OrderType.Limit || orderType === OrderType.Stop) && (
        <FBInput
          value={customPrice || ""}
          label="Price"
          type="number"
          error={!!errors.customPrice}
          helperText={
            errors.customPrice ||
            (orderType === OrderType.Limit
              ? "The price should be lower than the current price"
              : "The price should be greater than the current price")
          }
          onChange={handleCustomPriceChange}
        />
      )}

      <FBToggleButtonGroup
        options={options}
        value={orderType}
        onChange={handleOrderTypeChange}
      />

      <OrderSummary
        stockSymbol={stockSymbol}
        price={price}
        shares={shares || 0}
        customPrice={customPrice}
        orderType={orderType}
      />
      <FBButton type="submit" fullWidth>
        Buy {stockSymbol}
      </FBButton>
    </form>
  );
};

export default StockOrderForm;

