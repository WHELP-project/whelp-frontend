import React from "react";
import { Box, Modal } from "@mui/material";
import { Remove } from "react-huge-icons/solid";
import { UiTypes } from "@whelp/types";
import theme from "../Theme";

const OnRampModal = ({ ...props }: UiTypes.OnRampModalProps) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    borderRadius: "1.5rem",
    border: `1px solid ${theme.palette.strokePrimary}`,
    background: "rgb(10, 18, 31)",
    boxShadow: "0px 6px 40px -8px rgba(10, 11, 15, 0.60)",
    backdropFilter: "blur(20px)",
  };

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="OnRamp-Modal"
    >
      <Box sx={style}>
        <Box sx={{ display: "flex", justifyContent: "end", padding: "1rem" }}>
          <Remove
            style={{ fontSize: "1.25rem", cursor: "pointer" }}
            onClick={props.onClose}
          />
        </Box>
        <Box sx={{
          maxWidth: "100%",
          overflow: "hidden"
        }}>
          <iframe
            title="Kado app"
            src={`https://app.kado.money/?apiKey=${props.apiKey}&onPayCurrency=USD&onRevCurrency=USDC&product=BUY&network=${props.network}&cryptoList=USDC&onToAddress=${
              props.walletAddress ?? ""
            }`}
            height={700}
            width={500}
            frameBorder={0}
            style={{ marginTop: "24px" }}
          ></iframe>
        </Box>
      </Box>
    </Modal>
  );
};

export { OnRampModal };
