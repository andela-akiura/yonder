import React from 'react';
import expect from 'expect';
import { shallow, mount } from 'enzyme';
import SideBar from '../components/sideBar.jsx';
import {ListItem } from 'material-ui/List';

describe('<SideBar />', () => {
  const folders = [
    { id: 1,
      folder_name: 'New Folder',
      created_by: { username: 'kiura', first_name: 'Alex', last_name: 'Kiura' },
      images: [
        { id: 7, original_image: '../../images/placeholder.png', image_name: 'Sample',
          date_created: new Date(), date_modified: new Date(), image_size: '2 KB' }],
        }
  ];
  const wrapper = shallow(<SideBar folders={folders} />);

  it('Contains a list of folders', () => {
    expect(wrapper.find('.folder').length).toBe(1);
  });
  it('Organizes folders according to lists', () => {
    expect(wrapper.find(ListItem).props()['primaryTogglesNestedList']).toBe(true)
  });
  it('Contains a list of folders with images', () => {
    expect(wrapper.find(ListItem).length).toBe(1);
  });
  it('Displays the foldername passed in props.', () => {
    expect(wrapper.find(ListItem).props()['primaryText']).toBe('New Folder')
  });
});
