import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Menu from './menu.jsx';
import SideBar from './sideBar.jsx';
import request from 'superagent';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import LinearProgress from 'material-ui/LinearProgress';

const generateFolders = (imageList) => (
  // return a list of unique folders
  Array.from(new Set(imageList.map((image) => {
    if (image.folder_name === '') {
      return 'untitled';
    }
    return image.folder_name;
  })))
);

const organizeImages = (imageList, folderList) => {
  return folderList.map((folder) => (
    {[folder]: imageList.filter((image) => {
      if (image.folder_name === folder) {
        return image
      } else if(image.folder_name === '' && folder === 'untitled') {
        return image
      }
    })}
  ))
}

const fetchImage = () => {
  // returns a Promise object.
  return new Promise((resolve, reject) => {
    request
    .get('/api/v1/images/')
    .set('Authorization', `Bearer facebook ${localStorage.getItem('accessToken')}`)
    .end((error, result) => {
      if (!error) {
        resolve(result.body);
      } else {
        reject(error);
      }
    });
  });
};


class Home extends Component {
  constructor() {
    super();
    this.state = {
      folders: [],
    }
  }

  componentDidMount() {
    if (localStorage.getItem('accessToken')) {
      fetchImage().then((response) => {
        const folders = organizeImages(response, generateFolders(response));
        this.setState({folders})
      });
      } else {
        window.location.href = '/';
      }
  }

  render() {

    return this.state.folders.length > 0 ?
      (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <div>
            <Menu />
            <div className="row start-xs">
              <div className="col-xs-3">

                <SideBar folders={this.state.folders}/>
              </div>
            </div>
          </div>
        </MuiThemeProvider>): (
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            <div>
              <Menu />
              <div>
                {/*<RefreshIndicator
                  size={50}
                  left={70}
                  top={0}
                  status="loading"
                />*/}
                <LinearProgress mode="indeterminate" />
              </div>
            </div>
          </MuiThemeProvider>)
  }
};

export default Home;
