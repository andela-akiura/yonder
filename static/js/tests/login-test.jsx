import React from 'react';
import expect from 'expect';
import { shallow , mount, render } from 'enzyme';
import LoginForm from '../components/login.jsx';
import RaisedButton from 'material-ui/RaisedButton';

describe('<LoginForm />', () => {
  const wrapper = shallow(<LoginForm />);
  it('Should contain a login button', () => {
    expect(wrapper.find(RaisedButton).length).toBe(1);
  });

  it('Should contain a facebook login button', () => {
    const fbButton = wrapper.find(RaisedButton);
    expect(fbButton.props()['label']).toEqual('Login with Facebook');
  });
});
