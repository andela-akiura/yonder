import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Home from '../components/home.jsx';
import NavBar from '../components/navBar.jsx';
import SideBar from '../components/sideBar.jsx';
import Thumbnail from '../components/thumbnail.jsx';
import { Card, CardMedia } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

describe('<Home />', () => {
  const wrapper = shallow(<Home />);
  const thumbnails = [
    {
      filtered_thumbnail: 'https://d3bbzwfwqfue5e.cloudfront.net/images/thumbnails/pandaCONTOUR.jpg',
      filter_name: 'CONTOUR',
      original_thumbnail: 1,
    },
    {
      filtered_thumbnail: 'https://d3bbzwfwqfue5e.cloudfront.net/images/thumbnails/pandaBLUR.jpg',
      filter_name: 'BLUR',
      original_thumbnail: 1,
    },
  ];
  it('Renders the Navigation bar', () => {
    expect(wrapper.find(NavBar).length).toBe(1);
  });
  it('Renders the SideBar with folders', () => {
    expect(wrapper.find(SideBar).length).toBe(1);
  });
  it('Renders the clickable thumbnails for applying filters', () => {
    wrapper.setState({ thumbnails });
    expect(wrapper.find(Thumbnail).first().props().thumbnail).toBe(thumbnails[0]);
    expect(wrapper.find(Thumbnail).length).toBe(2);
  });
  it('Renders the active image on the canvas', () => {
    wrapper.setState({ activeImage: 'https://d3bbzwfwqfue5e.cloudfront.net/images/thumbnails/pandaBLUR.jpg' });
    expect(wrapper.find('img').length).toBe(1);
  });
  it('Contains an image upload button', () => {
    expect(wrapper.find('.upload-button').length).toBe(1);
  });
  it('Contains a card to render the image on', () => {
    expect(wrapper.find(Card).length).toBe(1);
  });
  it('Contains a button to delete the images', () => {
    expect(wrapper.find('.download-button').length).toBe(1);
  });
  it('Contains a share to facebook button', () => {
    expect(wrapper.find('.fb-share-button').length).toBe(1);
  });
  it('Contains a button to copy an image url', () => {
    expect(wrapper.find('.copy-url-button').length).toBe(1);
  });
  it('Contains a button to save filter changes', () => {
    expect(wrapper.find('.save_changes-button').length).toBe(1);
  });
});
