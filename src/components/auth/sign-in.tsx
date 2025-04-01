import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { useSignIn } from "../../api/react-query/auth-react-query";
import { ISignInPayload } from "../../models/auth.model";

export default function SignIn() {
  // Query
  const authMutation = useSignIn();

  const onFinish: FormProps<ISignInPayload>["onFinish"] = (values) => {
    authMutation.mutate(values);
  };

  const onFinishFailed: FormProps<ISignInPayload>["onFinishFailed"] = (errorInfo) => {
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
      <Form.Item<ISignInPayload>
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<ISignInPayload>
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
