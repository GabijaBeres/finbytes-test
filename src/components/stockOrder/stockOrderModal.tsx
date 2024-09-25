import React from "react";
import { Modal, Box, Typography } from "@mui/material";
import FBButton from "../button";
import { StockDetails } from "../../types/stockOrderTypes";

interface StockOrderModalProps extends StockDetails {
  open: boolean;
  handleClose: () => void;
  shares: number;
}

const StockOrderModal: React.FC<StockOrderModalProps> = ({
  open,
  handleClose,
  stockSymbol,
  price,
  shares,
}) => {
  const totalAmount = shares! * price;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        p={3}
        borderRadius={3}
        sx={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: 400,
          minWidth: 280,
          width: "auto",
          bgcolor: "secondary.dark",
        }}
      >
        <Typography variant="h4">Success!</Typography>
        <Typography sx={{ mt: 2 }}>
          You have successfully purchased {stockSymbol} security.
        </Typography>
        <Typography sx={{ mt: 2 }}>Price per share: ${price}</Typography>
        <Typography>Shares: {shares}</Typography>
        <Typography>Total amount paid: ${totalAmount}</Typography>
        <FBButton fullWidth onClick={handleClose}>
          Close
        </FBButton>
      </Box>
    </Modal>
  );
};

export default StockOrderModal;

