import React from 'react';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';


const style = {
  menuBar: {
    backgroundColor: '#00bcd4',
  },
  avatar: {
    marginTop: '10px',
  },
  greeting: {
    padding: '5px',
    marginTop: '15px',
    fontSize: '15px',
    color: 'white',
  },
  logout: {
    fontSize: '18px',
    color: 'white',
  },
};
const profPic = localStorage.getItem('profPic');

const logout = () => {
  localStorage.clear();
  window.location.href = '/';
}

const Menu = () => (
  <Toolbar className="toolbar" style={style.menuBar}>
    <ToolbarGroup firstChild>
      <ToolbarTitle style={style.logout} text="Pixlr"/>
    </ToolbarGroup>
    <ToolbarGroup lastChild>
      <div style={style.greeting}>
        Hello {localStorage.getItem('name')}
      </div>
      <Avatar
        style={style.avatar}
        src={profPic}
        size={40}
      />
      <FlatButton
        style={style.logout}
        onClick={logout}
        label='LOGOUT'
        />
    </ToolbarGroup>
  </Toolbar>
);

export default Menu;
