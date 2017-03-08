import ShowGifs from './ShowGifs';
import SearchGifs from './SearchGifs';
import React from 'react';
import SearchGiphy from './SearchGiphy';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      images: []
    };
    this.addNewImage = this.addNewImage.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
  }

  componentDidMount(){
    this.loadOurImages();
  }

  loadOurImages(){
    fetch(`api/gifRoutes` )
      .then(result => result.json())
      .then(data => this.setState({images:data}));
  }

  addNewImage(img) {
    fetch('/api/gifRoutes', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: img.name,
        url: img.url,
        description: img.description
      })
    })
    .then(result => result.json())
    .then(imgag => {
      let allImages=this.state.images.slice();
      allImages.push(imgag);
      this.setState({images: allImages});
    });
  }

  deleteImage(img) {
    let allImages=this.state.images.slice();
    allImages=allImages.filter(i => img._id !== i._id);
    this.setState({images: allImages});
    fetch(`/api/gifRoutes/${img._id}`, {
      method: 'DELETE'
    });
  }

  render() {

    return (
      <div>
        <SearchGiphy addNewImage={this.addNewImage}/>
        <SearchGifs addNewImage={this.addNewImage}/>
        <ShowGifs addNewImage={this.addNewImage} gifs={this.state.images} noButton deleteImage={this.deleteImage}/>
      </div>
    );
  }
}

export default App;