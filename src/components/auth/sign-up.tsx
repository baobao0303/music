import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { useNotificationContext } from "../../context/notification";
import { authApi, ISignUp } from "../../api/auth.api";
import { useMutation } from "@tanstack/react-query";

type FieldType = {
  name: string;
  username: string;
  password: string;
};

export default function SignUp() {
  // Context
  const notification = useNotificationContext();

  // Query
  const authMutation = useMutation({
    mutationFn: (data: ISignUp) => authApi.signUp(data),
  });

  const onFinish: FormProps<ISignUp>["onFinish"] = async (values) => {
    await authMutation.mutateAsync(values);
    notification.success("Sign up successfully");
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
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
      <Form.Item<FieldType>
        label="Name"
        name="name"
        rules={[
          { required: true, message: "Please input your name!" },
          { min: 6, message: "Name must be at least 6 characters" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
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
