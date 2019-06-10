import React from 'react';
import { shallow } from 'enzyme';
import { DetailInfo } from '../../../src/features/comic-translate/DetailInfo';

describe('comic-translate/DetailInfo', () => {
  it('renders node with correct class name', () => {
    const props = {
      comicTranslate: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DetailInfo {...props} />
    );

    expect(
      renderedComponent.find('.comic-translate-detail-info').length
    ).toBe(1);
  });
});
