import gql from 'graphql-tag'

export const CATE = {
    Cate: gql`
        fragment Cate on CategoryPaginate {
            items {
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
        }
    `
}
