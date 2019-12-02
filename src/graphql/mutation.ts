import gql from 'graphql-tag'
import { CATE, TAGS, LINKS } from './fragments'
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

// 新增标签
export const NEWTAGS = gql`
    mutation($data: NewTagsInput!) {
        newTags(data: $data) {
            ...Tags
        }
    }
    ${TAGS.Tags}
`

// 修改标签
export const UPDATETAGS = gql`
    mutation($data: UpdateTagsInput!, $id: String!) {
        updateTags(data: $data, id: $id) {
            ...Tags
        }
    }
    ${TAGS.Tags}
`

// 删除标签
export const DELETETAGS = gql`
    mutation($id: String!) {
        deleteTags(id: $id)
    }
`

// 新增友联
export const NEWLINKS = gql`
    mutation($data: NewLinksInput!) {
        newLinks(data: $data) {
            ...Links
        }
    }
    ${LINKS.Links}
`

// 修改友联
export const UPDATELINKS = gql`
    mutation($data: UpdateLinksInput!, $id: String!) {
        updateLinks(data: $data, id: $id) {
            ...Links
        }
    }
    ${LINKS.Links}
`
// 删除友联
export const DELETELINKS = gql`
    mutation($id: String!) {
        deleteLinks(id: $id)
    }
`
