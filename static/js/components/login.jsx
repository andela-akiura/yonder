import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FontIcon from 'material-ui/FontIcon';

const style = {
  fbIcon: {
    color: '#4468b3',
  },
  background: {
    background: 'url("/static/images/perfect_shot.jpg")no-repeat center fixed',
    height: '100vh',
    overflow: 'auto',
  },
};

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
    <div style={style.background}>
      <div className="login-button">
        <RaisedButton
          label="Continue with facebook"
          onClick={login}
          labelStyle={style.fbIcon}
          icon={<FontIcon className="fa fa-facebook-official social" />}
        />
      </div>
    </div>
    </MuiThemeProvider>
  );
};

export default LoginForm;
