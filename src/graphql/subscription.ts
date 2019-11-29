import gql from 'graphql-tag'
import { CATEPAGE } from './fragments'

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
    ${CATEPAGE.Cate}
`
