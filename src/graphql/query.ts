import gql from 'graphql-tag'
import { CATEPAGE, ARTICLEPAGE, TAGSPAGE } from './fragments'
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
