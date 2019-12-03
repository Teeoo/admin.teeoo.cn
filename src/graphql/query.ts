import gql from 'graphql-tag'
import {
    CATEPAGE,
    ARTICLEPAGE,
    TAGSPAGE,
    LINKSPAGE,
    CATE,
    ARTICLE
} from './fragments'
// 登录
export const SIGNIN = gql`
    query($data: LoginUserInput!) {
        SignIn(data: $data) {
            accessToken
            tokenType
            expiresIn
            User {
                id
                name
                avatar
            }
        }
    }
`

// 全部分类
export const ALLCATEGORY = gql`
    query($page: Int, $limit: Int) {
        allCategory(page: $page, limit: $limit) {
            total
            per_page
            current_page
            last_page
            ...Cate
        }
    }
    ${CATEPAGE.Cate}
`
// 全部文章
export const ALLARTICLE = gql`
    query($page: Int, $limit: Int) {
        allArticle(page: $page, limit: $limit) {
            total
            per_page
            current_page
            last_page
            ...Article
        }
    }
    ${ARTICLEPAGE.Article}
`
// 全部标签
export const ALLTAGS = gql`
    query($page: Int, $limit: Int) {
        allTags(page: $page, limit: $limit) {
            total
            per_page
            current_page
            last_page
            ...Tags
        }
    }
    ${TAGSPAGE.Tags}
`

// 全部友联
export const ALLLINKS = gql`
    query($page: Int, $limit: Int) {
        allLinks(page: $page, limit: $limit) {
            total
            per_page
            current_page
            last_page
            ...Links
        }
    }
    ${LINKSPAGE.Links}
`
// 无分页全部分类
export const _ALLCATEGORY = gql`
    query {
        _allCategory {
            ...Cate
        }
    }
    ${CATE.Cate}
`

export const ONEARTICLE = gql`
    query($id: String!) {
        oneArticle(id: $id) {
            ...Article
        }
    }
    ${ARTICLE.Article}
`
