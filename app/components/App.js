import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loading from './Loading'
import { getPhotos } from 'utils/api'
import Gallery from 'react-photo-gallery'
import Lightbox from 'react-images'

class Photos extends React.Component {
  static propTypes = {
    photos: PropTypes.array.isRequired,
  }
  state = {
    currentImage: 0
  }
  openLightbox = (event, obj) => {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    })
  }
  closeLightbox = () => {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    })
  }
  gotoPrevious = () => {
    this.setState({
      currentImage: this.state.currentImage - 1,
    })
  }
  gotoNext = () => {
    this.setState({
      currentImage: this.state.currentImage + 1,
    })
  }
  render() {
    const { photos } = this.props
  
    return (
      <div>
        <Gallery photos={photos} onClick={this.openLightbox} />
        <Lightbox images={photos}
          onClose={this.closeLightbox}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen}
        />
      </div>
    )
  }
}


class App extends Component {
  state = {
    photos: null
  }
  async componentWillMount() {
    const photos = await getPhotos()
    this.setState(() => ({ photos }))
  }
  render() {
    const { photos } = this.state

    return (
      <div>
        <div className='title'>Photo Gallery</div>

        {photos
          ? <Photos photos={photos}></Photos>
          : <Loading />}

      </div>
    )
  }
}

export default App