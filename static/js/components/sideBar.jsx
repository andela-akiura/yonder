import React, {Component} from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import {
blue300,
indigo900,
} from 'material-ui/styles/colors';
import ActionInfo from 'material-ui/svg-icons/action/info';
import IconButton from 'material-ui/IconButton';
import Popover from 'material-ui/Popover';
import moment from 'moment'


class SideBar extends Component {
  constructor() {
    super();
    this.state = {
      showInfo: false,
      activeNode: '',
      anchorElement: {},
    };
    this.handleImageClick = this.handleImageClick.bind(this);
    this.closeImageInfo = this.closeImageInfo.bind(this);
    this.handleInfoClick = this.handleInfoClick.bind(this);
  }
  handleImageClick(image) {
    this.props.updateCanvas(image);
  }

  handleInfoClick(imageId, event) {
    this.setState({
      showInfo: !this.state.showInfo,
      activeNode: imageId,
      anchorElement: event.currentTarget,
    });
  }

  closeImageInfo() {
    this.setState({
      showInfo: false,
    });
  }

  render() {
    return (
      <List className="box">
        <Subheader>Uploaded photos</Subheader>
        {this.props.folders.map((folder) => (
          <ListItem
            primaryText={folder.folder_name}
            primaryTogglesNestedList
            leftAvatar={<Avatar
              color={blue300}
              backgroundColor={indigo900}
              icon={<FileFolder />}
            />}
            key={folder.id}
            nestedItems={
              folder.images.map((image) => (
                  <ListItem
                    key={image.id}
                    leftAvatar={<Avatar src={image.original_image} size={50}/>}
                    primaryText={<div src={image.original_image}>{image.image_name}</div>}
                    name="{image.image_name}"
                    src={image.original_image}
                    rightIconButton={
                      <IconButton onClick={this.handleInfoClick.bind(null, image.id)}><ActionInfo /></IconButton>
                    }
                    onTouchTap={this.handleImageClick.bind(null, image)}
                  >
                    {this.state.showInfo && this.state.activeNode === image.id ?
                      <div key={image.id}>
                        <p>Created by: {image.created_by.username}</p>
                        <p>Created {moment(image.date_created).fromNow()}</p>
                        <p>Modified {moment(image.date_modified).fromNow()}</p>
                        <p>Size: {image.image_size}</p>
                      </div>
                      : null}

                  </ListItem>
              ))
            }
          />
        ))}
      </List>
    );
  }
}


SideBar.propTypes = {
  folders: React.PropTypes.array,
  updateCanvas: React.PropTypes.func,
};

export default SideBar;
