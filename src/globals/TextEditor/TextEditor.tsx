import { Editor } from "@tinymce/tinymce-react";

type Props = {
  editorRef: React.MutableRefObject<any>;
  initialValue: string;
};

function TextEditor({ editorRef, initialValue }: Props) {
  return (
    <>
      <Editor
        apiKey=""
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue={initialValue}
        init={{
          menubar: false,
        }}
      />
    </>
  );
}

export default TextEditor;
