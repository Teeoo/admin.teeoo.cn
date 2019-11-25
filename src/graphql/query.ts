import gql from 'graphql-tag'
import { CATEPage } from './fragments'
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
            itemCount
            totalItems
            pageCount
            next
            previous
            ...Cate
        }
    }
    ${CATEPage.Cate}
`
