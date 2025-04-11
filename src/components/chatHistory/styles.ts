import { Box, styled } from "@mui/material";

export const PreviousMessages = styled(Box)({
  height: "80%",
  overflowY: "auto",
  position: "relative",
  margin: "10px 0",
});

export const Bubble = styled("div")({
  maxWidth: "300px",
  overflowY: "auto",
  whiteSpace: "none",
  overflowX: "hidden",
  padding: "6px 15px",
  border: "1px solid",
  borderRadius: "12px",
  position: "absolute",
  marginBottom: "12px",
});
