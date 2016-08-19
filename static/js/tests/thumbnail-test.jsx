import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Thumbnail from '../components/thumbnail.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import { GridTile } from 'material-ui/GridList';
import sinon from 'sinon';

describe('<Thumbnail />', () => {
  const applyFilter = (filterName) => (filterName);
  const click = sinon.spy(applyFilter);
  const thumbnail = { filter_name: 'BLUR', filtered_thumbnail: 'sample' };
  const wrapper = shallow(
    <Thumbnail
      thumbnail={thumbnail}
      styling={{ marginLeft: 10, height: '120px', cursor: '-webkit-grab',
          position: 'relative', overflow: 'hidden' }}
      _onClick={click}
    />);

  it('Should be clickable', () => {
    expect(wrapper.find(GridTile).length).toBe(1);
    wrapper.find(GridTile).simulate('click');
    expect(click.called).toBe(true);
  });

  it('Should apply the selcted filter', () => {
    expect(wrapper.find(GridTile).length).toBe(1);
    wrapper.find(GridTile).simulate('click');
    expect(click.calledWith('BLUR')).toBe(true);
  });
});
