import { Table } from "antd";
import type { TableProps } from "antd";
import { useGetSongs } from "../../api/react-query/song-react-query";
import { ISong } from "../../models/song.model";

const columns: TableProps<ISong>["columns"] = [
  {
    title: "CoverImage",
    dataIndex: "coverImage",
    key: "coverImage",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Artist",
    dataIndex: "artist",
    key: "artist",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "ArtistName",
    dataIndex: "artistName",
    key: "artistName",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Genre",
    dataIndex: "genre",
    key: "genre",
  },
  {
    title: "ReleaseDate",
    key: "releaseDate",
    dataIndex: "releaseDate",
  },
  {
    title: "Action",
    key: "action",
  },
];

export default function SongTable() {
  const { data: songs } = useGetSongs();

  console.log("check data", songs?.data);
  return <Table<ISong> columns={columns} dataSource={songs?.data || []} />;
}
