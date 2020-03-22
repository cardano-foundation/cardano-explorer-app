import { CSSProperties } from 'react';
import { IDENTIFIERS } from 'react-polymorph/lib/components';
import SimpleButton from 'react-polymorph/lib/themes/simple/SimpleButton.module.scss';
import SimpleFormField from 'react-polymorph/lib/themes/simple/SimpleFormField.module.scss';
import SimpleInput from 'react-polymorph/lib/themes/simple/SimpleInput.module.scss';

export const reactPolymorphTheme = {
  [IDENTIFIERS.BUTTON]: SimpleButton,
  [IDENTIFIERS.FORM_FIELD]: SimpleFormField,
  [IDENTIFIERS.INPUT]: SimpleInput,
};

interface IGenerateThemeConfig {
  dottedSeparatorColor: string;
  epochProgressSpinnerBg: string;
  errorColor: string;
  errorPageBottomContainerBgColor: string;
  errorPageTopContainerBgColor: string;
  footerSeparatorColor: string;
  footerTextColor: string;
  headerBackgroundColor: string;
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
  ['--epoch-progress-spinner-color' as any]: config.epochProgressSpinnerBg,
  ['--error-color' as any]: config.errorColor,
  ['--error-bottom-container-bg-color' as any]: config.errorPageBottomContainerBgColor,
  ['--error-top-container-bg-color' as any]: config.errorPageTopContainerBgColor,
  ['--footer-text-color' as any]: config.footerTextColor,
  ['--footer-separator-color' as any]: config.footerSeparatorColor,
  ['--header-background-color' as any]: config.headerBackgroundColor,
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
  errorPageBottomContainerBgColor: `linear-gradient(
      rgba(18, 19, 38, 0.35),
      rgba(18, 19, 38, 0.65),
      rgba(18, 19, 38, 0.85),
      rgba(18, 19, 38, 0.95)
  )`,
  errorPageTopContainerBgColor: `linear-gradient(
      rgba(18, 19, 38, 0.95),
      rgba(18, 19, 38, 0.85),
      rgba(18, 19, 38, 0.65),
      rgba(18, 19, 38, 0.35)
  )`,
  footerSeparatorColor: 'rgba(255, 255, 255, 0.1)',
  headerBackgroundColor: '#1D1E31',
  highlightedDarkAreaBgColor: 'rgba(255, 255, 255, 0.05)',
  hintTextColor: 'rgba(255, 255, 255, 0.5)',
  infoTextColor: 'rgba(255, 255, 255, 0.7)',
  popupBgColor: '#3f404f',
  primaryBgColor: '#121326',
  searchAreaBgColor: 'rgba(255, 255, 255, 0.05)',
  shadowColor: 'rgba(0, 0, 0, 0.5)',
  solidTextColor: 'rgba(255, 255, 255, 1)',
  tableTextColor: 'rgba(255, 255, 255, 0.5)',
};

export const mainnetTheme = generateTheme({
  ...commonThemeProps,
  dottedSeparatorColor: '#36395d',
  epochProgressSpinnerBg:
    'url(/assets/images/epoch/ouroboros-spinning-gradient.png)',
  errorColor: '#eb2256',
  footerTextColor: 'rgba(31, 193, 195, 0.5)',
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

export const cardanoExplorerTheme = mainnetTheme;
