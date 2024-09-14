import { gql } from "@apollo/client";

export const CREATE_TRANSACTION = gql`
  mutation createTransaction($input: CreateTransactionInput!) {
    createTransaction(input: $input) {
      _id
      name
      paymentType
      category
      amount
      date
    }
  }
`;

export const UPDATE_TRANSACTION = gql`
  mutation updateTransaction($input: UpdateTransactionInput!) {
    updateTransaction(input: $input) {
      _id
      name
      paymentType
      category
      amount
      date
    }
  }
`;
export const DELETE_TRANSACTION = gql`
  mutation deleteTransaction($transactionId: ID!) {
    deleteTransaction(transactionId: $transactionId) {
      _id
      name
      paymentType
      category
      amount
      date
    }
  }
`;
