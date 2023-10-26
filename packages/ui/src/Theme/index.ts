import { 
  PaletteOptions,
  ThemeOptions, 
  createTheme ,
} from '@mui/material/styles';

const createFontSize = ({
  xs,
  sm,
  md,
  lg,
  xl
}: {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}) => {
  return {
    fontSize: `${xs}px`,
    '@media (min-width:600px)': {
      fontSize: `${sm}px`,
    },
    '@media (min-width:900px)': {
      fontSize: `${md}px`,
    },
    '@media (min-width:1200px)': {
      fontSize: `${lg}px`,
    },
    '@media (min-width:1536px)': {
      fontSize: `${xl}px`,
    },
  }
}

interface CustomPaletteOptions extends PaletteOptions {
  bgWhite: string;
  bgPrimary: string;
  bgSecondary: string;
  bgAlpha0: string;
  bgAlpha25: string;
  bgAlpha100: string;
  bgAlpha200: string;
  bgAlphaHover: string;
  textLoud: string;
  textMuted: string;
  textNormal: string;
  textSubdued: string;
  textDisabled: string;
  textBlack: string;
  iconLoud: string;
  iconMuted: string;
  iconNormal: string;
  iconSubdued: string;
  iconDisabled: string;
  strokePrimary: string;
  strokeHover: string;
  strokeSecondary: string;
  primaryBtnBg: string;
  primaryBtnBgHover: string;
  secondaryBtnBg: string;
  secondaryBtnBgHover: string;

  green: {
    dark: string;
    base: string;
    light: string;
  },
  yellow: {
    dark: string;
    base: string;
    light: string;
  },
  orange: {
    dark: string;
    base: string;
    light: string;
  },
  purple: {
    dark: string;
    base: string;
    light: string;
  },
  red: {
    dark: string;
    base: string;
    light: string;
  },
}

// Create a custom theme using the extended interface
const theme = createTheme({
  palette: {
    mode: 'dark',
    bgWhite: '#FFFFFF',
    bgPrimary: 'radial-gradient(52.99% 50% at 52.99% 50%, rgba(67, 199, 129, 0.20) 0%, rgba(10, 11, 15, 0.00) 100%), radial-gradient(99.73% 84.28% at 45.45% 13.09%, rgba(69, 202, 131, 0.06) 0%, rgba(7, 9, 12, 0.00) 100%), #08090D)',
    bgSecondary: '#0A0F10',
    bgAlpha0: 'rgba(255, 255, 255, 0.02)',
    bgAlpha25: 'rgba(255, 255, 255, 0.04)',
    bgAlpha100:'rgba(255, 255, 255, 0.10)',
    bgAlpha200: 'rgba(255, 255, 255, 0.20)',
    bgAlphaHover: 'radial-gradient(99.73% 84.28% at 45.45% 13.09%, rgba(69, 202, 131, 0.06) 0%, rgba(69, 202, 131, 0.00) 100%), rgba(255, 255, 255, 0.04)',
    textLoud: '#FFF',
    textMuted: 'rgba(255, 255, 255, 0.76)',
    textNormal: 'rgba(255, 255, 255, 0.64)',
    textSubdued: 'rgba(255, 255, 255, 0.56)',
    textDisabled: 'rgba(255, 255, 255, 0.40)',
    textBlack: '#0A0C0F',
    iconLoud: '#FFF',
    iconMuted: 'rgba(255, 255, 255, 0.76)',
    iconNormal: 'rgba(255, 255, 255, 0.64)',
    iconSubdued: 'rgba(255, 255, 255, 0.56)',
    iconDisabled: 'rgba(255, 255, 255, 0.32)',
    strokePrimary: 'rgba(255, 255, 255, 0.10)',
    strokeHover: '#44CA83',
    strokeSecondary: 'radial-gradient(100% 100% at 50% 0%, #56CF8F 0%, rgba(10, 11, 15, 0.00) 100%), rgba(255, 255, 255, 0.10)',
    primaryBtnBg: 'linear-gradient(180deg, rgba(255, 255, 255, 0.32) 0%, rgba(255, 255, 255, 0.00) 100%), #44CA83',
    primaryBtnBgHover: '#29C772',
    secondaryBtnBg: 'rgba(255, 255, 255, 0.02)',
    secondaryBtnBgHover: 'rgba(255, 255, 255, 0.10)',
  } as CustomPaletteOptions,
  typography: {
    fontFamily: 'Inter',
    h1: createFontSize({
      xs: 24,
      sm: 32,
      md: 36,
      lg: 40,
      xl: 44,
    }),
  },
});

export default theme;