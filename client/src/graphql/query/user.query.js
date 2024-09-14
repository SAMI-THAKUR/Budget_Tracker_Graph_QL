import { gql } from "@apollo/client";

export const GET_AUTH_USER = gql`
  query authUser {
    authUser {
      id
      username
      name
      profilePic
      gender
    }
  }
`;

export const GET_USER_AND_TRANSACTIONS = gql`
  query GetUserAndTransactions($userId: ID!) {
    user(userId: $userId) {
      _id
      name
      username
      profilePicture
      # relationships
      transactions {
        _id
        description
        paymentType
        category
        amount
        location
        date
      }
    }
  }
`;
