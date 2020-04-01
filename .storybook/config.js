import { configure, addDecorator } from '@storybook/react';
import React from 'react';
import { I18nDecorator } from "../stories/support/I18nDecorator";
import { PaddingDecorator } from "../stories/support/PaddingDecorator";
import { ThemeDecorator } from '../stories/support/ThemeDecorator';

const req = require.context('../stories', true, /\.stories\.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(story => <I18nDecorator>{story()}</I18nDecorator>);
addDecorator(story => <ThemeDecorator>{story()}</ThemeDecorator>);
addDecorator(story => <PaddingDecorator>{story()}</PaddingDecorator>);

configure(loadStories, module);
