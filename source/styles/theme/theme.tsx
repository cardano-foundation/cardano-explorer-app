import color from 'color';
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
  primaryHighlightColor: string;
  secondaryHighlightColor: string;
}

export const generateTheme = (config: IGenerateThemeConfig) => ({
  '--epoch-progress-spinner-color': `
    conic-gradient(
      rgba(0, 0, 0, 0),
      ${color(config.primaryHighlightColor).alpha(0.2)} 21%,
      ${config.primaryHighlightColor} 52%,
      ${color(config.primaryHighlightColor).alpha(0.3)} 57%,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0)
    )`,
  '--primary-highlight-color': config.primaryHighlightColor,
  '--secondary-highlight-color': config.secondaryHighlightColor,
});

export const incentivizedTestnetTheme = generateTheme({
  primaryHighlightColor: '#eb2256',
  secondaryHighlightColor: '#f69ab2',
});

export const mainnetTheme = generateTheme({
  primaryHighlightColor: '#1fc1c3',
  secondaryHighlightColor: '#709cf0',
});

export const cardanoExplorerTheme = isIncentivisedTestnet
  ? incentivizedTestnetTheme
  : mainnetTheme;
