import React from "react";
import { TAG_COLOR } from "constants";
import moment from "moment";
import notion from "assets/images/notion.svg";
import ownerIcon from "assets/images/owner.svg";
import project from "assets/images/project.svg";
import figma from "assets/images/figma.svg";
import "./index.scss";

const Task = ({ task, style = {} }) => {
  const {
    tag,
    title,
    updatedAt,
    description,
    owner,
    projectLink,
    designLink,
    documentLink,
  } = task;

  return (
    <div className="task-item" style={style}>
      {!!tag.length && (
        <div className="task-tag">
          {tag.map((item, index) => (
            <div
              key={index}
              className="tag"
              style={{ backgroundColor: TAG_COLOR[item.toLowerCase()] }}
            >
              <span>{item}</span>
            </div>
          ))}
        </div>
      )}
      <div className="task-top">
        <p className="title">{title}</p>
        <span className="task-date">{moment(updatedAt).format("MMM DD")}</span>
      </div>
      {description && (
        <div className="task-sub">
          <p>{description}</p>
        </div>
      )}
      <div className="task-link">
        {documentLink && (
          <div className="link-item">
            <img src={notion} alt="notion" />
            <a href={documentLink} target="_blank" rel="noreferrer">
              Document Link →
            </a>
          </div>
        )}
        {designLink && (
          <div className="link-item">
            <img src={figma} alt="figma" />
            <a href={designLink} target="_blank" rel="noreferrer">
              Link to design →
            </a>
          </div>
        )}
        {projectLink && (
          <div className="link-item">
            <img src={project} alt="project" />
            <a href={projectLink} target="_blank" rel="noreferrer">
              Project Link →
            </a>
          </div>
        )}
        <div className="link-item">
          <img src={ownerIcon} alt="owner" />
          <span>{owner.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Task;
