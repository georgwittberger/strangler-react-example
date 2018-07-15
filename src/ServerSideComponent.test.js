import React from 'react';
import { shallow } from 'enzyme';
import ServerSideComponent from './ServerSideComponent';

it('renders given title and text', () => {
  const wrapper = shallow(<ServerSideComponent title = "Hello title" text = "Hello text" />);
  expect(wrapper.find('.server-side-component__title')).toHaveLength(1);
  expect(wrapper.find('.server-side-component__title').text()).toEqual('Hello title');
  expect(wrapper.find('.server-side-component__text')).toHaveLength(1);
  expect(wrapper.find('.server-side-component__text').text()).toEqual('Hello text');
});
