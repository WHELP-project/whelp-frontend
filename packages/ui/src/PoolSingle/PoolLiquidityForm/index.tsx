import { Box, Tab, Tabs } from "@mui/material";
import { TokenBox } from "../TokenBox";
import React from "react";
import theme from "../../Theme";
import { Button } from "../../Button";
import { UiTypes } from "@whelp/types";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const PoolLiquidityForm = ({
  addLiquidityButtonDisabled,
  removeLiquidityButtonDisabled,
  addLiquidityProps,
  removeLiquidityProps,
  addLiquidityClick,
  removeLiquidityClick,
}: UiTypes.PoolLiquidityProps) => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const tabStyle = {
    textTransform: "none",
    color: theme.palette.textNormal,
  };

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "16px",
        border: `1px solid ${theme.palette.strokePrimary}`,
        background: theme.palette.bgAlpha0,
        backdropFilter: "blur(20px)",
        padding: "24px",
      }}
    >
      <Box
        sx={{
          borderBottom: 1,
          borderColor: theme.palette.strokePrimary,
          marginBottom: "16px",
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleChange}
          TabIndicatorProps={{
            style: {
              backgroundColor: theme.palette.strokeHover,
            },
          }}
          sx={{
            "& .MuiTab-root.Mui-selected": {
              color: theme.palette.textLoud,
            },
          }}
        >
          <Tab sx={tabStyle} label="Add" {...a11yProps(0)} />
          <Tab sx={tabStyle} label="Remove" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <Box>
        <CustomTabPanel value={tabValue} index={0}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              marginBottom: "16px",
            }}
          >
            <TokenBox {...addLiquidityProps[0]} />
            <TokenBox {...addLiquidityProps[1]} />
          </Box>
          <Button
            sx={{ width: "100%" }}
            label="Add Liquidity"
            onClick={addLiquidityClick}
            disabled={addLiquidityButtonDisabled}
          />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              marginBottom: "16px",
            }}
          >
            <TokenBox {...removeLiquidityProps} />
          </Box>
          <Button
            sx={{ width: "100%" }}
            label="Remove Liquidity"
            onClick={removeLiquidityClick}
            disabled={removeLiquidityButtonDisabled}
          />
        </CustomTabPanel>
      </Box>
    </Box>
  );
};

export { PoolLiquidityForm };
