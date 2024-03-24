import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export const Route = createFileRoute("/admin/")({
  component: AdminPage,
  beforeLoad: ({ context, location }) => {
    if (context.auth.status === "loggedOut") {
      throw redirect({
        to: "/admin/auth",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function AdminPage() {
  const [value, setValue] = useState("");

  const handleChange: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _: any,
    editor: ClassicEditor
  ) => void = (_, editor) => {
    const data = editor.getData();
    setValue(data);
  };
  return <CKEditor editor={ClassicEditor} onChange={handleChange} />;
}
