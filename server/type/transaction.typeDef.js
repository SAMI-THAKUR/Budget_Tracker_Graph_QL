const transactionTypeDef = `#graphql
    type Transaction{
        _id: ID!
        name: String!
        userId: ID!
        amount: Float!
        paymentType: String!
        category: String!
        date: String!
        user: User!
    }

    type Query{
        transactions: [Transaction!]!
        transaction(transactionId: ID!): Transaction!  
    }

    type Mutation{
        createTransaction(input: CreateTransactionInput!): Transaction!
        updateTransaction(input: UpdateTransactionInput!): Transaction!
        deleteTransaction(transactionId: ID!): Transaction!
    }

    input CreateTransactionInput{
        amount: Float!
        name: String!
        paymentType: String!
        category: String!
        date: String!
    }
    input UpdateTransactionInput{
        transactionId: ID!
        name: String
        amount: Float
        date: String
        category: String
        paymentType: String
    }

`;

export default transactionTypeDef;
