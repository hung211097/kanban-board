import React, { useState, useEffect, useRef } from "react";
import { reorder, move } from "utils";
import BoardContainer from "components/BoardContainer";
import ModalEditTask from "components/ModalEditTask";
import { DragDropContext } from "react-beautiful-dnd";
import API from "services/api";
import Toaster from "components/Toaster";
import "./index.scss";

const Home = () => {
  const [boards, setBoards] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const currentTask = useRef(null);
  const currentBoardId = useRef(null);

  useEffect(() => {
    getAllBoards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllBoards = async () => {
    const result = await API.board.getBoards();
    setBoards(result);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onDragEnd = async (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    try {
      if (sInd === dInd) {
        const items = reorder(
          boards[sInd]?.tasks,
          source.index,
          destination.index
        );
        const newState = [...boards];
        newState[sInd].tasks = items;
        setBoards(newState);
        await API.board.reorderTask(boards[sInd].id, {
          sourceIndex: source.index,
          destinationIndex: destination.index,
        });
      } else {
        const taskId = boards[sInd].tasks[source.index].id;
        const result = move(
          boards[sInd]?.tasks,
          boards[dInd]?.tasks,
          source,
          destination
        );

        const newState = [...boards];
        newState[sInd].tasks = result[sInd];
        newState[dInd].tasks = result[dInd];
        setBoards(newState);
        await API.board.moveTask(boards[sInd].id, boards[dInd].id, taskId, {
          destinationIndex: destination.index,
        });
      }
    } catch (e) {
      console.log(e);
      Toaster.error("Something wrong happen");
    }
  };

  const handleShowModal = (id, task) => {
    currentTask.current = task;
    currentBoardId.current = id;
    showModal();
  };

  const handleAddTask = async (boardId, index, title) => {
    const result = await API.board.createTask(boardId, {
      title,
    });
    const newState = [...boards];
    newState[index].tasks = result?.tasks || [];
    newState[index].updatedAt = result?.updatedAt;
    setBoards(newState);
  };

  const handleEditTask = async (result) => {
    const boardIndex = boards.findIndex(
      (item) => item.id === currentBoardId.current
    );
    currentTask.current = null;
    currentBoardId.current = null;

    const newState = [...boards];
    newState[boardIndex].tasks = result.tasks;
    setBoards(newState);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    currentTask.current = null;
    currentBoardId.current = null;
    setIsModalVisible(false);
  };

  return (
    <div className="home">
      <div className="wrapper">
        <DragDropContext onDragEnd={onDragEnd}>
          {boards.map((item, ind) => (
            <BoardContainer
              key={ind}
              id={item.id}
              index={ind}
              board={item}
              onAddTask={handleAddTask}
              onEditTask={handleShowModal}
            />
          ))}
        </DragDropContext>
      </div>

      <ModalEditTask
        isShow={isModalVisible}
        task={currentTask.current}
        boardId={currentBoardId.current}
        onEdit={handleEditTask}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default Home;
