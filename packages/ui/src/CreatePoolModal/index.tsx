import React from "react";
import {
  Box,
  Typography,
  Modal,
  Grid,
  TextField,
  Input,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Remove } from "react-huge-icons/solid";
import theme from "../Theme";
import { Button } from "../Button";
import { palette, TokenBox } from "..";
import { TokenBoxProps } from "@whelp/types/build/ui";

export interface NewToken {
  address: string;
  type: string;
}

export interface CreatePoolModalProps {
  isOpen: boolean;
  isCreatePoolLoading: boolean;
  isProvideLiquidityLoading: boolean;
  setOpen: (val: boolean) => void;
  onCreatePoolClick: (tokenA: NewToken, tokenB: NewToken) => void;
  onProvideLiquidityClick: () => void;
  tokenBoxProps: TokenBoxProps[] | undefined;
}

const Create = ({
  onCreatePoolClick,
  isCreatePoolLoading
}: {
  onCreatePoolClick: (tokenA: NewToken, tokenB: NewToken) => void;
  isCreatePoolLoading: boolean;
}) => {
  const [tokenAddressA, setTokenAddressA] = React.useState<string>("");
  const [tokenTypeA, setTokenTypeA] = React.useState<string>("cw20");

  const [tokenAddressB, setTokenAddressB] = React.useState("");
  const [tokenTypeB, setTokenTypeB] = React.useState<string>("cw20");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      }}
    >
      <Box
        sx={{
          borderRadius: "1rem",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          width: "100%",
          padding: "1rem 1rem",
          position: "relative",
          background: "rgba(255, 255, 255, 0.02)",
        }}
      >
        <Typography
          sx={{
            position: "absolute",
            top: -1,
            transform: "translateY(-50%)",
            background: "#0A0F10",
          }}
        >
          First Token
        </Typography>
        <RadioGroup
          row
          value={tokenTypeA}
          onChange={(e) => setTokenTypeA(e.target.value)}
        >
          <FormControlLabel value="cw20" control={<Radio />} label="CW20" />
          <FormControlLabel
            value="smart"
            control={<Radio />}
            label="Smart Token"
          />
        </RadioGroup>
        <Input
          placeholder="Token Address"
          fullWidth
          value={tokenAddressA}
          onChange={(e: any) => setTokenAddressA(e.target.value)}
          sx={{
            borderRadius: "0.625rem",
            border: `1px solid ${theme.palette.strokePrimary}`,
            background: theme.palette.bgAlpha25,
            padding: "0.5rem 1rem",
            lineHeight: "1.5rem",
            fontSize: "1rem",
            mr: "1rem",
            my: { xs: "1rem", md: 0 },
            color: theme.palette.textNormal,
            "&:before": {
              content: "none",
            },
            "&:after": {
              content: "none",
            },
            "&:hover": {
              borderColor: "#fff",
            },
          }}
        />
      </Box>

      <Box
        sx={{
          borderRadius: "1rem",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          width: "100%",
          padding: "1rem 1rem",
          position: "relative",
          background: "rgba(255, 255, 255, 0.02)",
        }}
      >
        <Typography
          sx={{
            position: "absolute",
            top: -1,
            transform: "translateY(-50%)",
            background: "#0A0F10",
          }}
        >
          Second Token
        </Typography>
        <RadioGroup
          row
          value={tokenTypeB}
          onChange={(e) => setTokenTypeB(e.target.value)}
        >
          <FormControlLabel value="cw20" control={<Radio />} label="CW20" />
          <FormControlLabel
            value="smart"
            control={<Radio />}
            label="Smart Token"
          />
        </RadioGroup>
        <Input
          placeholder="Token Address"
          fullWidth
          value={tokenAddressB}
          onChange={(e: any) => setTokenAddressB(e.target.value)}
          sx={{
            borderRadius: "0.625rem",
            border: `1px solid ${theme.palette.strokePrimary}`,
            background: theme.palette.bgAlpha25,
            padding: "0.5rem 1rem",
            lineHeight: "1.5rem",
            fontSize: "1rem",
            mr: "1rem",
            my: { xs: "1rem", md: 0 },
            color: theme.palette.textNormal,
            "&:before": {
              content: "none",
            },
            "&:after": {
              content: "none",
            },
            "&:hover": {
              borderColor: "#fff",
            },
          }}
        />
      </Box>

      <Typography sx={{ fontSize: "0.875rem", opacity: 0.7, px: 0.5 }}>
        Please note that pools are not activated until liquidity is provided.
        Pools inactive for 7 days will be automatically removed.
      </Typography>

      <Button
        loading={isCreatePoolLoading}
        onClick={() =>
          onCreatePoolClick(
            {
              address: tokenAddressA,
              type: tokenTypeA,
            },
            {
              address: tokenAddressB,
              type: tokenTypeB,
            }
          )
        }
        fullWidth={true}
        label="Create Pool"
      />
    </Box>
  );
};

const ProvoideLiquidity = ({
  onProvideLiquidityClick,
  tokenBoxProps,
  isProvideLiquidityLoading
}: {
  onProvideLiquidityClick: () => void;
  tokenBoxProps: TokenBoxProps[];
  isProvideLiquidityLoading: boolean;
}) => {
  return (
    <Box sx={{
      width: "100%"
    }}>
      <TokenBox {...tokenBoxProps[0]} />
      <Box mb={2} />
      <TokenBox {...tokenBoxProps[0]} />
      <Button
        sx={{ width: "100%", mt: 3 }}
        label="Add Liquidity"
        onClick={onProvideLiquidityClick}
        loading={isProvideLiquidityLoading}
      />
    </Box>
  );
};

const CreatePoolModal = ({
  isOpen,
  tokenBoxProps,
  setOpen,
  onCreatePoolClick,
  onProvideLiquidityClick,
  isCreatePoolLoading,
  isProvideLiquidityLoading
}: CreatePoolModalProps) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { md: 500, xs: "100%" },
    borderRadius: "1.5rem",
    border: `1px solid ${theme.palette.strokePrimary}`,
    background: theme.palette.bgSecondary,
    boxShadow: "0px 6px 40px -8px rgba(10, 11, 15, 0.60)",
    backdropFilter: "blur(20px)",
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => setOpen(false)}
      aria-labelledby="createpool-modal"
      aria-describedby="create a pool"
    >
      <Box sx={style}>
        <Box
          sx={{
            p: "1.5rem 2rem",
            borderBottom: `1px solid ${theme.palette.strokePrimary}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.125rem",
              fontWeight: 500,
              lineHeight: "1.75rem",
              color: theme.palette.textLoud,
            }}
          >
            {tokenBoxProps ? "Provide Liquidity" : "Create Pool"}
          </Typography>
          <Remove
            style={{ fontSize: "1.25rem", cursor: "pointer" }}
            onClick={() => setOpen(false)}
          />
        </Box>
        <Box
          sx={{
            padding: "1.5rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "1.5rem",
          }}
        >
          {tokenBoxProps ? (
            <ProvoideLiquidity
              tokenBoxProps={tokenBoxProps}
              onProvideLiquidityClick={onProvideLiquidityClick}
              isProvideLiquidityLoading={isProvideLiquidityLoading}
            />
          ) : (
            <Create isCreatePoolLoading={isCreatePoolLoading} onCreatePoolClick={onCreatePoolClick} />
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default CreatePoolModal;
