import React from 'react';
import { shallow } from 'enzyme';
import { OperationPanel } from '../../../src/features/comic-translate/OperationPanel';

describe('comic-translate/OperationPanel', () => {
  it('renders node with correct class name', () => {
    const props = {
      comicTranslate: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <OperationPanel {...props} />
    );

    expect(
      renderedComponent.find('.comic-translate-operation-panel').length
    ).toBe(1);
  });
});
