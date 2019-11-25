import gql from 'graphql-tag'

export const CATEPage = {
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

export const CATE = {
    Cate: gql`
        fragment Cate on Category {
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
