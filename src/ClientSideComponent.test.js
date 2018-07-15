import React from 'react';
import { shallow } from 'enzyme';
import ClientSideComponent from './ClientSideComponent';

it('renders given title and text', () => {
  const wrapper = shallow(<ClientSideComponent title = "Hello title" text = "Hello text" />);
  expect(wrapper.find('.client-side-component__title')).toHaveLength(1);
  expect(wrapper.find('.client-side-component__title').text()).toEqual('Hello title');
  expect(wrapper.find('.client-side-component__text')).toHaveLength(1);
  expect(wrapper.find('.client-side-component__text').text()).toEqual('Hello text');
});
