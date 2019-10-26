import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import PropTypes from 'prop-types';

import api from '../../services/api';

import Container from '../../components/Container/index';
import {
  Loading,
  Owner,
  IssuesList,
  FilterButton,
  FlexDiv,
  LoadingIssues,
  PageButton,
} from './styles';

export default class Repository extends Component {
  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  // eslint-disable-next-line react/state-in-constructor
  state = {
    repository: {},
    issues: [],
    // Utilizar 0 e 1 para false e true para nao dar erro no styled components
    loading: 1,
    // Utilizar 0 e 1 para false e true para nao dar erro no styled components
    loadingIssues: 1,
    page: 1,
    filter: 'all',
  };

  async componentDidMount() {
    const { match } = this.props;

    const { filter } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: filter,
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: 0,
      loadingIssues: 0,
    });
  }

  async filterIssues(param) {
    await this.setState({
      loadingIssues: 1,
      filter: param,
      page: 1,
    });

    await this.reloadIssues();
  }

  async handleNextPage() {
    this.setState({
      loadingIssues: 1,
    });

    let { page } = this.state;
    if (page >= 1) {
      page += 1;
      await this.setState({
        page,
      });
    }

    this.reloadIssues();
  }

  async handlePrevPage() {
    this.setState({
      loadingIssues: 1,
    });

    let { page } = this.state;
    if (page !== 1) {
      page -= 1;
      await this.setState({
        page,
      });
    }

    this.reloadIssues();
  }

  async reloadIssues() {
    const { match } = this.props;

    const { filter, page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    try {
      const issues = await api.get(`/repos/${repoName}/issues`, {
        params: {
          state: filter,
          per_page: 5,
          page,
        },
      });
      this.setState({
        issues: issues.data,
        loadingIssues: 0,
      });
    } catch (err) {
      this.setState({
        loadingIssues: 0,
      });
    }
  }

  render() {
    const { repository, issues, loading, loadingIssues, page } = this.state;

    if (loading === 1) {
      return <Loading>Carregando...</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">
            <FaArrowLeft />
            Voltar aos repositórios
          </Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <FlexDiv>
          <FilterButton onClick={() => this.filterIssues('all')}>
            All
          </FilterButton>
          <FilterButton onClick={() => this.filterIssues('open')}>
            Open
          </FilterButton>
          <FilterButton onClick={() => this.filterIssues('closed')}>
            Closed
          </FilterButton>
        </FlexDiv>
        {loadingIssues === 1 ? (
          <LoadingIssues>Carregando ...</LoadingIssues>
        ) : (
          <>
            <IssuesList>
              {issues.map(i => (
                <li key={String(i.id)}>
                  <img src={i.user.avatar_url} alt={i.user.login} />
                  <div>
                    <strong>
                      <a href={i.html_url}>{i.title}</a>
                      {i.labels.map(label => (
                        <span key={String(label.id)}>{label.name}</span>
                      ))}
                    </strong>
                    <p>{i.user.login}</p>
                  </div>
                </li>
              ))}
            </IssuesList>
            <FlexDiv>
              <PageButton
                page={page}
                action="prev"
                onClick={() => this.handlePrevPage()}
              >
                Anterior
              </PageButton>
              <PageButton
                page={page}
                action="next"
                onClick={() => this.handleNextPage()}
              >
                Próximo
              </PageButton>
            </FlexDiv>
          </>
        )}
      </Container>
    );
  }
}
