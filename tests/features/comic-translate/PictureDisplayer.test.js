import React from 'react';
import { shallow } from 'enzyme';
import { PictureDisplayer } from '../../../src/features/comic-translate/PictureDisplayer';

describe('comic-translate/PictureDisplayer', () => {
  it('renders node with correct class name', () => {
    const props = {
      comicTranslate: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <PictureDisplayer {...props} />
    );

    expect(
      renderedComponent.find('.comic-translate-picture-displayer').length
    ).toBe(1);
  });
});
