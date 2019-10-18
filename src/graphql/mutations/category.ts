import gql from 'graphql-tag'
import { Category } from '../fragments/category'
export const NEWCATEGORY = gql`
    mutation($data: NewCategoryInput!) {
        NewCategory(data: $data) {
            ...fragment
        }
    }
    ${Category.fragment}
`

export const UPDATECATEGORY = gql`
    mutation($data: UpdateCategoryInput!, $id: String!) {
        UpdateCategory(data: $data, id: $id) {
            ...fragment
        }
    }
    ${Category.fragment}
`

export const DELETECATEGORY = gql`
    mutation($id: String!) {
        DeleteCategory(id: $id)
    }
`
