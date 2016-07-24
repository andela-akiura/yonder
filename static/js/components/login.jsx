import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
// import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const onSuccessfulLogin = (resp) => {
  // save details in local storage
  localStorage.setItem('name', resp.name);
  localStorage.setItem('userId', resp.id);
  localStorage.setItem('profPic', resp.picture.data.url);
  localStorage.setItem('accessToken', resp.accessToken);
  localStorage.setItem('FB', window.FB);
  window.location.href = '/home';
};

const login = () => {
  // check login status and
  window.FB.getLoginStatus((response) => {
    if (response.status === 'connected') {
      window.FB.logout();
    }
    window.FB.login((payload) => {
      if (payload.authResponse) {
        window.FB.api('/me', { fields: 'name,picture' }, (me) => {
          Object.assign(me, payload.authResponse);
          onSuccessfulLogin(me);
        });
      }
    }, { scope: 'email,public_profile', return_scopes: true });
  });
};


const LoginForm = () => {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div>
        <RaisedButton
          label="Continue with facebook"
          onClick={login}
        />
      </div>
    </MuiThemeProvider>
  );
};
// LoginForm.propTypes = {
//   fb: React.PropTypes.object,
// };
export default LoginForm;
