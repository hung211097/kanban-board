import React, { useState, useEffect } from "react";
import { Form, Input, Modal, Select, Tag } from "antd";
import { TAGS, TAG_COLOR } from "constants";
import notion from "assets/images/notion.svg";
import project from "assets/images/project.svg";
import figma from "assets/images/figma.svg";
import API from "services/api";
import Toaster from "components/Toaster";
import "./index.scss";

const tagRender = (props) => {
  const { label, value, closable, onClose } = props;

  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Tag
      color={TAG_COLOR[value.toLowerCase()]}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        marginRight: 3,
      }}
    >
      {label}
    </Tag>
  );
};

const ModalEditTask = ({ boardId, isShow, task, onEdit, onCancel }) => {
  const [form] = Form.useForm();
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTitle(task?.title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isShow) {
      reset();
      form.resetFields();
    } else {
      init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShow]);

  const init = () => {
    setTitle(task?.title);
    setTags(task?.tag || []);
    form.setFieldsValue({
      tag: task?.tag,
      documentLink: task?.documentLink,
      designLink: task?.designLink,
      projectLink: task?.projectLink,
      description: task?.description,
    });
  };

  const reset = () => {
    setTitle("");
    setTags([]);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onFinish = async (values) => {
    // console.log("Success:", values);
    try {
      setIsLoading(true);
      const result = await API.board.updateTask(boardId, task.id, {
        title: title,
        tag: values.tag,
        description: values.description || "",
        documentLink: values.documentLink || "",
        designLink: values.designLink || "",
        projectLink: values.projectLink || "",
      });
      onEdit(result);
    } catch (e) {
      Toaster.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      title={
        <div className="modal-title">
          <Input
            value={title}
            onChange={handleChangeTitle}
            className="input-title"
          />
        </div>
      }
      className="modal-edit-task"
      visible={isShow}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose
      confirmLoading={isLoading}
    >
      <Form
        form={form}
        name="edit-task"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout={"vertical"}
      >
        <Form.Item
          label={<p className="field-label">Description</p>}
          name="description"
        >
          <Input.TextArea placeholder="Add description" />
        </Form.Item>

        <Form.Item
          label={<p className="field-label">Tag</p>}
          name="tag"
          initialValue={tags}
        >
          <Select
            value={tags}
            mode="multiple"
            showArrow
            tagRender={tagRender}
            style={{
              width: "100%",
            }}
            options={TAGS}
          />
        </Form.Item>

        <Form.Item
          label={
            <div className="field-label">
              <img src={notion} alt="document" />
              <span>Document Link</span>
            </div>
          }
          name="documentLink"
        >
          <Input placeholder="Document link" />
        </Form.Item>

        <Form.Item
          label={
            <div className="field-label">
              <img src={figma} alt="document" />
              <span>Design Link</span>
            </div>
          }
          name="designLink"
        >
          <Input placeholder="Design link" />
        </Form.Item>

        <Form.Item
          label={
            <div className="field-label">
              <img src={project} alt="document" />
              <span>Project Link</span>
            </div>
          }
          name="projectLink"
        >
          <Input placeholder="Project link" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalEditTask;
