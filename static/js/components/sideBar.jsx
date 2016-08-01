import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import {
blue300,
indigo900,
} from 'material-ui/styles/colors';


const SideBar = (props) => {
  const handleImageClick = (image) => {
    props.updateCanvas(image);
  };
  return (
    <List className="box">
      <Subheader>Uploaded photos</Subheader>
      {props.folders.map((folder) => (
        <ListItem
          primaryText={Object.keys(folder)[0]}
          primaryTogglesNestedList
          leftAvatar={<Avatar
            color={blue300}
            backgroundColor={indigo900}
            icon={<FileFolder />}
          />}
          key={props.folders.indexOf(folder)}
          nestedItems={
            folder[Object.keys(folder)[0]].map((image, index) => (
              <ListItem
                key={index}
                leftAvatar={<Avatar src={image.original_image} size={50}/>}
                primaryText={<div src={image.original_image}>{image.image_name}</div>}
                name="{image.image_name}"
                src={image.original_image}
                onTouchTap={handleImageClick.bind(null, image)}
              />
            ))
          }
        />
      ))}
    </List>
  );
};

SideBar.propTypes = {
  folders: React.PropTypes.array,
  updateCanvas: React.PropTypes.func,
};

export default SideBar;
