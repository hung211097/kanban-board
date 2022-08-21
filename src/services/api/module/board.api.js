import baseApi from "../base.api";
import { paths } from "../paths";

export const getBoards = (query = {}) => {
  return baseApi.get(paths.getBoards(), query);
};

export const createTask = (boardId, data) => {
  return baseApi.post(paths.createTask(boardId), data);
};

export const updateTask = (boardId, taskId, data) => {
  return baseApi.put(paths.updateTask(boardId, taskId), data);
};

export const reorderTask = (boardId, data) => {
  return baseApi.put(paths.reorderTask(boardId), data);
};

export const moveTask = (boardId, destinationBoardId, taskId, data) => {
  return baseApi.put(paths.moveTask(boardId, destinationBoardId, taskId), data);
};
