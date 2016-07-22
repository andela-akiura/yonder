import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Menu from './menu.jsx';
import SideBar from './sideBar.jsx';
import request from 'superagent';

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


const Home = () => {
  let images = []
  if (localStorage.getItem('accessToken')) {
    fetchImage().then((response) => {
      images = response;
      console.log(organizeImages(response, generateFolders(response)));
    });
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <Menu />
          <div className="row start-xs">
            <div className="col-xs-3">
              <SideBar images={images}/>
            </div>
          </div>
        </div>
      </MuiThemeProvider>)
    } else {
      window.location.href = '/';
    }
  };

export default Home;
