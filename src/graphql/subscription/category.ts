import gql from 'graphql-tag'
import { Category } from '../fragments/category'
export const ONCATEGORY = gql`
    subscription {
        category {
            ...fragment
        }
    }
    ${Category.fragment}
`
