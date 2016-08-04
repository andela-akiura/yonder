import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FontIcon from 'material-ui/FontIcon';

const style = {
  fbIcon: {
    color: '#4468b3',
    width: '100%',
  },
  background: {
    background: 'url("/static/images/perfect_shot.jpg")no-repeat center center fixed',
    '-webkit-background-size': 'cover',
    '-moz-background-size': 'cover',
    '-o-background-size': 'cover',
    'background-size': 'cover',
    overflow: 'hidden',
    height: '100vh',
  },
  appName: {
    fontFamily: 'Shadows Into Light',
    width: '250px',
    margin: '20px auto',
    position: 'relative',
    display: 'flex',
    fontSize: '70px',
    color: '#E57373',
  },
  appTagLine: {
    width: '500px',
    margin: '40px auto',
    position: 'relative',
    display: 'flex',
    fontFamily: 'Shadows Into Light',
    fontSize: '30px',
    color: '#E57373',
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
  window.FB.login((payload) => {
    if (payload.authResponse) {
      window.FB.api('/me', { fields: 'name,picture' }, (me) => {
        Object.assign(me, payload.authResponse);
        onSuccessfulLogin(me);
      });
    }
  }, { scope: 'email,public_profile', return_scopes: true });
};


const LoginForm = () => {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
    <div style={style.background}>
    <div>
      <p style={style.appName}>
      KHALI.
      </p>
      <p style={style.appTagLine}>
      Khali helps you upload, edit and share your favorite photos.
      </p>
    </div>
      <div className="login-button">
        <RaisedButton
          label="Login with Facebook"
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
