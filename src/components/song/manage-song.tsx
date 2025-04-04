import { useState } from "react";
import SongUpload from "./song-drawer";
import SongModal from "./song-modal";
import SongTable from "./song-table";

export default function ManageSong() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SongModal />
      <SongTable setOpen={setOpen} />
      <SongUpload open={open} setOpen={setOpen} />
    </>
  );
}
