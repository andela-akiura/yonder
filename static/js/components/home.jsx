import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Menu from './menu.jsx';
import SideBar from './sideBar.jsx';
import Thumbnail from './thumbnail.jsx';
import request from 'superagent';
import { Card, CardMedia } from 'material-ui/Card';
import { GridList } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';

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
    margin: 'auto',
    top: '150px',
    left: '50px',
    bottom: '50px',
    right: '50px',
    width: '40px',
    height: '40px',
    position: 'relative',
    // zIndex: '10',
  },
  buttonGroup: {
    margin: 'auto',
    display: 'flex',
    position: 'relative ',
    width: '75%',
  },
  button: {
    margin: '5px',
  },
  uploadButton: {
    width: '118px',
    display: 'flex',
    position: 'relative',
    margin: '5px auto',
  },
  imageInput: {
    cursor: '-webkit-grab',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
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

const uploadImage = (url, data) => {
  // returns a Promise object.
  return new Promise((resolve, reject) => {
    request
    .post(url)
    .send(data)
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

const deleteImage = (url) => {
  // returns a Promise object.
  return new Promise((resolve, reject) => {
    request
    .delete(url)
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
      folderNames: [],
      defaultImage: '/static/images/placeholder.png',
      activeImage: '/static/images/placeholder.png',
      thumbnails: [],
      showFilters: false,
      currentImage: 1,
      filterStatus: 'hide',
      showDeleteDialog: false,
      showUploadDialog: false,
      stepIndex: 0,
      saveFilters: 0,
      newImageName: 'No image chosen',
      newFolderName: '',
      uploadedImage: {},
      showNoImageWarning: false,
    };
    this.updateCanvas = this.updateCanvas.bind(this);
    this.toggleFilters = this.toggleFilters.bind(this);
    this.applyFilters = this.applyFilters.bind(this);
    this.shareImage = this.shareImage.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.toggleDeleteDialog = this.toggleDeleteDialog.bind(this);
    this.toggleUploadDialog = this.toggleUploadDialog.bind(this);
    this.handleSelectImage = this.handleSelectImage.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.updateStepperIndex = this.updateStepperIndex.bind(this);
    this.selectFolder = this.selectFolder.bind(this);
    this.reduceStepperIndex = this.reduceStepperIndex.bind(this);
    this.persistFilter = this.persistFilter.bind(this);
    this.toggleEmptyImageFilter = this.toggleEmptyImageFilter.bind(this);
    this.undoFilter = this.undoFilter.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('accessToken')) {
      fetchImages('/api/v1/images/').then((response) => {
        const folderNames = generateFolders(response);
        const folders = organizeImages(response, folderNames);
        this.setState({ folders, folderNames });
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
    if (this.state.activeImage === this.state.defaultImage) {
      this.setState({ showNoImageWarning: true });
      return;
    }
    // show progress indicator
    this.setState({ filterStatus: 'loading' });
    // make a put request to
    updateImages(`http://${window.location.host}/api/v1/images/${this.state.currentImage.id}/`,
      { filter_name: filterName, save_changes: this.state.saveFilters })
      .then((response) => {
        this.setState({
          activeImage: response.filtered_image,
          saveFilters: 0,
        });
        fetchImages('/api/v1/images/').then((images) => {
          const folders = organizeImages(images, generateFolders(images));
          this.setState({ folders, filterStatus: 'hide' });
        });
      });
  }

  persistFilter() {
    this.setState({ saveFilters: 1, filterStatus: 'loading' }, () => {
      updateImages(`http://${window.location.host}/api/v1/images/${this.state.currentImage.id}/`,
        { filter_name: 'NONE', save_changes: this.state.saveFilters })
        .then((response) => {
          this.setState({
            activeImage: response.original_image,
            filterStatus: 'hide',
            saveFilters: 0,
          });
          fetchImages('/api/v1/images/').then((images) => {
            const folders = organizeImages(images, generateFolders(images));
            this.setState({ folders });
          });
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

  toggleDeleteDialog() {
    this.setState({
      showDeleteDialog: !this.state.showDeleteDialog,
    });
  }

  toggleEmptyImageFilter() {
    this.setState({
      showNoImageWarning: !this.state.showNoImageWarning,
    });
  }

  deleteImage() {
    this.setState({
      filterStatus: 'loading',
      showDeleteDialog: !this.state.showDeleteDialog,
    });
    deleteImage(`/api/v1/images/${this.state.currentImage.id}/`)
      .then(() => {
        fetchImages('/api/v1/images/').then((response) => {
          const folders = organizeImages(response, generateFolders(response));
          this.setState({ folders });
        });
        this.setState({
          activeImage: this.state.defaultImage,
          filterStatus: 'hide',
        });
      });
  }

  toggleUploadDialog() {
    this.setState({
      showUploadDialog: !this.state.showUploadDialog,
    });
  }

  handleSelectImage() {
    const uploadedImage = document.getElementById('image-upload').files[0];
    if (uploadedImage) {
      this.setState({
        newImageName: uploadedImage.name,
        uploadedImage });
    }
  }

  handleUpload() {
    this.toggleUploadDialog();
    this.setState({ filterStatus: 'loading' });
    const formData = new FormData();
    formData.append('original_image', this.state.uploadedImage);
    formData.append('folder_name', this.state.newFolderName);
    uploadImage('/api/v1/images/', formData).then((response) => {
      this.setState({
        filterStatus: 'hide',
        activeImage: response.image_url,
        currentImage: response,
      });
      fetchImages('/api/v1/images/').then((images) => {
        const folders = organizeImages(images, generateFolders(images));
        const folderNames = generateFolders(images);
        this.setState({ folders, folderNames, stepIndex: 0, newFolderName: '', newImageName: '' });
      });
    });
  }

  updateStepperIndex() {
    if (this.state.stepIndex !== 2) {
      this.setState({
        stepIndex: this.state.stepIndex + 1,
      });
    } else {
      this.setState({
        stepIndex: 0,
      });
    }
  }
  reduceStepperIndex() {
    if (this.state.stepIndex !== 0) {
      this.setState({
        stepIndex: this.state.stepIndex - 1,
      });
    } else {
      this.setState({
        stepIndex: 0,
      });
    }
  }

  selectFolder(event, index, value) {
    if (event.target.value === undefined) {
      this.setState({ newFolderName: value });
    } else {
      this.setState({ newFolderName: event.target.value });
    }
  }

  undoFilter() {
    this.updateCanvas(this.state.currentImage);
  }

  render() {
    const names = ['BLUR', 'CONTOUR', 'DETAIL', 'EDGE_ENHANCE', 'EMBOSS',
      'SMOOTH', 'SHARPEN', 'GRAYSCALE', 'FIND_EDGES'];
    const deleteDialogActions = [
      <FlatButton
        label="Cancel"
        primary
        onClick={this.toggleDeleteDialog}
      />,
      <FlatButton
        label="Delete"
        primary
        onClick={this.deleteImage}
      />,
    ];
    const contentStyle = { margin: '16px 16px' };
    const uploadDialogActions = [
      <FlatButton label="Cancel"
        primary
        onClick={this.toggleUploadDialog}
      />,
    ];
    const stepContents = [
      <div style={contentStyle}>
            <p>{this.state.newImageName}</p>
              <RaisedButton
                label="Select" labelPosition="before" secondary
                icon={<FontIcon className="fa fa-cloud-upload"/>}
                style={style.button}
              >
              <input
                type="file" id="image-upload" style={style.imageInput}
                onChange={this.handleSelectImage}
              />
              </RaisedButton>

          <RaisedButton
            label="Next" primary
            onClick={this.updateStepperIndex}
            style={style.button}
          />
      </div>,
      <div style={contentStyle}>
        <SelectField hintText="Select existing folder"
          value={this.state.newFolderName} maxHeight={200}
          onChange={this.selectFolder}
          disabled={this.state.folderNames.length < 1}
        >
          {this.state.folderNames.map(
            (name, index) => (
              <MenuItem value={name} key={index} primaryText={name} />
            ))}
        </SelectField>
        <p>Or</p>
        <TextField hintText="Enter new folder name" onChange={this.selectFolder}
          value={this.state.newFolderName}
        />
        <FlatButton
          label="Back" primary
          onClick={this.reduceStepperIndex}
          style={style.button}
        />
        <RaisedButton
          label="Next" primary
          onClick={this.updateStepperIndex}
          style={style.button}
        />
      </div>,
      <div style={contentStyle}>
        <p>Upload your image</p>
        <FlatButton
          label="Back" primary
          onClick={this.reduceStepperIndex}
          style={style.button}
        />
        <RaisedButton
          label="Upload" primary
          onClick={this.handleUpload}
          style={style.button}
        />
      </div>,
    ];
    return (<MuiThemeProvider muiTheme={getMuiTheme()}>
          <div style={style.container}>
            <Menu />
            <div className="row start-xs">
              <div style={style.sideBar} className="col-xs-3">

              <RaisedButton
                style={style.uploadButton}
                label="Upload"
                labelPosition="before"
                secondary
                onClick={this.toggleUploadDialog}
              />
              <Dialog
                title="Upload image"
                open={this.state.showUploadDialog}
                actions={uploadDialogActions}
              >
                <Stepper activeStep={this.state.stepIndex}>
                  <Step>
                    <StepLabel>Choose an image</StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>Select a folder</StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>Upload Image</StepLabel>
                  </Step>
                </Stepper>
                {stepContents[this.state.stepIndex]}

              </Dialog>
                <SideBar
                  folders={this.state.folders}
                  updateCanvas={this.updateCanvas}
                />
              </div>
              <div className="col-xs-1"></div>
              <div className="col-xs-7">
              <RefreshIndicator
                class="spinner"
                size={40}
                status={this.state.filterStatus} style={style.refresh}
              />
                <Card >
                <Snackbar
                  open={this.state.showNoImageWarning}
                  message="Please select an image before applying a filter"
                  autoHideDuration={4000}
                  onRequestClose={this.toggleEmptyImageFilter}
                  style={{ transform: 'translateY(-350%)' }}
                />
                <br />
                  <CardMedia>
                    <img height="500" width="800" style={style.image}
                      src={this.state.activeImage}
                    />
                  </CardMedia>
                  <Dialog
                    title="Delete image" open={this.state.showDeleteDialog}
                    actions={deleteDialogActions}
                  >
                    Are you sure you want to delete the image?
                  </Dialog>
                  <div style={style.buttonGroup}>
                    <FlatButton
                      style={style.button}
                      primary
                      icon={<FontIcon className="fa fa-undo"/>}
                      onClick={this.undoFilter}
                    />
                    <RaisedButton
                      style={style.button}
                      primary href={this.state.activeImage}
                      label="Download" download
                      icon={<FontIcon className="fa fa-cloud-download"/>}
                    />
                    <RaisedButton
                      labelColor="#eef1f8" backgroundColor="#4468b3"
                      style={style.button} label="Share"
                      onClick={this.shareImage}
                      icon={<FontIcon className="fa fa-facebook-official"/>}
                    />
                    <RaisedButton
                      primary
                      style={style.button} label="Save changes"
                      onClick={this.persistFilter}
                      icon={<FontIcon className="fa fa-save"/>}
                    />

                    <RaisedButton
                      style={style.button}
                      secondary
                      label="Delete"
                      onClick={this.toggleDeleteDialog}
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
                        thumbnail={thumb} id={index} key={index}
                        tabIndex={thumb.id} styling={style}
                        _onClick={this.applyFilters}
                      />
                    ))}
                    </GridList>
                  </div>
              </div>
            </div>
          </div>
        </MuiThemeProvider>);
  }
}

export default Home;
