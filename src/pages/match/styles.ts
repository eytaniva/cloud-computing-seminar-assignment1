import { Box, styled } from "@mui/material";

export const HeartImage = styled("img")({
  width: "30vw",
  aspectRatio: "1",
  objectFit: "cover",
  WebkitMaskBoxImage: "radial-gradient(#000 69%,#0000 70%) 84.5%/50%",
  maskBorder: "radial-gradient(#000 69%,#0000 70%) 84.5%/50%",
  clipPath: "polygon(-41% 0,50% 91%, 141% 0)",
});

export const Layout = styled(Box)({
  width: "100%",
  height: "100%",
  backgroundColor: "#FE3C72",
  cursor: "pointer",
});
