import React, {useEffect} from "react";
import {
    Alert,
    Box,
    FormControl,
    FormControlLabel,
    Input,
    InputLabel,
    MenuItem,
    Modal, Popover,
    Radio,
    RadioGroup,
    Select,
    Switch,
    Typography,
} from "@mui/material";
import {Remove} from "react-huge-icons/solid";
import theme from "../Theme";
import {Button} from "../Button";
import {TokenBox} from "..";
import {TokenBoxProps} from "@whelp/types/build/ui";

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
    tokenBoxProps?: TokenBoxProps[] | undefined;
    error: string;
    poolType: "stable" | "xyk";
    setPoolType: (val: "stable" | "xyk") => void;
    disabled?: boolean;
}

const Create = ({
                    onCreatePoolClick, isCreatePoolLoading, poolType, setPoolType, error, disabled,
                }: {
    onCreatePoolClick: (tokenA: NewToken, tokenB: NewToken) => void;
    isCreatePoolLoading: boolean;
    poolType: "stable" | "xyk";
    setPoolType: (val: "stable" | "xyk") => void;
    error: string;
    disabled?: boolean;
}) => {
    const [useCustomAddresses, setUseCustomAddresses] = React.useState(false);
    const [tokenAddressA, setTokenAddressA] = React.useState<string>("");
    const [tokenTypeA, setTokenTypeA] = React.useState<string>("cw20");

    const [tokenAddressB, setTokenAddressB] = React.useState("");
    const [tokenTypeB, setTokenTypeB] = React.useState<string>("cw20");

    const [allTokens, setAllTokens] = React.useState([])

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const fetchAllTokens = async () => {
        // Fetch all tokens
        const _allTokens = await (await fetch("https://raw.githubusercontent.com/CoreumFoundation/token-registry/master/mainnet/assets.json")).json();
        setAllTokens(_allTokens.assets)
    }

    const resolveNames = (address: string) => {
        const nameMap = {
            ucore: "CORE",
            "usara-core1r9gc0rnxnzpq33u82f44aufgdwvyxv4wyepyck98m9v2pxua6naqr8h03z" : "SARA",
            "drop-core1zhs909jp9yktml6qqx9f0ptcq2xnhhj99cja03j3lfcsp2pgm86studdrz": "XRP",
            "xrpl11278ecf9e-core1zhs909jp9yktml6qqx9f0ptcq2xnhhj99cja03j3lfcsp2pgm86studdrz": "SOLO",
            "xrpl62a8252400-core1zhs909jp9yktml6qqx9f0ptcq2xnhhj99cja03j3lfcsp2pgm86studdrz": "ELS",
            "xrpla81f3eb9f8-core1zhs909jp9yktml6qqx9f0ptcq2xnhhj99cja03j3lfcsp2pgm86studdrz": "VGB",
            "xrpl691210a91a-core1zhs909jp9yktml6qqx9f0ptcq2xnhhj99cja03j3lfcsp2pgm86studdrz": "Equilibrium Games",
            "xrpl2661e5b556-core1zhs909jp9yktml6qqx9f0ptcq2xnhhj99cja03j3lfcsp2pgm86studdrz": "OXP"
        }

        return nameMap[address] || address;
    }

    useEffect(() => {
        fetchAllTokens();
    }, []);
    const isValidSmartToken = /^u[a-z]+-core1[a-z0-9]{71}$/.test(tokenAddressB);

    return (<Box
            sx={{
                display: "flex", flexDirection: "column", gap: "1.5rem", width: "100%",
            }}
        >
            <Box
                sx={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                }}
            >
                <Typography>Use Custom Addresses</Typography>
                <Switch
                    checked={useCustomAddresses}
                    onChange={(e) => setUseCustomAddresses(e.target.checked)}
                />
            </Box>
            {useCustomAddresses ? (<>
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
                                position: "absolute", top: -1, transform: "translateY(-50%)", background: "#0A0F10",
                            }}
                        >
                            First Token
                        </Typography>
                        <RadioGroup
                            row
                            value={tokenTypeA}
                            onChange={(e) => setTokenTypeA(e.target.value)}
                        >
                            <FormControlLabel value="cw20" control={<Radio/>} label="CW20"/>
                            <FormControlLabel
                                value="smart"
                                control={<Radio/>}
                                label="Smart Token"
                            />
                        </RadioGroup>
                        <Input
                            placeholder="Token Address or Smart Token Denom + Address"
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
                                my: {xs: "1rem", md: 0},
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
                                position: "absolute", top: -1, transform: "translateY(-50%)", background: "#0A0F10",
                            }}
                        >
                            Second Token
                        </Typography>
                        <RadioGroup
                            row
                            value={tokenTypeB}
                            onChange={(e) => setTokenTypeB(e.target.value)}
                        >
                            <FormControlLabel value="cw20" control={<Radio/>} label="CW20"/>
                            <FormControlLabel
                                value="smart"
                                control={<Radio/>}
                                label="Smart Token"
                            />
                        </RadioGroup>
                        <Input
                            placeholder="Token Address or Smart Token Denom + Address"
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
                                my: {xs: "1rem", md: 0},
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
                </>) : (<Box
                    sx={{
                        display: "flex", flexDirection: "column", gap: "1rem", width: "100%",
                    }}
                >
                    <FormControl fullWidth>
                        <InputLabel id="select-token-a-label">Select Token A</InputLabel>
                        <Select
                            labelId="select-token-a-label"
                            id="select-token-a"
                            MenuProps={{sx: {
                                    "& .MuiMenu-paper": {
                                        display: "flex",
                                        padding: "0.25rem 0rem",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        position: "absolute",
                                        left: 0,
                                        top: "-2.5rem",
                                        borderRadius: "1rem",
                                        background: theme.palette.bgAlpha25,
                                        backdropFilter: "blur(20px)",
                                    }, "&& .Mui-selected": {
                                        background: theme.palette.bgAlpha200,
                                        width: "100%"
                                    }, "&& .MuiMenuItem-root:hover": {
                                        background: theme.palette.bgAlpha100,
                                        width: "100%"
                                    },  "&& .MuiMenu-list": {
                                        width: "100%"
                                    },
                                },
                            }}
                            value={tokenAddressA}
                            onChange={(e) => {setTokenAddressA(e.target.value); setTokenTypeA("smart")}}
                            label="Select Token A"
                        >
                            {allTokens.map((token: any, index: number) => (
                                <MenuItem key={index} value={token.denom}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            width: "15rem",
                                            padding: "0.5rem 0.75rem",
                                            alignItems: "center",
                                            gap: "0.75rem",
                                        }}
                                    >  <Box component="img" sx={{ width: "24px", height: "24px"}} src={token.logo_URIs.svg} />
                                        <Typography
                                            sx={{
                                                color: theme.palette.textLoud, fontSize: "0.875rem", fontWeight: 400,
                                            }}
                                        >
                                           {token.ibc_info && Object.keys(token.ibc_info).length > 0 ? token.ibc_info.display_name : resolveNames(token.denom)}
                                        </Typography>
                                        <Typography sx={{ fontSize: "0.6rem", textOverflow: "ellipsis", overflow: "hidden"}}>
                                            {token.description}
                                        </Typography>
                                    </Box>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="select-token-b-label">Select Token B</InputLabel>
                        <Select
                            labelId="select-token-a-label"
                            id="select-token-a"
                            MenuProps={{sx: {
                                    "& .MuiMenu-paper": {
                                        display: "flex",
                                        padding: "0.25rem 0rem",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        position: "absolute",
                                        left: 0,
                                        top: "-2.5rem",
                                        borderRadius: "1rem",
                                        background: theme.palette.bgAlpha25,
                                        backdropFilter: "blur(20px)",
                                    }, "&& .Mui-selected": {
                                        background: theme.palette.bgAlpha200,
                                        width: "100%"
                                    }, "&& .MuiMenuItem-root:hover": {
                                        background: theme.palette.bgAlpha100,
                                        width: "100%"
                                    },  "&& .MuiMenu-list": {
                                        width: "100%"
                                    },
                                },
                            }}
                            value={tokenAddressB}
                            onChange={(e) => { setTokenAddressB(e.target.value); setTokenTypeB("smart")}}
                            label="Select Token B"
                        >
                            {allTokens.map((token: any, index: number) => (
                                <MenuItem key={index} value={token.denom}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            width: "15rem",
                                            padding: "0.5rem 0.75rem",
                                            alignItems: "center",
                                            gap: "0.75rem",
                                        }}
                                    >  <Box component="img" sx={{ width: "24px", height: "24px"}} src={token.logo_URIs.svg} />
                                        <Typography
                                            sx={{
                                                color: theme.palette.textLoud, fontSize: "0.875rem", fontWeight: 400,
                                            }}
                                        >
                                            {token.ibc_info && Object.keys(token.ibc_info).length > 0 ? token.ibc_info.display_name : resolveNames(token.denom)}
                                        </Typography>
                                        <Typography sx={{ fontSize: "0.6rem", textOverflow: "ellipsis", overflow: "hidden"}}>
                                            {token.description}
                                        </Typography>
                                    </Box>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>)}
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <Alert severity={"info"} sx={{fontSize: "0.875rem", opacity: 0.7, px: 0.5}}>
                <div className="notification">
                    <h2>Understanding Stable vs. XYK Pools</h2>
                    <p>
                        <strong>Stable Pools:</strong> Ideal for assets with low volatility, like stablecoins. They offer
                        low slippage and high capital efficiency, making them perfect for swapping assets with similar
                        prices.
                    </p>
                    <p>
                        <strong>XYK Pools:</strong> Best for a wider range of assets, including volatile ones. They provide
                        greater liquidity diversity but come with higher slippage.
                    </p>
                    <p>
                        <strong>When to Use:</strong><br/>
                        <strong>Stable Pools:</strong> Use for trading stablecoins or pegged assets to minimize price
                        impact.<br/>
                        <strong>XYK Pools:</strong> Use for trading more volatile assets for broader liquidity options.
                    </p>
                    <p>Choose the right pool based on asset volatility and desired trading efficiency!</p>
                </div>

            </Alert>
        </Popover>

            <Box
                sx={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                }}
            >
                <Typography>
                    Pool Type{" "}
                    <Typography
                        onClick={handleClick}
                        sx={{
                            display: "inline", color: theme.palette.textMuted, fontSize: "0.875rem", textDecoration: "underline", cursor: "pointer",
                        }}
                    >
                        (Stable or XYK)
                    </Typography>
                </Typography>
                <Select
                    sx={{
                        display: "flex",
                        width: "12.25rem",
                        alignItems: "center",
                        gap: "0.75rem",
                        flexShrink: 0,
                        borderRadius: "0.625rem",
                        border: `1px solid ${theme.palette.strokePrimary}`,
                        background: theme.palette.bgAlpha25,
                        backdropFilter: "blur(20px)",
                        color: theme.palette.textMuted,
                        textOverflow: "ellipsis",
                        fontFamily: "Inter",
                        fontSize: "1rem",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "1.5rem",
                        "& .MuiSelect-select": {
                            padding: "0.25rem 0.5rem",
                        },
                    }}
                    value={poolType}
                    onChange={(e) => {
                        const value = e.target.value.toLowerCase();
                        setPoolType(value.toLowerCase() as "stable" | "xyk");
                    }}
                    MenuProps={{
                        anchorOrigin: {
                            vertical: "top", horizontal: "right",
                        }, sx: {
                            "& .MuiMenu-paper": {
                                display: "flex",
                                padding: "0.25rem 0rem",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                position: "absolute",
                                left: "8rem",
                                top: "-2.5rem",
                                borderRadius: "1rem",
                                background: theme.palette.bgAlpha25,
                                backdropFilter: "blur(20px)",
                            }, "&& .Mui-selected": {
                                background: theme.palette.bgAlpha200,
                            }, "&& .MuiMenuItem-root:hover": {
                                background: theme.palette.bgAlpha100,
                            },
                        },
                    }}
                    label=""
                    id="sort-table"
                >
                    {["stable", "xyk"].map((type, index) => (<MenuItem key={index} value={type}>
                            <Box
                                sx={{
                                    display: "flex",
                                    width: "15rem",
                                    padding: "0.5rem 0.75rem",
                                    alignItems: "center",
                                    gap: "0.75rem",
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: theme.palette.textLoud, fontSize: "0.875rem", fontWeight: 400,
                                    }}
                                >
                                    {type.toUpperCase()}
                                </Typography>
                            </Box>
                        </MenuItem>))}
                </Select>
            </Box>

        <Typography sx={{fontSize: "0.875rem", opacity: 0.7, px: 0.5}}>
            Please note that creating a pool will cost you 230 COREUM.
        </Typography>

        <Typography sx={{color: "red"}}>{error}</Typography>

        <Button
            disabled={disabled}
            loading={isCreatePoolLoading}
            onClick={() => onCreatePoolClick({
                address: tokenAddressA, type: tokenTypeA,
            }, {
                address: tokenAddressB, type: tokenTypeB,
            })}
            fullWidth={true}
            label="Create Pool"
        />
    </Box>);
};

