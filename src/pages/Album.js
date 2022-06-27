import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../Loading';

class Album extends Component {
  state = {
    musicsArray: [],
    loading: true,
  }

  componentDidMount() {
    this.fetchGetMusic();
  }

  fetchGetMusic = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState({ musicsArray: musics, loading: false });
  }

  render() {
    const { musicsArray, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1>Album</h1>
        {loading
          ? (<Loading />)
          : (
            <>
              <p data-testid="album-name">{`Album: ${musicsArray[0].collectionName}`}</p>
              <p data-testid="artist-name">{`Artist: ${musicsArray[0].artistName}`}</p>
            </>
          )}
        {musicsArray.filter((music) => music.trackName).map((music) => (
          <div key={ music.trackId }>
            <MusicCard
              trackId={ music.trackId }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              musicObj={ music }
            />
          </div>
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
export default Album;
