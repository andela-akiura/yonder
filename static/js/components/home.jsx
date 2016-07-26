import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Menu from './menu.jsx';
import SideBar from './sideBar.jsx';
import request from 'superagent';
import LinearProgress from 'material-ui/LinearProgress';
import { Card, CardMedia } from 'material-ui/Card';
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';

const style = {
  container: {
    overflow: 'hidden',
  },
  gridList: {
    width: '1700px',
    height: '140px',
    overflow: 'auto',
    overflowY: 'hidden',
    marginBottom: 24,
    flexWrap: 'nowrap',
    padding: 5,
  },
  gridTile: {
    width: '160px',
    height: '140px',
    cursor: '-webkit-grab',
  },
  sideBar: {
    overflow: 'scroll',
  },
  image: {
    objectFit: 'contain',
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
      showFilters: false,
    };
    this.updateCanvas = this.updateCanvas.bind(this);
    this.toggleFilters = this.toggleFilters.bind(this);
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
  toggleFilters() {
    this.setState({ showFilters: !this.state.showFilters });
  }

  applyFilters(filterName) {
    event.preventDefault();
    console.log(`${filterName} clicked my nigga`);

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
              <div style={style.sideBar} className="col-xs-3">
                <SideBar
                  folders={this.state.folders}
                  updateCanvas={this.updateCanvas}
                />
              </div>
              <div className="col-xs-1"></div>
              <div className="col-xs-7">
                <Card >
                  <CardMedia>
                    <img height="500" width="800" style={style.image} src={this.state.activeImage} />
                  </CardMedia>
                </Card>
                  <div className="row">
                  <Subheader>Filters</Subheader>
                    <GridList
                    cols={names.length / 2}
                    style={style.gridList}
                    >
                    {this.state.thumbnails.map((thumb) => (
                      <GridTile
                        style={style.gridTile}
                        title={thumb.filter_name}
                        key={this.state.thumbnails.indexOf(thumb)}
                        onClick={this.applyFilters.bind(null, thumb.filter_name)}
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
