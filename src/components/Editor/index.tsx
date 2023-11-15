import React from "react";
import { Button } from 'react-bootstrap';

import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";



import GenericPdfDownloader from "./GenericPdfDownloader";


// import "./styles.css";

export const Editor = () => {
  const [state, setState] = React.useState({ value: "" });
  const handleChange = (value:any) => {
    setState({ value });
    // console.log(value);
  };
 
  const downloadTxtFile = () => {
   // text content
   const texts =[state.value];

   // file object
    const file = new Blob(texts, {type: 'text/plain'});

   // anchor link
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = Date.now() + ".txt";

    // simulate link click
    document.body.appendChild(element); // Required for this to work in F ireFox
    element.click();
  }
  
  return (
    <div className="text-editor">
      <div id="testId" style={{ display:"none"}}> 
            {/* {state.value} */}
            <div dangerouslySetInnerHTML={{__html: state.value}}></div>
      </div>
      {/* <div className="button-list mb-2 text-end">
        <Button className="ms-2"  variant="primary" onClick={downloadTxtFile}>TXT</Button>
        <GenericPdfDownloader 
          downloadFileName={Date.now()} 
          rootElementId="testId" 
        />
      </div> */}
      <EditorToolbar />
      <ReactQuill
        theme="snow"
        value={state.value}
        onChange={handleChange}
        placeholder={"Write something awesome..."}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default Editor;
