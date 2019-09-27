import './reset.scss';
// import './variables/variables-fonts.scss';
import './variables/variables-common.scss';

// TODO: get this variable dinamically
const themeName = 'incentivized-testnet';

require(`./variables/variables-theme-${themeName}.scss`);
