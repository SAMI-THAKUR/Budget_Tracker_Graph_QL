import { gql } from "@apollo/client";

export const GET_TRANSACTION_ALL = gql`
  query transactions {
    transactions {
      _id
      userId
      amount
      name
      paymentType
      category
      date
    }
  }
`;
