import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../Loading';
import './Album.css';

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
        <div className="selected-album">
          {loading
            ? (<Loading />)
            : (
              <div className="album-info">
                <img alt="capa do album" src={ `${musicsArray[0].artworkUrl100}` } />
                <p data-testid="album-name">
                  {`${musicsArray[0].collectionName}`}
                </p>
                <p data-testid="artist-name">{`${musicsArray[0].artistName}`}</p>
              </div>
            )}
          <div className="music-list">
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
        </div>
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
