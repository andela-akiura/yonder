import React from 'react';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import {
blue300,
indigo900,
orange200,
deepOrange300,
pink400,
purple500,
} from 'material-ui/styles/colors';


const SideBar = ({folders}) => {
  console.log(folders);
  return (
    <List className="box">
      <Subheader>Uploaded photos</Subheader>
      {folders.map((folder) => (
        <ListItem
          primaryText={Object.keys(folder)[0]}
          leftAvatar={<Avatar
            color={blue300}
            backgroundColor={indigo900}
            icon={<FileFolder />} />}
          key={folders.indexOf(folder)}
          nestedItems={
            folder[Object.keys(folder)[0]].map((image) => (
              <ListItem
                key={folder[Object.keys(folder)[0]].indexOf(image)}
                leftAvatar={<Avatar src={image.original_image} size={50}/>}
                primaryText={image.image_name}
              />
            ))
          }
        />
      ))}
    </List>
  )
};

SideBar.PropTypes = {
  folders: React.PropTypes.array
}

export default SideBar;
