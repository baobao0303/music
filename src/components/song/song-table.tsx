import { Table } from "antd";
import type { TableProps } from "antd";
import { useGetSongs } from "../../api/react-query/song-react-query";
import { ISong } from "../../models/song.model";
import { createBackendUrl } from "../../configs/app-config";
import { formatDate } from "../../utils/helper/date.helper";

const columns: TableProps<ISong>["columns"] = [
  {
    title: "CoverImage",
    dataIndex: "coverImage",
    key: "coverImage",
    render: (text) => <img width={50} height={50} src={createBackendUrl(`/songs/${text}`)} alt={text} />,
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
  },
  {
    title: "ArtistName",
    dataIndex: "artistName",
    key: "artistName",
  },
  {
    title: "Duration",
    dataIndex: "duration",
    key: "duration",
    render: (text) => <span>{text?.toFixed(2)}</span>,
  },
  {
    title: "Genre",
    dataIndex: "genre",
    key: "genre",
  },
  {
    title: "ReleaseDate",
    dataIndex: "releaseDate",
    key: "releaseDate",
    render: (text) => <span>{formatDate(text)}</span>,
  },
  {
    title: "Action",
    key: "action",
  },
];

export default function SongTable() {
  const { data: songs } = useGetSongs();

  return <Table<ISong> columns={columns} dataSource={songs?.data || []} pagination={{ pageSize: 100 }} />;
}
