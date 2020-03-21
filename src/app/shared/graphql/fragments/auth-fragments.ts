import gql from 'graphql-tag';

export const USER = gql`
  fragment User on User {
    id
    order
    desc
    createdAt
    updatedAt
    name
    email
    avatar
    url
    screenName
    exInfo
    lastIp
    lastTime
  }
`;
