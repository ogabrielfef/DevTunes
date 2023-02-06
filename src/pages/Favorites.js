import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from '../Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import './Favorites.css';

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
        <div className="favorite-container">
          {
            loading
              ? <Loading />
              : <div>
                <h1>Favorites Songs</h1>
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
          }
        </div>
      </div>
    );
  }
}

export default Favorites;
