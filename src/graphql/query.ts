import gql from 'graphql-tag'
import { CATE } from './fragments'
export const ALLCATEGORY = gql`
    query($page: Int, $limit: Int) {
        allCategory(page: $page, limit: $limit) {
            itemCount
            totalItems
            pageCount
            next
            previous
            ...Cate
        }
    }
    ${CATE.Cate}
`
