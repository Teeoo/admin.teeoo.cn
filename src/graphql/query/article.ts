import { Article } from './../fragments/article'
import gql from 'graphql-tag'
export const ALLARTICLE = gql`
    query {
        AllArticle {
            ...fragment
        }
    }
    ${Article.fragment}
`
