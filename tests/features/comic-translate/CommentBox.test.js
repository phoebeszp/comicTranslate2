import React from 'react';
import { shallow } from 'enzyme';
import { CommentBox } from '../../../src/features/comic-translate/CommentBox';

describe('comic-translate/CommentBox', () => {
  it('renders node with correct class name', () => {
    const props = {
      comicTranslate: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <CommentBox {...props} />
    );

    expect(
      renderedComponent.find('.comic-translate-comment-box').length
    ).toBe(1);
  });
});
