import gql from 'graphql-tag';
import { USER } from '../fragments/auth-fragments';

export const QUERY_SIGNIN = gql`
  query($data: LoginUserInput!) {
    SignIn(data: $data) {
      accessToken
      tokenType
      expiresIn
      User {
        ...User
      }
    }
  }
  ${USER}
`;
