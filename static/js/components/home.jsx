import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Home = () => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <div>
      Welcome to pixlr
    </div>
  </MuiThemeProvider>
);

// LoginForm.propTypes = {
//   link: React.PropTypes.string.isRequired,
// };

export default Home;
