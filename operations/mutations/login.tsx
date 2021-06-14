const { graphql } = require('apollo-server');

export const LOGIN = graphql`
    mutation login($username: String!, ) {
        id
        username
        password
        firstName
    }
`;