import { IDENTIFIERS } from 'react-polymorph/lib/components';
import { ButtonSkin } from 'react-polymorph/lib/skins/simple/ButtonSkin';
import { FormFieldSkin } from 'react-polymorph/lib/skins/simple/FormFieldSkin';
import { InputSkin } from 'react-polymorph/lib/skins/simple/InputSkin';

export const Skins = {
  [IDENTIFIERS.BUTTON]: ButtonSkin,
  [IDENTIFIERS.FORM_FIELD]: FormFieldSkin,
  [IDENTIFIERS.INPUT]: InputSkin,
};
