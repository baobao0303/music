import { DatePicker, Form, FormProps, Input, Select } from "antd";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

import { FormInstance } from "antd";
import { useGetGenres } from "../../api/react-query/genre-react-query";
import { useCreateSong } from "../../api/react-query/song-react-query";
import { ISongPayload } from "../../models/song.model";
import { formatDateForPayload } from "../../utils/helper/date.helper";
import { useGetCurrentUser } from "../../api/react-query/user-react-query";
import { useNotificationContext } from "../../context/notification";
import { useQueryClient } from "@tanstack/react-query";

const SongForm = ({
  form,
  setOpen,
}: {
  form: FormInstance;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // REACT CONTEXT
  const notification = useNotificationContext();

  // QUERY
  const queryClient = useQueryClient();
  const { data: genres, isLoading } = useGetGenres();
  const { data: me } = useGetCurrentUser();
  const createSong = useCreateSong();

  const artistId = me?.data?._id;

  const options = genres?.data.map((genre) => {
    return {
      value: genre.name,
      label: genre.name,
    };
  });

  const handleFinish: FormProps<ISongPayload>["onFinish"] = async (values) => {
    if (!artistId) return;
    console.log(values);

    const data = {
      ...values,
      artist: artistId,
      releaseDate: formatDateForPayload(values.releaseDate),
    };
    await createSong.mutate(data);

    notification.success("Song created successfully");
    setOpen(false);
    queryClient.invalidateQueries({ queryKey: ["songs"] });
  };
  return (
    <Form
      {...formItemLayout}
      form={form}
      variant={"filled"}
      style={{ maxWidth: 600, margin: "0 auto" }}
      initialValues={{ variant: "filled" }}
      onFinish={handleFinish}
    >
      <Form.Item label="Title" name="title" rules={[{ required: true, message: "Please input!" }]}>
        <Input />
      </Form.Item>

      {/* rules={[{ required: true, message: "Please input!" }]} */}
      {isLoading && <div>Loading ...</div>}
      {!isLoading && (
        <Form.Item label="Genre" name="genre">
          <Select options={options} />
        </Form.Item>
      )}

      <Form.Item label="DatePicker" name="releaseDate" rules={[{ required: true, message: "Please input!" }]}>
        <DatePicker />
      </Form.Item>
    </Form>
  );
};

export default SongForm;
