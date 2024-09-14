import { gql } from "@apollo/client";

const SIGN_UP = gql`
  mutation signUp($input: SignUpInput!) {
    signUp(input: $input) {
      name
      username
      gender
    }
  }
`;

const LOG_IN = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      id
      username
      name
      profilePic
      gender
    }
  }
`;

const LOG_OUT = gql`
  mutation logout {
    logout {
      message
    }
  }
`;

export { SIGN_UP, LOG_IN, LOG_OUT };
