import styled, { css } from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const LoadingIssues = styled.div`
  color: #7159c1;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssuesList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }
  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid #eee;
    margin-right: 5px;
  }

  div {
    flex: 1;

    strong {
      font-size: 16px;

      a {
        text-decoration: none;
        color: #333;

        &:hover {
          color: #7159c1;
        }
      }

      span {
        background: #eee;
        color: #333;
        border-radius: 2px;
        font-size: 12px;
        font-weight: 600;
        height: 20px;
        padding: 3px 4px;
        margin-left: 10px;
      }
    }

    p {
      margin-top: 5px;
      font-size: 12px;
      color: #999;
    }
  }
`;

export const FlexDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

export const FilterButton = styled.a`
  border: 2px solid #7159c1;
  border-radius: 3px;
  width: 33%;
  padding: 15px 60px;
  margin-top: 30px;
  text-align: center;
  text-decoration: none;
  font-size: 17px;

  &:hover {
    border: 2px solid #7f7fc1;
    background: #7159c1;
    color: #fff;
    cursor: pointer;
  }
`;

export const PageButton = styled.a`
  border: 1px solid #7159c1;
  border-radius: 3px;
  width: 50%;
  padding: 8px 30px;
  margin-top: 30px;
  text-align: center;
  text-decoration: none;
  font-size: 17px;

  &:hover {
    border: 1px solid #7f7fc1;
    background: #7159c1;
    color: #fff;
    cursor: pointer;
  }

  ${props =>
    props.page === 1 &&
    props.action === 'prev' &&
    css`
      & {
        background: rgba(0, 0, 0, 0.2);
        color: rgba(0, 0, 0, 0.6);
        pointer-events: none;
        cursor: none;
      }
      &:hover {
        background: rgba(0, 0, 0, 0.2);
        color: rgba(0, 0, 0, 0.6);
        pointer-events: none;
        cursor: none;
      }
    `}
`;
