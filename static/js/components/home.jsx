import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Menu from './menu.jsx';
import SideBar from './sideBar.jsx';
import request from 'superagent';
import LinearProgress from 'material-ui/LinearProgress';
import { Card, CardMedia } from 'material-ui/Card';
import { GridList, GridTile } from 'material-ui/GridList';


const style = {
  container: {
    overflow: 'hidden',
  },
  canvas: {
    height: '50%',
    // maxHeight: '350px',
  },
  gridList: {
    width: '1700px',
    overflow: 'auto',
    overflowY: 'hidden',
    marginBottom: 24,
    flexWrap: 'nowrap',
    padding: 5,
  },
  gridTile: {
    width: '160px',
  },
};

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
    { [folder]: imageList.filter((image) => {
      if (image.folder_name === folder) {
        return image;
      } else if (image.folder_name === '' && folder === 'untitled') {
        return image;
      }
    }) }
  ));
};

const fetchImages = (url) => {
  // returns a Promise object.
  return new Promise((resolve, reject) => {
    request
    .get(url)
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
      activeImage: '/static/images/placeholder.png',
      thumbnails: [],
    };
    this.updateCanvas = this.updateCanvas.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('accessToken')) {
      fetchImages('/api/v1/images/').then((response) => {
        const folders = organizeImages(response, generateFolders(response));
        this.setState({ folders });
      });
      fetchImages('/api/v1/thumbnails/').then((response) => {
        const thumbnails = response[0].filters;
        this.setState({ thumbnails });
      });
    } else {
      window.location.href = '/';
    }
  }

  updateCanvas(src) {
    if (src) {
      this.setState({ activeImage: src });
    }
  }

  render() {
    const names = ['BLUR', 'CONTOUR', 'DETAIL', 'EDGE_ENHANCE', 'EMBOSS',
      'SMOOTH', 'SHARPEN', 'GRAYSCALE', 'FIND_EDGES'];
    return this.state.folders.length > 0 ?
      (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <div style={style.container}>
            <Menu />
            <div className="row start-xs">
              <div className="col-xs-3">
                <SideBar
                  folders={this.state.folders}
                  updateCanvas={this.updateCanvas}
                />
              </div>
              <div className="col-xs-1"></div>
              <div className="col-xs-7">
                <Card style={style.canvas}>
                  <CardMedia expandable={false}>
                    <img src={this.state.activeImage} />
                  </CardMedia>
                </Card>
                  <br/>
              </div>
              <div className="row">
                <div className="col-xs-3"></div>
                <GridList className="col-xs-7"
                  cols={names.length / 2}
                  style={style.gridList}
                >
                  {this.state.thumbnails.map((thumb) => (
                    <GridTile
                      style={style.gridTile}
                      title={thumb.filter_name}
                      key={this.state.thumbnails.indexOf(thumb)}
                    >
                    <img
                      height="128"
                      width="128"
                      src={thumb.filtered}
                    />
                    </GridTile>
                  ))}
                  </GridList>
              </div>

            </div>
          </div>
        </MuiThemeProvider>) : (
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            <div>
              <Menu />
              <div>
                <LinearProgress mode="indeterminate" />
              </div>
            </div>
          </MuiThemeProvider>);
  }
}

export default Home;
