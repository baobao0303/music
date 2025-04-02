import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { useSignIn, useSignInArtist } from "../../api/react-query/auth-react-query";
import { IAuthPayload } from "../../models/auth.model";
import { useLocation } from "react-router-dom";

export default function SignIn() {
  // Location
  const location = useLocation();

  // Query
  const authMutation = useSignIn();
  const authArtistMutation = useSignInArtist();

  const isArtistPage = location.pathname === "/sign-in-artist";

  const onFinish: FormProps<IAuthPayload>["onFinish"] = (values) => {
    if (isArtistPage) {
      authArtistMutation.mutate(values);
    } else {
      authMutation.mutate(values);
    }
  };

  const onFinishFailed: FormProps<IAuthPayload>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<IAuthPayload>
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<IAuthPayload>
        label="Password"
        name="password"
        rules={[
          { required: true, message: "Please input your password!" },
          {
            min: 6,
            message: "Password must be at least 6 characters",
          },
          {
            max: 12,
            message: "Password must be at most 12 characters",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit" disabled={authMutation.isPending}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
