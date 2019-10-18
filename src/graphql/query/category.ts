import gql from 'graphql-tag'
import { Category } from '../fragments/category'
export const ALLCATEGORY = gql`
    query {
        AllCategory {
            ...fragment
        }
    }
    ${Category.fragment}
`
