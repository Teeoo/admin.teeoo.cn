import gql from 'graphql-tag'

export const Category = {
    fragment: gql`
        fragment fragment on Category {
            id
            order
            desc
            createdAt
            updatedAt
            label
            slug
            cateNum
            archNum
            children
            parent
        }
    `
}
