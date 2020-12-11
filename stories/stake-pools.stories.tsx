import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React, { Children, cloneElement, Fragment, useState } from 'react';
import StakePoolsList from '../source/features/stake-pools/components/StakePoolsList';
import StakePoolThumbnail from '../source/features/stake-pools/components/StakePoolThumbnail';
import StakePoolTooltip from '../source/features/stake-pools/components/StakePoolTooltip';
import UnmoderatedDataConsented from '../source/features/stake-pools/components/UnmoderatedDataConsented';
import UnmoderatedDataWarning from '../source/features/stake-pools/components/UnmoderatedDataWarning';
import { getColorFromRange } from '../source/lib/colors';

const DUMMY_DATA = require('../source/features/stake-pools/stakingStakePools.dummy.json');

const ListWrapper = (story: any) =>
  React.createElement(() => {
    const [selectedPoolId, onSelect] = useState('');
    const onClose = () => onSelect('');
    return (
      <Fragment>
        {Children.map(story(), (child) =>
          cloneElement(child, { selectedPoolId, onSelect, onClose })
        )}
      </Fragment>
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
    <StakePoolsList
      stakePoolsList={[]}
      selectedPoolId=""
      onSelect={action('onSelect')}
      onClose={action('onClose')}
    />
  ));

const ComponentsWrapper = (story: any) => (
  <div
    style={{
      height: '100vh',
      padding: 50,
      position: 'relative',
    }}
  >
    {story()}
  </div>
);

storiesOf('Stake Pools|Components', module)
  .addDecorator(ComponentsWrapper)
  .add('Thumbnail', () => [
    <StakePoolThumbnail
      key="0"
      stakePool={DUMMY_DATA[0]}
      color={getColorFromRange(DUMMY_DATA[0].ranking)}
      isSelected={false}
      onSelect={action('onSelect')}
    />,
    <StakePoolThumbnail
      key="1"
      stakePool={DUMMY_DATA[50]}
      color={getColorFromRange(DUMMY_DATA[50].ranking)}
      isSelected={false}
      onSelect={action('onSelect')}
    />,
    <StakePoolThumbnail
      key="2"
      stakePool={DUMMY_DATA[90]}
      color={getColorFromRange(DUMMY_DATA[90].ranking)}
      isSelected={false}
      onSelect={action('onSelect')}
    />,
  ])
  .add('Tooltip', () => (
    <div style={{ position: 'relative', top: 50 }}>
      <StakePoolTooltip
        position={{ horizontal: 'left', vertical: 'top' }}
        stakePool={DUMMY_DATA[0]}
        color={getColorFromRange(DUMMY_DATA[0].ranking)}
        onClose={action('onClose')}
      />
    </div>
  ))
  .add('UnmoderatedDataWarning', () => (
    <UnmoderatedDataWarning
      type="stakePools"
      onAcceptUnmoderatedData={action('onAcceptUnmoderatedData')}
    />
  ))
  .add('UnmoderatedDataConsented', () => (
    <UnmoderatedDataConsented type="stakePools" />
  ));
