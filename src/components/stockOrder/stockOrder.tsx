import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import StockOrderModal from "./stockOrderModal";
import StockOrderForm from "./stockOrderForm";
import Notification from "../statusBar";
import { OrderType } from "../../types/enums";
import { StockDetails } from "../../types/stockOrderTypes";

type StockOrderProps = StockDetails;

const StockOrder: React.FC<StockOrderProps> = ({ stockSymbol, price }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPendingOrder, setIsPendingOrder] = useState(false);
  const [formData, setFormData] = useState<{
    shares: number | null;
    orderType: OrderType;
    customPrice: number | null;
  } | null>(null);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    setFormData(null);
  };

  useEffect(() => {
    if (formData?.customPrice == null) return;

    const { orderType, customPrice } = formData;
    const isLimitOrderValid =
      orderType === OrderType.Limit && price <= customPrice;
    const isStopOrderValid =
      orderType === OrderType.Stop && price >= customPrice;

    if (isLimitOrderValid || isStopOrderValid) {
      handleOpen();
    }
  }, [price, formData]);

  const handleFormSubmit = (
    shares: number | null,
    orderType: OrderType,
    customPrice: number | null
  ) => {
    setFormData({ shares, orderType, customPrice });
    if (orderType === OrderType.Market) {
      handleOpen();
    } else {
      setIsPendingOrder(true);
    }
  };

  return (
    <Box width={500} p={3} borderRadius={2} bgcolor="secondary.main">
      {isPendingOrder && (
        <Notification
          message="Your order will be executed once the mentioned price is reached."
          status="info"
        />
      )}

      <StockOrderForm
        stockSymbol={stockSymbol}
        price={price}
        onSubmit={handleFormSubmit}
      />

      <StockOrderModal
        open={isOpen}
        handleClose={handleClose}
        stockSymbol={stockSymbol}
        price={price}
        shares={formData?.shares || 0}
      />
    </Box>
  );
};

export default StockOrder;

