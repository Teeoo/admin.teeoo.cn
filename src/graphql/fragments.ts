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

export const TAGSPAGE = {
    Tags: gql`
        fragment Tags on TagsPaginate {
            data {
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
        }
    `
}

export const TAGS = {
    Tags: gql`
        fragment Tags on Tags {
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

export const LINKSPAGE = {
    Links: gql`
        fragment Links on LinksPaginate {
            data {
                id
                order
                desc
                createdAt
                updatedAt
                url
                name
                email
                logo
                target
                status
            }
        }
    `
}

export const LINKS = {
    Links: gql`
        fragment Links on Links {
            id
            order
            desc
            createdAt
            updatedAt
            url
            name
            email
            logo
            target
            status
        }
    `
}

export const ARTICLE = {
    Article: gql`
        fragment Article on Article {
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
            tags {
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
            fields {
                id
                order
                desc
                createdAt
                updatedAt
                name
                type
                value
            }
        }
    `
}
