import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormInstance } from 'antd';
import { ChangeEvent } from 'react';

export interface IRichInputDialogProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  setRichInputValue: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _: any,
    editor: ClassicEditor,
  ) => void;
  richInputValue: string;
  title: string;
  setTitle: (e: ChangeEvent<HTMLInputElement>) => void;
  form: FormInstance<{ title: string }>;
}
