import gql from 'graphql-tag'
import { Tags } from '../fragments/tags'
export const NEWTAGS = gql`
    mutation($data: NewTagsInput!) {
        NewTags(data: $data) {
            ...fragment
        }
    }
    ${Tags.fragment}
`

export const UPDATETAGS = gql`
    mutation($data: UpdateTagsInput!, $id: String!) {
        UpdateTags(data: $data, id: $id) {
            ...fragment
        }
    }
    ${Tags.fragment}
`

export const DELETETAGS = gql`
    mutation($id: String!) {
        DeleteTags(id: $id)
    }
`
