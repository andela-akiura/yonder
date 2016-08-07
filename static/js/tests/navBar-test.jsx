import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import NavBar from '../components/navBar.jsx';
import Avatar from 'material-ui/Avatar';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';

describe('<NavBar /> with props', () => {
  const wrapper = shallow(
    <NavBar profPic="https://d3bbzwfwqfue5e.cloudfront.net/images/brain_freeze.jpg" name="Brain Freeze" />);
  it('Should contain a toolbar', () => {
    expect(wrapper.find(Toolbar).length).toBe(1);
  });

  it('Should contain a toolbar with children', () => {
    expect(wrapper.find(ToolbarGroup).length).toEqual(2);
  });

  it('Should contain the name of the app', () => {
    expect(wrapper.find(ToolbarTitle).length).toEqual(1);
    expect(wrapper.find(ToolbarTitle).props().text).toEqual('KHALI');
  });

  it('Displays a profile picture', () => {
    const avatar = wrapper.find(Avatar);
    expect(wrapper.find(Avatar).length).toBe(1);
    expect(avatar.props().src).toBe('https://d3bbzwfwqfue5e.cloudfront.net/images/brain_freeze.jpg');
  });

  it('Displays a user greeting', () => {
    expect(wrapper.find('div').text()).toEqual('Hello Brain Freeze');
  });
});

describe('<NavBar /> without props', () => {
  const wrapper = shallow(
    <NavBar />);
  it('Should contain a toolbar', () => {
    expect(wrapper.find(Toolbar).length).toBe(1);
  });

  it('Does not render a profile picture', () => {
    const avatar = wrapper.find(Avatar);
    expect(wrapper.find(Avatar).length).toBe(1);
    expect(avatar.props().src).toBe(undefined);
  });

  it('Displays an incomplete user greeting', () => {
    expect(wrapper.find('div').text()).toEqual('Hello ');
  });
});
