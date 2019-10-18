import gql from 'graphql-tag'

export const Article = {
    fragment: gql`
        fragment fragment on Article {
            id
            order
            desc
            createdAt
            updatedAt
            title
            slug
            cover
            summary
            text
            html
            template
            type
            status
            publish
            password
            allowComment
            isTop
            exinfo
            author {
                nickname
            }
            category {
                label
            }
            tags {
                id
                label
            }
        }
    `
}
