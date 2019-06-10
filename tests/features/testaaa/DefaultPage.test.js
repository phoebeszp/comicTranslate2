import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/testaaa/DefaultPage';

describe('testaaa/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      testaaa: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.testaaa-default-page').length
    ).toBe(1);
  });
});
