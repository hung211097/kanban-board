import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { saveUser, saveToken } from "stores/auth/auth.action";
import toaster from "components/Toaster";
import API from "services/api";
import "./index.scss";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    const { email, password } = values;
    try {
      setLoading(true);
      const result = await API.user.login({
        email,
        password,
      });
      const { token, ...user } = result;
      dispatch(saveToken(token));
      dispatch(saveUser(user));
      navigate("/");
    } catch (e) {
      toaster.error(e);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login">
      <div className="login-wapper">
        <h1>LOGIN</h1>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            className="email"
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              {
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Invalid email",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button loading={loading} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
