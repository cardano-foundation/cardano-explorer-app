import { shallow } from 'enzyme';
import React from 'react';
import { TransactionInfoRow } from './TransactionInfoRow';

describe('<TransactionInfoRow/>', () => {
  it('deposit :renders label with value', () => {
    const label = 'Deposit';
    const value = '2 ADA';
    const wrapper = shallow(<TransactionInfoRow label={label} value={value} />);
    expect(wrapper.find('[data-testid="label"]').text()).toEqual(label);
    expect(wrapper.find('[data-testid="value"]').text()).toEqual(value);
  });
});
