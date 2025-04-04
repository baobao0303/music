import { Button, Drawer, Space } from "antd";
import { ISongUploadProps } from "../../models/song/new-song/new-song.model";

export default function SongUpload({ open, setOpen }: ISongUploadProps) {
  return (
    <>
      <Drawer
        title={`Drawer`}
        placement="right"
        size={"large"}
        onClose={() => setOpen(false)}
        open={open}
        extra={
          <Space>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="primary" onClick={() => setOpen(false)}>
              OK
            </Button>
          </Space>
        }
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
}
