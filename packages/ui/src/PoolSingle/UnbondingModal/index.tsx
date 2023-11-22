import { Avatar, Box, Grid, Modal, Typography } from "@mui/material";
import theme from "../../Theme";
import { Remove } from "react-huge-icons/solid";
import { WhelpStakeTypes } from "@whelp/contracts";
import { Token } from "@whelp/types";
import React from "react";

interface UnbondingModalProps {
  open: boolean;
  onClose: () => void;
  entries: WhelpStakeTypes.Claim[];
  claim: () => void;
  lpToken: Token;
}

const UnbondingModal = ({ ...props }: UnbondingModalProps) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    borderRadius: "1.5rem",
    border: `1px solid ${theme.palette.strokePrimary}`,
    background: theme.palette.bgSecondary,
    boxShadow: "0px 6px 40px -8px rgba(10, 11, 15, 0.60)",
    backdropFilter: "blur(20px)",
    py: 2,
  };

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="Wallet-Connect-Modal"
      aria-describedby="Connect your wallet to Whelp"
    >
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "1rem",
          }}
        >
          <Box>
            <Typography sx={{ fontSize: "1.125rem", fontWeight: 600 }}>
              You have unbonding stakes
            </Typography>
            <Typography sx={{ color: theme.palette.textMuted }}>
              You have to wait until the unbonding period is over to withdraw
              your funds.
            </Typography>
          </Box>
          <Remove
            style={{ fontSize: "1.25rem", cursor: "pointer" }}
            onClick={props.onClose}
          />
        </Box>
        {props.entries.map((entry, index) => (
          <Box key={index} sx={{ px: 4, py: 1 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    src={props.lpToken.icon}
                    sx={{ width: "2rem", height: "2rem" }}
                  />
                  <Typography
                    sx={{
                      color: theme.palette.textLoud,
                      fontSize: "0.875rem",
                      fontWeight: 400,
                      lineHeight: "1.25rem",
                      ml: 1,
                    }}
                  >
                    {entry.amount} {props.lpToken.name}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography
                  sx={{
                    color: theme.palette.textMuted,
                    fontSize: "0.875rem",
                    fontWeight: 400,
                    lineHeight: "1.25rem",
                    textAlign: "end",
                  }}
                >
                  {new Date(
                    //@ts-ignore
                    Number(entry.release_at.at_time) / 1000000
                  ).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Modal>
  );
};

export { UnbondingModal };
