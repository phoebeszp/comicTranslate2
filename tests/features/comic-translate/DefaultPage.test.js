import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/comic-translate/DefaultPage';

describe('comic-translate/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      comicTranslate: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.comic-translate-default-page').length
    ).toBe(1);
  });
});
