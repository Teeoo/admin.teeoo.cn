import gql from 'graphql-tag'
import { CATE } from './fragments'
// 新增分类
export const NEWCATEGORY = gql`
    mutation($data: NewCategoryInput!) {
        newCategory(data: $data) {
            ...Cate
        }
    }
    ${CATE.Cate}
`
// 修改分类
export const UPDATECATEGORY = gql`
    mutation($data: UpdateCategoryInput!, $id: String!) {
        updateCategory(data: $data, id: $id) {
            ...Cate
        }
    }
    ${CATE.Cate}
`
// 删除分类
export const DELETECATEGORY = gql`
    mutation($id: String!) {
        deleteCategory(id: $id)
    }
`

