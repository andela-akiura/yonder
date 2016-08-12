import { GridTile } from 'material-ui/GridList';
import React from 'react';

const Thumbnail = ({ thumbnail, styling, _onClick, id }) => {
  const onFilterClick = () => {
    _onClick(thumbnail.filter_name);
  };

  return (<GridTile
    className="grow"
    tabIndex={id}
    style={styling.gridTile}
    title={<p style={styling.filterName}>{thumbnail.filter_name}</p>}
    onClick={onFilterClick}
  >
  <img
    className="filter"
    height="70"
    width="120"
    src={thumbnail.filtered_thumbnail}
  />
  </GridTile>);
};

Thumbnail.propTypes = {
  thumbnail: React.PropTypes.object,
  style: React.PropTypes.object,
  _onClick: React.PropTypes.func,
  id: React.PropTypes.number,
};

export default Thumbnail;
