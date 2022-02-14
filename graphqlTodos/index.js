import { gql } from '@apollo/client'

/** 查詢所有list */
export const GET_TODOS = gql`
  query getTodos {
    getTodos {
      id
      text
      status
    }
  }
`

/** 新增一筆todos */
export const ADD_TODO = gql`
  mutation newTodos($input: TodosInput!) {
    newTodos(input:  $input ) {
        id
        text
        status
    }
  }
`
/** 修改todo資料 */
export const EDIT_TODOS = gql`
  mutation updateTodo($id: ID!, $input: TodosInput!) {
    updateTodo(id:$id , input:$input) {
        id
        text
        status
    }
  }
`

/** 刪除todo */
export const DELETE_TODO = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`

