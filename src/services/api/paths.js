export const paths = {
  login() {
    return `/auth/login`;
  },
  getUser(id) {
    return `/user/${id}`;
  },
  getBoards() {
    return `board`;
  },
  createTask(boardId) {
    return `board/${boardId}/task`;
  },
  updateTask(boardId, taskId) {
    return `board/${boardId}/task/${taskId}`;
  },
  reorderTask(boardId) {
    return `board/${boardId}/task`;
  },
  moveTask(boardId, destinationBoardId, taskId) {
    return `board/${boardId}/task/${taskId}/destination-board/${destinationBoardId}`;
  },
};
