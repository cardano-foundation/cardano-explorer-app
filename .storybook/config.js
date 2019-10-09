import { configure, addDecorator } from '@storybook/react';
import { ThemeDecorator } from '../stories/support/ThemeDecorator';

const req = require.context('../stories', true, /\.stories\.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(story => <ThemeDecorator>{story()}</ThemeDecorator>);

configure(loadStories, module);
