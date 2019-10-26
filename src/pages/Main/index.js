import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import api from '../../services/api';

import Container from '../../components/Container/index';
import { Form, SubmitButton, List } from './styles';

export default class Main extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    newRepo: '',
    repositories: [],
    // Utilizar 0 e 1 para false e true para nao dar erro no styled components
    loading: 0,
    // Utilizar 0 e 1 para false e true para nao dar erro no styled components
    error: 0,
    errorMessage: '',
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: 1 });

    const { newRepo, repositories } = this.state;

    try {
      if (
        repositories.length > 0 &&
        repositories.find(r => r.name === newRepo)
      ) {
        throw new Error('Repositório duplicado');
      }

      if (newRepo === '') {
        throw new Error('Digite algo');
      }

      const response = await api.get(`/repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
      };

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        loading: 0,
        error: 0,
      });
    } catch (err) {
      this.setState({
        loading: 0,
        error: 1,
        errorMessage: err.Error,
      });
      console.log(err);
    }
  };

  render() {
    const { newRepo, loading, repositories, error, errorMessage } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit} error={error}>
          <input
            type="text"
            placeholder="Adicionar Repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />
          {error === 1 && <span>{errorMessage}</span>}
          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repositories.map(r => (
            <li key={r.name}>
              <span>{r.name}</span>
              <a href={`/repository/${encodeURIComponent(r.name)}`}>Detalhes</a>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
