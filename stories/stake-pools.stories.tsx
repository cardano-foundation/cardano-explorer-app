import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { storiesOf, addDecorator, Fragment } from '@storybook/react';
import React, { Children, cloneElement, useState } from 'react';
import StakePoolsList from '../source/features/stake-pools/components/StakePoolsList';
import StakePoolThumbnail from '../source/features/stake-pools/components/StakePoolThumbnail';
import StakePoolTooltip from '../source/features/stake-pools/components/StakePoolTooltip';
import DUMMY_DATA from '../source/features/stake-pools/stakingStakePools.dummy.json';
import { ThemeDecorator } from './support/ThemeDecorator';
import { getColorFromRange } from '../source/utils/colors';

// addDecorator(withKnobs);
// console.log('withKnobs', withKnobs);

const ListWrapper = (story: any) =>
  React.createElement(() => {
    const [selectedPoolId, onSelect] = useState('');
    const onClose = () => onSelect('');
    return (
      <div style={{ backgroundColor: '#1c1f30' }}>
        {Children.map(story(), child => (
          <ThemeDecorator>
            {cloneElement(child, { selectedPoolId, onSelect, onClose })}
          </ThemeDecorator>
        ))}
      </div>
    );
  });

storiesOf('Stake Pools|List', module)
  .addDecorator(ListWrapper)
  .add('List - With pools', () => (
    <StakePoolsList
      stakePoolsList={DUMMY_DATA}
      selectedPoolId=""
      onSelect={action('onClose')}
      onClose={action('onClose')}
    />
  ))
  .add('List - Empty', () => (
    <div style={{ backgroundColor: '#1c1f30' }}>
      <StakePoolsList
        stakePoolsList={[]}
        selectedPoolId=""
        onSelect={action('onSelect')}
        onClose={action('onClose')}
      />
    </div>
  ));

const ComponentsWrapper = story => (
  <div
    style={{
      backgroundColor: '#1c1f30',
      position: 'relative',
      height: '100vh',
      padding: 50,
    }}
  >
    {story()}
  </div>
);

storiesOf('Stake Pools|Components', module)
  .addDecorator(ComponentsWrapper)
  .add('Thumbnail', () => {
    return (
      <div>
        <StakePoolThumbnail
          key="0"
          stakePool={DUMMY_DATA[0]}
          color={getColorFromRange(DUMMY_DATA[0].ranking)}
          isSelected={false}
          onSelect={action('onSelect')}
        />
        <StakePoolThumbnail
          key="1"
          stakePool={DUMMY_DATA[50]}
          color={getColorFromRange(DUMMY_DATA[50].ranking)}
          isSelected={false}
          onSelect={action('onSelect')}
        />
        <StakePoolThumbnail
          key="2"
          stakePool={DUMMY_DATA[90]}
          color={getColorFromRange(DUMMY_DATA[90].ranking)}
          isSelected={false}
          onSelect={action('onSelect')}
        />
      </div>
    );
  })
  .add('Tooltip', () => (
    <div style={{ position: 'relative', top: 50 }}>
      <StakePoolTooltip
        position={{ horizontal: 'left', vertical: 'top' }}
        stakePool={DUMMY_DATA[0]}
        color={getColorFromRange(DUMMY_DATA[0].ranking)}
        onClose={action('onClose')}
      />
    </div>
  ));
