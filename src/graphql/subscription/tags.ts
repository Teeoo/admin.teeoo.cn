import { Tags } from './../fragments/tags'
import gql from 'graphql-tag'
export const ONTAGS = gql`
    subscription {
        tags {
            ...fragment
        }
    }
    ${Tags.fragment}
`
