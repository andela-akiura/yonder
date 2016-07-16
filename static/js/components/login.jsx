import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const LoginForm = () => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <div>
      <RaisedButton
        label="Login with facebook"
        href="/login/facebook/?next=/"
      />
    </div>
  </MuiThemeProvider>
);

// LoginForm.propTypes = {
//   link: React.PropTypes.string.isRequired,
// };

export default LoginForm;