const ProvoideLiquidity = ({
                               onProvideLiquidityClick, tokenBoxProps, isProvideLiquidityLoading,
                           }: {
    onProvideLiquidityClick: () => void; tokenBoxProps: TokenBoxProps[]; isProvideLiquidityLoading: boolean;
}) => {
    return (<Box
            sx={{
                width: "100%",
            }}
        >
            <TokenBox {...tokenBoxProps[0]} />
            <Box mb={2}/>
            <TokenBox {...tokenBoxProps[0]} />
            <Button
                sx={{width: "100%", mt: 3}}
                label="Add Liquidity"
                onClick={onProvideLiquidityClick}
                loading={isProvideLiquidityLoading}
            />
        </Box>);
};

export const CreatePoolModal = ({
                                    isOpen,
                                    tokenBoxProps,
                                    setOpen,
                                    onCreatePoolClick,
                                    onProvideLiquidityClick,
                                    isCreatePoolLoading,
                                    poolType,
                                    setPoolType,
                                    isProvideLiquidityLoading,
                                    error,
                                    disabled,
                                }: CreatePoolModalProps) => {
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: {md: 500, xs: "100%"},
        borderRadius: "1.5rem",
        border: `1px solid ${theme.palette.strokePrimary}`,
        background: theme.palette.bgSecondary,
        boxShadow: "0px 6px 40px -8px rgba(10, 11, 15, 0.60)",
        backdropFilter: "blur(20px)",
    };

    return (<Modal
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
                            fontSize: "1.125rem", fontWeight: 500, lineHeight: "1.75rem", color: theme.palette.textLoud,
                        }}
                    >
                        {tokenBoxProps ? "Provide Liquidity" : "Create Pool"}
                    </Typography>
                    <Remove
                        style={{fontSize: "1.25rem", cursor: "pointer"}}
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
                    {tokenBoxProps ? (<ProvoideLiquidity
                            tokenBoxProps={tokenBoxProps}
                            onProvideLiquidityClick={onProvideLiquidityClick}
                            isProvideLiquidityLoading={isProvideLiquidityLoading}
                        />) : (<Create
                            error={error}
                            poolType={poolType}
                            setPoolType={setPoolType}
                            isCreatePoolLoading={isCreatePoolLoading}
                            onCreatePoolClick={onCreatePoolClick}
                        />)}
                </Box>
            </Box>
        </Modal>);
};