import React, { useState } from "react";
import Task from "components/Task";
import { Button, Input } from "antd";
import { Droppable, Draggable } from "react-beautiful-dnd";
import "./index.scss";

const BoardContainer = ({ id, board, index, onAddTask, onEditTask }) => {
  const { title, titleBgColor, tasks } = board;
  const [isShowInput, setIsShowInput] = useState(false);
  const [titleTask, setTitleTask] = useState("");

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver
      ? "rgba(243, 245, 248, 0.3)"
      : "rgba(243, 245, 248, 0.8)",
    padding: 5,
  });

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    // padding: 5 * 2,
    margin: `0 0 ${5}px 0`,
    transform: isDragging ? "rotate(5deg)" : "none",
    // change background colour if dragging
    // background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    // ...draggableStyle,
  });

  const showInput = () => {
    setIsShowInput(true);
  };

  const hideInput = () => {
    setIsShowInput(false);
    setTitleTask("");
  };

  const handleChangeTitle = (e) => {
    setTitleTask(e.target.value);
  };

  const handleAddTask = () => {
    onAddTask(id, index, titleTask);
    hideInput();
  };

  const handleClickTask = (task) => {
    onEditTask(id, task);
  };

  return (
    <Droppable droppableId={`${index}`}>
      {(provided, snapshot) => (
        <div className="board-container">
          <div className="board-wrapper">
            <div
              className="board-header"
              style={{ backgroundColor: titleBgColor }}
            >
              <p className="title">{title}</p>
            </div>

            <div className="inner">
              <div
                className="task-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                <div className="task-wrapper">
                  {!!tasks?.length &&
                    tasks.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            onClick={() => handleClickTask(item)}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Task
                              index={item.id}
                              task={item}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                </div>
                {provided.placeholder}
              </div>
            </div>
            {!isShowInput && (
              <Button className="btn-add" onClick={showInput}>
                <span>+</span>
              </Button>
            )}
            {isShowInput && (
              <div className="form-wrapper">
                <Input
                  value={titleTask}
                  onChange={handleChangeTitle}
                  placeholder="Task title"
                />
                <div className="btn-wrapper">
                  <Button
                    type="primary"
                    className="btn-confirm-add"
                    onClick={handleAddTask}
                  >
                    <span>Add Task</span>
                  </Button>
                  <Button className="btn-cancel" onClick={hideInput}>
                    <span>Cancel</span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default React.memo(BoardContainer);
