import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../Loading';

class MusicCard extends React.Component {
  state = {
    loading: false,
    checked: false,
  }

  componentDidMount() {
    this.fetchFavoriteSongs();
  }

  fetchAddSong = async () => {
    const { checked } = this.state;
    const { musicObj, fetchFavorites } = this.props;
    this.setState({ loading: true });
    await addSong(musicObj);
    if (!checked) {
      await removeSong(musicObj);
      fetchFavorites();
    }
    this.setState({ loading: false });
  }

  fetchFavoriteSongs = async () => {
    const { trackName } = this.props;
    this.setState({ loading: true });
    const favorites = await getFavoriteSongs();
    const someFavorite = favorites.some((favorite) => favorite.trackName === trackName);
    this.setState({ checked: someFavorite, loading: false });
  }

  handleChange = ({ target }) => {
    this.setState({ checked: target.checked }, this.fetchAddSong);
  };

  render() {
    const { loading, checked } = this.state;
    const { trackName, previewUrl, trackId } = this.props;
    return (
      <div>
        {loading && <Loading />}
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor="favorite">
          Favorita
          <input
            id="favorite"
            checked={ checked }
            onChange={ this.handleChange }
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.string,
}.isRequired;

MusicCard.defaultProps = {
  fetchFavorites: () => {},
};

export default MusicCard;
