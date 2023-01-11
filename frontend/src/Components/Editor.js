import React, { useRef } from "react";
import JoditEditor from "jodit-react";
import { Container } from "react-bootstrap";

const config = {
  buttons: ["bold", "italic", "link", "unlink", "underline", "source"],
};

const RichTextEditor = ({ initialValue, getValue }) => {
  const editor = useRef(null);

  return (
    <div className='pt-5'>
    <JoditEditor
      ref={editor}
      value={initialValue}
        //   config={config}
      tabIndex={1}
      //   onBlur={(newContent) => getValue(newContent)}
      onChange={(newContent) => getValue(newContent)}
    />
    </div>
  );
};

export default RichTextEditor;