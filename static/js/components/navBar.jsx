import React from 'react';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';


const style = {
  navBar: {
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
  brand: {
    fontFamily: 'Shadows Into Light',
    fontSize: '40px',
    color: 'white',
  },
  logout: {
    fontSize: '18px',
    color: 'white',
  },
};

const logout = () => {
  localStorage.clear();
  window.location.href = '/';
};

const NavBar = ({ profPic, name }) => (
  <Toolbar className="toolbar" style={style.navBar}>
    <ToolbarGroup firstChild>
      <ToolbarTitle style={style.brand} text="KHALI"/>
    </ToolbarGroup>
    <ToolbarGroup lastChild>
      <div style={style.greeting}>
        Hello {name}
      </div>
      <Avatar
        style={style.avatar}
        src={profPic}
        size={40}
      />
      <FlatButton
        style={style.logout}
        onClick={logout}
        label="LOGOUT"
      />
    </ToolbarGroup>
  </Toolbar>
);

NavBar.propTypes = {
  profPic: React.PropTypes.string,
  name: React.PropTypes.string,
};
export default NavBar;
