declare module 'react-polymorph/lib/components' {
  export const IDENTIFIERS: {
    AUTOCOMPLETE: string;
    BUBBLE: string;
    BUTTON: string;
    CHECKBOX: string;
    FLEX: string;
    FORM_FIELD: string;
    GRID: string;
    GUTTER: string;
    HEADER: string;
    INFINITE_SCROLL: string;
    INPUT: string;
    LOADING_SPINNER: string;
    MODAL: string;
    OPTIONS: string;
    PROGRESS_BAR: string;
    RADIO: string;
    SELECT: string;
    STEPPER: string;
    SWITCH: string;
    TEXT_AREA: string;
    TOGGLER: string;
    TOOLTIP: string;
  };
}

declare module 'react-polymorph/lib/components/ThemeProvider' {
  import React from 'react';
  interface IProps {
    theme: object;
    skins: object;
    children: React.ReactNode;
  }
  export class ThemeProvider extends React.Component<IProps> {}
}

declare module 'react-polymorph/lib/components/Input' {
  import React, { ChangeEvent } from 'react';
  interface IProps {
    className?: string;
    disabled?: boolean;
    error?: string;
    label?: string | React.ReactNode;
    onBlur?: () => void;
    onChange?: (value: string, e: ChangeEvent<HTMLInputElement>) => void;
    onFocus?: () => void;
    onKeyPress?: (e: React.KeyboardEvent) => void;
    placeholder?: string;
    readOnly?: boolean;
    value: string;
  }
  // tslint:disable-next-line:max-classes-per-file
  export class Input extends React.Component<IProps> {}
}

declare module 'react-polymorph/lib/components/Button' {
  import React from 'react';
  interface IProps {
    className?: string;
    disabled?: boolean;
    label?: string | React.ReactNode;
    loading?: boolean;
    onClick?: () => void;
  }
  // tslint:disable-next-line:max-classes-per-file
  export class Button extends React.Component<IProps> {}
}

declare module 'react-polymorph/lib/skins/simple/FormFieldSkin' {
  export const FormFieldSkin: any;
}

declare module 'react-polymorph/lib/skins/simple/InputSkin' {
  export const InputSkin: any;
}

declare module 'react-polymorph/lib/skins/simple/ButtonSkin' {
  export const ButtonSkin: any;
}
