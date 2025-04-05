import { Dispatch, FC, SetStateAction } from "react";
import droid from "@assets/droid.svg";
import groot from "@assets/groot.svg";
import { useTranslation } from "react-i18next";
import { IconButton, Toolbar } from "@mui/material";
import { BotModeType } from "@components/botMode/types.ts";
import { AppBarImage, ModePicker } from "@components/botMode/styles.ts";

const BotMode: FC<{
  mode: BotModeType;
  setMode: Dispatch<SetStateAction<BotModeType>>;
}> = ({ mode, setMode }) => {
  const { t } = useTranslation("translation", { keyPrefix: "BotMode" });

  const isMode = (botMode: BotModeType): boolean => mode === botMode;

  return (
    <Toolbar>
      <ModePicker>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          onClick={() => {
            setMode("droid");
          }}
          sx={{
            border: "1px solid",
            borderColor: isMode("droid") ? "white" : "transparent !important",
          }}
        >
          <AppBarImage src={droid} alt={"droid"} />
        </IconButton>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          onClick={() => {
            setMode("groot");
          }}
          sx={{
            border: "1px solid",
            borderColor: isMode("groot") ? "white" : "transparent !important",
          }}
        >
          <AppBarImage src={groot} alt={"groot"} />
        </IconButton>
      </ModePicker>
    </Toolbar>
  );
};

export default BotMode;
