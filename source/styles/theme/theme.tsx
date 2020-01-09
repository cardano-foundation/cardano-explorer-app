import chroma from 'chroma-js';
import { CSSProperties } from 'react';
import { IDENTIFIERS } from 'react-polymorph/lib/components';
import SimpleButton from 'react-polymorph/lib/themes/simple/SimpleButton.scss';
import SimpleFormField from 'react-polymorph/lib/themes/simple/SimpleFormField.scss';
import SimpleInput from 'react-polymorph/lib/themes/simple/SimpleInput.scss';
import { CardanoNetwork } from '../../constants';
import { environment } from '../../environment';

export const reactPolymorphTheme = {
  [IDENTIFIERS.BUTTON]: SimpleButton,
  [IDENTIFIERS.FORM_FIELD]: SimpleFormField,
  [IDENTIFIERS.INPUT]: SimpleInput,
};

const isIncentivisedTestnet =
  environment.CARDANO.NETWORK === CardanoNetwork.INCENTIVIZED_TESTNET;

interface IGenerateThemeConfig {
  dottedSeparatorColor: string;
  errorColor: string;
  footerSeparatorColor: string;
  footerTextColor: string;
  highlightedDarkAreaBgColor: string;
  hintTextColor: string;
  infoTextColor: string;
  popupBgColor: string;
  primaryBgColor: string;
  primaryHighlightColor: string;
  primaryHighlightHoverColor: string;
  primaryHighlightPressColor: string;
  searchAreaBgColor: string;
  secondaryColor: string;
  secondaryHalfColor: string;
  secondaryHighlightColor: string;
  shadowColor: string;
  solidTextColor: string;
  spinnerCircleBgColor: string;
  tableTextColor: string;
}

export const generateTheme = (config: IGenerateThemeConfig): CSSProperties => ({
  ['--dotted-separator-color' as any]: config.dottedSeparatorColor,
  ['--epoch-progress-spinner-color' as any]: `
    conic-gradient(
      rgba(0, 0, 0, 0),
      ${chroma(config.primaryHighlightColor).alpha(0.2)} 21%,
      ${config.primaryHighlightColor} 52%,
      ${chroma(config.primaryHighlightColor).alpha(0.3)} 57%,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0)
    )`,
  ['--error-color' as any]: config.errorColor,
  ['--footer-text-color' as any]: config.footerTextColor,
  ['--highlighted-dark-area-bg-color' as any]: config.highlightedDarkAreaBgColor,
  ['--hint-text-color' as any]: config.hintTextColor,
  ['--info-text-color' as any]: config.infoTextColor,
  ['--popup-bg-color' as any]: config.popupBgColor,
  ['--primary-bg-color' as any]: config.primaryBgColor,
  ['--primary-highlight-color' as any]: config.primaryHighlightColor,
  ['--primary-highlight-color-hover' as any]: config.primaryHighlightHoverColor,
  ['--primary-highlight-color-press' as any]: config.primaryHighlightPressColor,
  ['--search-area-bg-color' as any]: config.searchAreaBgColor,
  ['--secondary-half-color' as any]: config.secondaryHalfColor,
  ['--secondary-highlight-color' as any]: config.secondaryHighlightColor,
  ['--shadow-color' as any]: config.shadowColor,
  ['--solid-text-color' as any]: config.solidTextColor,
  ['--table-text-color' as any]: config.tableTextColor,
});

const commonThemeProps = {
  footerSeparatorColor: 'rgba(255, 255, 255, 0.1)',
  highlightedDarkAreaBgColor: 'rgba(255, 255, 255, 0.05)',
  hintTextColor: 'rgba(255, 255, 255, 0.3)',
  infoTextColor: 'rgba(255, 255, 255, 0.7)',
  popupBgColor: '#3f404f',
  primaryBgColor: '#121326',
  searchAreaBgColor: 'rgba(255, 255, 255, 0.05)',
  shadowColor: 'rgba(0, 0, 0, 0.5)',
  solidTextColor: 'rgba(255, 255, 255, 1)',
  tableTextColor: 'rgba(255, 255, 255, 0.5)',
};

export const incentivizedTestnetTheme = generateTheme({
  ...commonThemeProps,
  dottedSeparatorColor: 'rgba(246, 154, 178, 0.3)',
  errorColor: '#eb4a22',
  footerTextColor: '#eb2256',
  primaryHighlightColor: '#eb2256',
  primaryHighlightHoverColor: '#d41345',
  primaryHighlightPressColor: '#c81241',
  secondaryColor: 'rgba(235, 34, 86, 0.3)',
  secondaryHalfColor: 'rgba(246, 154, 178, 0.5)',
  secondaryHighlightColor: '#f69ab2',
  spinnerCircleBgColor: `
    conic-gradient(
      rgba(235, 34, 86, 0),
      rgba(235, 34, 86, 0.2) 21%,
      #eb2256 52%,
      rgba(235, 34, 86, 0.3) 57%,
      rgba(235, 34, 86, 0),
      rgba(235, 34, 86, 0)
    )
  `,
});

export const mainnetTheme = generateTheme({
  ...commonThemeProps,
  dottedSeparatorColor: '#36395d',
  errorColor: '#eb2256',
  footerTextColor: 'rgba(31, 193, 195, 0.3)',
  primaryHighlightColor: '#1fc1c3',
  primaryHighlightHoverColor: '#1db0b3',
  primaryHighlightPressColor: '#1aa1a3',
  secondaryColor: 'rgba(112, 156, 240, 0.3)',
  secondaryHalfColor: 'rgba(112, 156, 240, 0.5)',
  secondaryHighlightColor: '#709cf0',
  spinnerCircleBgColor: `
    conic-gradient(
      rgba(31, 193, 195, 0),
      rgba(31, 193, 195, 0.2) 21%,
      #1fc1c3 52%,
      rgba(31, 193, 195, 0.3) 57%,
      rgba(31, 193, 195, 0),
      rgba(31, 193, 195, 0)
    )
  `,
});

export const cardanoExplorerTheme = isIncentivisedTestnet
  ? incentivizedTestnetTheme
  : mainnetTheme;
