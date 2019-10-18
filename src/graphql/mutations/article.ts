import gql from 'graphql-tag'
import { Tags } from '../fragments/tags'
export const NEWARTICLE = gql`
    mutation($data: NewArticleInput!) {
        NewArticle(data: $data) {
            ...fragment
        }
    }
    ${Tags.fragment}
`

export const UPDATEARTICLE = gql`
    mutation($data: UpdateArticleInput!, $id: String!) {
        UpdateArticle(data: $data, id: $id) {
            ...fragment
        }
    }
    ${Tags.fragment}
`

export const DELETEARTICLE = gql`
    mutation($id: String!) {
        DeleteArticle(id: $id)
    }
`
