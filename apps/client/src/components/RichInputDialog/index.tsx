import { Flex, Form, Input, Modal } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FC } from "react";
import { IRichInputDialogProps } from "./types";
import z from "zod";
import { createSchemaFieldRule } from "antd-zod";

export const RichInputDialog: FC<IRichInputDialogProps> = ({
  isModalOpen,
  handleCancel,
  handleOk,
  setRichInputValue,
  richInputValue,
  title,
  setTitle,
  form,
}) => {
  const CustomFormValidationSchema = z.object({
    title: z.string().min(1),
  });

  const rule = createSchemaFieldRule(CustomFormValidationSchema);

  return (
    <Modal
      title="Article editor"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form name="basic" form={form} autoComplete="off">
        <Flex vertical gap={10}>
          <Form.Item label="Title" name="title" rules={[rule]}>
            <Input value={title} onChange={setTitle} />
          </Form.Item>
          <CKEditor
            editor={ClassicEditor}
            data={richInputValue}
            onChange={setRichInputValue}
          />
        </Flex>
      </Form>
    </Modal>
  );
};
