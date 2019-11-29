import gql from 'graphql-tag'

export const CATEPAGE = {
    Cate: gql`
        fragment Cate on CategoryPaginate {
            data {
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

export const ARTICLEPAGE = {
    Article: gql`
        fragment Article on ArticlePaginate {
            data {
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
                category {
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
                author {
                    id
                    order
                    desc
                    createdAt
                    updatedAt
                    name
                    email
                    avatar
                    url
                    screenName
                    exInfo
                    lastIp
                    lastTime
                }
            }
        }
    `
}
