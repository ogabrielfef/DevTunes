import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from '../Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  state = {
    favoriteSongs: [],
    loading: false,
  }

  componentDidMount() {
    this.fetchFavoriteSongs();
  }

  fetchFavoriteSongs = async () => {
    this.setState({ loading: true });
    const favorites = await getFavoriteSongs();
    this.setState({ favoriteSongs: favorites, loading: false });
  }

  render() {
    const { loading, favoriteSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <h1>Favorites</h1>
        {loading && (<Loading />)}
        {favoriteSongs && favoriteSongs.map((fav) => (
          <MusicCard
            key={ fav.trackId }
            trackId={ fav.trackId }
            trackName={ fav.trackName }
            previewUrl={ fav.previewUrl }
            musicObj={ fav }
            fetchFavorites={ this.fetchFavoriteSongs }
          />
        ))}
      </div>
    );
  }
}

export default Favorites;
