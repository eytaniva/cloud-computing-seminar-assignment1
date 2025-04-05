import { Box, styled, TextField } from "@mui/material";

export const Layout = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  position: "relative",
  flexDirection: "column",
  justifyContent: "space-between",
});

export const UserInput = styled(TextField)({
  "& label": {
    color: "gray",
  },
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",

    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "lightblue",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
});
