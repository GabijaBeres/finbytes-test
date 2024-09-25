import React from "react";
import { Box, Typography } from "@mui/material";

interface NotificationProps {
  message: string;
  status: "info" | "success" | "fail";
}

const Notification: React.FC<NotificationProps> = ({ message, status }) => {
  const statusStyles = {
    info: {
      bgcolor: "rgba(255, 196, 0, 0.3)", // Orange
      borderColor: "#ffc400",
      shadowColor: "rgba(255, 196, 0, 0.5)",
    },
    success: {
      bgcolor: "rgba(76, 175, 80, 0.3)", // Green
      borderColor: "#4caf50",
      shadowColor: "rgba(76, 175, 80, 0.5)",
    },
    fail: {
      bgcolor: "rgba(244, 67, 54, 0.3)", // Red
      borderColor: "#f44336",
      shadowColor: "rgba(244, 67, 54, 0.5)",
    },
  };

  const { bgcolor, borderColor, shadowColor } = statusStyles[status];

  return (
    <Box
      borderRadius={2}
      p={1}
      mb={3}
      bgcolor={bgcolor}
      display="flex"
      justifyContent="space-between"
      sx={{
        border: `1px solid ${borderColor}`,
        boxShadow: `0 0 10px 5px ${shadowColor}`,
      }}
    >
      <Typography variant="body1">{message}</Typography>
    </Box>
  );
};

export default Notification;

