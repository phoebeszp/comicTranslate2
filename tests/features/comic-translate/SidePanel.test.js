import React from 'react';
import { shallow } from 'enzyme';
import { SidePanel } from '../../../src/features/comic-translate';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<SidePanel />);
  expect(renderedComponent.find('.comic-translate-side-panel').length).toBe(1);
});
