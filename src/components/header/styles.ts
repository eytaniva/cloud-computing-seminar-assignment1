import { AppBar, Box, styled } from "@mui/material";

export const Layout = styled(Box)({
  width: "100%",
  marginBottom: "10px",
});

export const StyledAppBar = styled(AppBar)({
  width: "100%",
  position: "fixed",
  marginBottom: "10px",
  backgroundColor: "inherit",
});

export const AppBarImage = styled("img")({
  height: "50px",
  width: "50px",
});
