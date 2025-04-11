import { Box, styled } from "@mui/material";

export const PreviousMessages = styled(Box)({
  flexGrow: 1,
  height: "80%",
  display: "flex",
  margin: "10px 0",
  overflowY: "auto",
  flexDirection: "column",
});

export const Bubble = styled("div")({
  flexShrink: 0,
  maxWidth: "300px",
  overflowX: "hidden",
  overflowY: "hidden",
  padding: "6px 15px",
  border: "1px solid",
  borderRadius: "12px",
  marginBottom: "12px",
  height: "min-content",
});

export const UserBubble = styled(Bubble)({
  color: "#CC7832",
  borderColor: "#CC7832",
  alignSelf: "flex-start",
  backgroundColor: "#383A40",
});

export const AiBubble = styled(Bubble)({
  color: "#9876AA",
  alignSelf: "flex-end",
  borderColor: "#9876AA",
  backgroundColor: "#282A36",
});
