const { graphql } = require('apollo-server');

export const USERS = graphql`
    query users {
        id
        username
        password
        firstName
    }
`;