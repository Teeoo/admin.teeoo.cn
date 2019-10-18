import { Tags } from './../fragments/tags'
import gql from 'graphql-tag'
export const ALLTAGS = gql`
    query {
        AllTags {
            ...fragment
        }
    }
    ${Tags.fragment}
`
