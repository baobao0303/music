import { FormInstance } from "antd";
import { ISongPayload } from "../song.model";

export interface ISongFormProps {
  form: FormInstance<ISongPayload>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ISongUploadProps {
  open?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
