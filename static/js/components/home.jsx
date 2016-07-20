import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Home = () => {
  if (localStorage.getItem('accessToken')) {
    return (<MuiThemeProvider muiTheme={getMuiTheme()}>
    <div>
      Welcome to pixlr
    </div>
  </MuiThemeProvider>)
} else {
  window.location.href = '/';
}
  };

// LoginForm.propTypes = {
//   link: React.PropTypes.string.isRequired,
// };

export default Home;
