import React from "react";
import { Card, Box, Typography } from "@mui/material";
import { OrderType } from "../../types/enums";
import { StockDetails } from "../../types/stockOrderTypes";

interface OrderSummaryProps extends StockDetails {
  shares: number;
  customPrice: number | null;
  orderType: OrderType;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  stockSymbol,
  price,
  shares,
  customPrice,
  orderType,
}) => {
  const renderedContent = React.useMemo(() => {
    const displayPrice =
      orderType === OrderType.Limit || orderType === OrderType.Stop
        ? customPrice
        : price;
    const amount = shares * (displayPrice || price);

    return (
      <Typography variant="body1">
        Buy {shares} x ${displayPrice?.toFixed(2) || price.toFixed(2)}
        {stockSymbol} ≈ ${amount.toFixed(2)}
      </Typography>
    );
  }, [orderType, customPrice, price, shares, stockSymbol]);

  return (
    <>
      <Card sx={{ backgroundColor: "secondary.light", marginBottom: 2 }}>
        <Box display="flex" justifyContent="space-between" p={2}>
          <Typography variant="h4">{stockSymbol}</Typography>
          <Typography variant="h4">${price.toFixed(2)}</Typography>
        </Box>
      </Card>

      <Typography variant="body2" color="text.secondary">
        Estimated trading amount:
      </Typography>
      {renderedContent}
    </>
  );
};
export default OrderSummary;

