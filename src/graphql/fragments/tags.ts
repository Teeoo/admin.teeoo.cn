import gql from 'graphql-tag'

export const Tags = {
    fragment: gql`
        fragment fragment on Tags {
            id
            order
            desc
            createdAt
            updatedAt
            label
            slug
            color
            hot
        }
    `
}
