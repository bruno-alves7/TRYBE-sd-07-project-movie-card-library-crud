import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';

class MovieDetails extends Component {
  constructor() {
    super();

    this.state = {
      movie: {},
      loading: true,
    };
  }
  componentDidMount() {
    this.fectMovie();
  }

  fectMovie() {
    this.setState({ loading: true }, async () => {
      const { match } = this.props;
      const requestMovie = await movieAPI.getMovie(match.params.id);
      this.setState({ movie: requestMovie, loading: false });
    });
  }
  render() {
    const { loading } = this.state;
    const { title, storyline, imagePath, genre, rating, subtitle, id } = this.state.movie;

    return (
      <div data-testid="movie-details">
        { loading ? <Loading /> :
        <div>
          <img alt="Movie Cover" src={`../${imagePath}`} />
          <p>{`Title: ${title}`}</p>
          <p>{`Subtitle: ${subtitle}`}</p>
          <p>{`Storyline: ${storyline}`}</p>
          <p>{`Genre: ${genre}`}</p>
          <p>{`Rating: ${rating}`}</p>
          <Link to={`/movies/${id}/edit`}>EDITAR</Link>
          <Link to="/" onClick={() => movieAPI.deleteMovie(id)}>
             DELETAR
          </Link>
        </div>
        }
        <Link to="">VOLTAR</Link>
      </div>
    );
  }
}

export default MovieDetails;
