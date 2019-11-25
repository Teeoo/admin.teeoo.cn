import gql from 'graphql-tag'
import { CATEPage } from './fragments'

export const ONCHANGECATEGORY = gql`
    subscription {
        OnChangeCategory {
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
