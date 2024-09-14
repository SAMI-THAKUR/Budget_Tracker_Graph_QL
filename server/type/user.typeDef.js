const userTypeDef = `#graphql
     type User{
        id: ID!
        username: String!
        name: String!
        profilePic: String
        gender: String!
        transactions: [Transaction!]
        password: String!
     }

     type Query{
        users: [User!]!
        authUser: User
        user(username:String!): User
     }

     type Mutation{
        signUp(input: SignUpInput!): User
        login(input: LoginInput!): User
        logout: LogoutResponse
     }

     input SignUpInput{
        username: String!
        name: String!
        gender: String!
        password: String!
     }

     input LoginInput{
        username: String!
        password: String!
     }

     type LogoutResponse{
        message: String!
     }
`;

export default userTypeDef;
