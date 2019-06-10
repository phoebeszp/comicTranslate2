import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/comic-tanslate/DefaultPage';

describe('comic-tanslate/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      comicDetail: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.comic-tanslate-default-page').length
    ).toBe(1);
  });
});
