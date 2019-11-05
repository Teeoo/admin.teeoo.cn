import { Article } from './../fragments/article'
import gql from 'graphql-tag'
export const NEWARTICLE = gql`
    mutation($data: NewArticleInput!) {
        NewArticle(data: $data) {
            ...fragment
        }
    }
    ${Article.fragment}
`

export const UPDATEARTICLE = gql`
    mutation($data: UpdateArticleInput!, $id: String!) {
        UpdateArticle(data: $data, id: $id) {
            ...fragment
        }
    }
    ${Article.fragment}
`

export const DELETEARTICLE = gql`
    mutation($id: String!) {
        DeleteArticle(id: $id)
    }
`
