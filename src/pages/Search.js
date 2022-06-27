import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../Loading';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    album: '',
    loading: false,
    searchAlbum: '',
    albumArr: [],
    searchApi: false,
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value });
  }

  handleClick = async () => {
    const { album } = this.state;
    this.setState({ loading: true });
    const albums = await searchAlbumsAPIs(album);
    this.setState({ albumArr: albums,
      loading: false,
      searchAlbum: album,
      searchApi: true,
      album: '',
    });
  }

  render() {
    const { album, loading, searchAlbum, searchApi, albumArr } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
        <label htmlFor="album">
          <input
            type="text"
            id="album"
            name="album"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
            value={ album }
          />
        </label>
        <button
          type="button"
          data-testid="search-artist-button"
          onClick={ this.handleClick }
          disabled={ album.length < 2 }
        >
          Pesquisar

        </button>
        {loading && <Loading />}
        {albumArr.length > 0 ? (
          <p>
            {`Resultado de álbuns de: ${searchAlbum}`}
          </p>
        ) : (<p>Nenhum álbum foi encontrado</p>) }
        {searchApi && albumArr.map((artist) => (
          <div key={ artist.collectionId }>
            <img src={ artist.artworkUrl100 } alt={ artist.collectionName } />
            <Link
              to={ `/album/${artist.collectionId}` }
              data-testid={ `link-to-album-${artist.collectionId}` }
            >
              {artist.collectionName}
            </Link>
          </div>))}
      </div>
    );
  }
}

export default Search;
