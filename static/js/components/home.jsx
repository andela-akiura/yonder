import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Menu from './menu.jsx';
import SideBar from './sideBar.jsx';
import Thumbnail from './thumbnail.jsx';
import request from 'superagent';
import LinearProgress from 'material-ui/LinearProgress';
import { Card, CardMedia } from 'material-ui/Card';
import { GridList } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

const style = {
  container: {
    overflow: 'hidden',
  },
  gridList: {
    width: '1700px',
    height: '155px',
    overflow: 'auto',
    overflowY: 'hidden',
    marginBottom: 24,
    flexWrap: 'nowrap',
  },
  gridTile: {
    marginLeft: 10,
    height: '120px',
    cursor: '-webkit-grab',
    position: 'relative',
    overflow: 'hidden',
  },
  sideBar: {
    overflow: 'scroll',
  },
  image: {
    objectFit: 'contain',
  },
  filterName: {
    fontSize: 13.5,
  },
  refresh: {
    display: 'flex',
    margin: '300px 860px',
    width: '40px',
    height: '40px',
    position: 'absolute',
    zIndex: '10',
  },
  buttonGroup: {
    margin: 'auto',
    display: 'flex',
    position: 'flex',
    width: '50%',
  },
  button: {
    margin: '5px',
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

const updateImages = (url, data = {}) => {
  // returns a Promise object.
  return new Promise((resolve, reject) => {
    request
    .put(url)
    .set('Authorization', `Bearer facebook ${localStorage.getItem('accessToken')}`)
    .send(data)
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
      currentImage: 1,
      filterStatus: 'hide',
    };
    this.updateCanvas = this.updateCanvas.bind(this);
    this.toggleFilters = this.toggleFilters.bind(this);
    this.applyFilters = this.applyFilters.bind(this);
    this.shareImage = this.shareImage.bind(this);
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

  updateCanvas(image) {
    if (image) {
      this.setState({
        activeImage: image.original_image,
        currentImage: image,
      });
    }
  }
  toggleFilters() {
    this.setState({ showFilters: !this.state.showFilters });
  }

  applyFilters(filterName) {
    // show progress indicator
    this.setState({ filterStatus: 'loading' });
    // make a put request to
    updateImages(`http://${window.location.host}/api/v1/images/${this.state.currentImage.id}/`,
      { filter_name: filterName, save_changes: 0 })
      .then((response) => {
        this.setState({
          activeImage: response.filtered_image,
          filterStatus: 'hide',
        });
      });
  }

  shareImage() {
    event.preventDefault();
    window.FB.ui({
      method: 'share',
      href: this.state.activeImage,
      picture: this.state.activeImage,
      display: 'popup',
      caption: 'Awesome photo',
    }, (response) => (response));
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
              <RefreshIndicator
                size={40}
                left={10}
                top={0}
                status={this.state.filterStatus}
                style={style.refresh}
              />
                <Card >
                <br />
                  <CardMedia>
                    <img
                      height="500"
                      width="800"
                      style={style.image}
                      src={this.state.activeImage}
                    />
                  </CardMedia>
                  <div style={style.buttonGroup}>
                    <RaisedButton
                      style={style.button}
                      primary href={this.state.activeImage}
                      label="Download"
                      download
                      icon={<FontIcon className="fa fa-cloud-download"/>}
                    />
                    <RaisedButton
                      labelColor="#eef1f8"
                      backgroundColor="#4468b3"
                      style={style.button}
                      label="Share"
                      onClick={this.shareImage}
                      icon={<FontIcon className="fa fa-facebook-official"/>}
                    />
                    <RaisedButton
                      style={style.button}
                      secondary
                      href={this.state.activeImage}
                      label="Delete"
                      icon={<FontIcon className="fa fa-trash"/>}
                    />
                  </div>
                </Card>
                  <div className="row">
                  <Subheader>Filters</Subheader>
                    <GridList
                      cols={names.length / 2}
                      style={style.gridList}
                    >
                    {this.state.thumbnails.map((thumb, index) => (
                      <Thumbnail
                        thumbnail={thumb}
                        id={index}
                        key={index}
                        tabIndex={thumb.id}
                        styling={style}
                        _onClick={this.applyFilters}
                      />
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
