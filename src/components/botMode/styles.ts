import { AppBar, Box, styled } from "@mui/material";

export const Layout = styled(Box)({
  width: "100%",
  marginBottom: "10px",
});

export const ModePicker = styled("div")({
  width: "100%",
  display: "flex",
  marginTop: "50px",
  alignItems: "start",
  flexDirection: "row",
  backgroundColor: "inherit",
  justifyContent: "space-evenly",
});

export const AppBarImage = styled("img")({
  height: "50px",
  width: "50px",
});
