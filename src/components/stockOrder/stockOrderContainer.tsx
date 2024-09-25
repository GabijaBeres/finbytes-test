import React from "react";
import useFetchStock from "../../hooks/useFetchStock";
import StockOrder from "./stockOrder";
import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

const StockOrderContainer: React.FC = () => {
  const { data, error, isLoading } = useFetchStock();
  let content;

  if (isLoading) {
    content = (
      <Backdrop
        sx={(theme) => ({
          color: "primary.main",
          zIndex: theme.zIndex.drawer + 1,
        })}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  } else if (error) {
    content = <Typography variant="h4">{error.message}</Typography>;
  } else if (!data) {
    content = <Typography variant="h4">No data available</Typography>;
  } else {
    const { symbol, price } = data;
    content = <StockOrder stockSymbol={symbol} price={Number(price)} />;
  }

  return (
    <Box
      display="flex"
      p={2}
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="background.default"
    >
      {content}
    </Box>
  );
};

export default StockOrderContainer;

