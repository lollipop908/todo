import { gql } from "@apollo/client";

export const CREATE_TODO = gql`
  mutation($task: String!) {
    createTodo(task: $task) {
      id
      task
    }
  }
`;

export const DELETE_TODO = gql`
  mutation($id: Int!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation($id: Int!, $task: String!) {
    updateTodo(id: $id, task: $task) {
      id
      task
    }
  }
`;
