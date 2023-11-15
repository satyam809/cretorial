
import 'suneditor/dist/css/suneditor.min.css';
import SunEditor, { buttonList } from "suneditor-react";

const PhotoEditor = () => {

  return (
    <>
      <SunEditor
        setDefaultStyle="font-family:IBM Plex Sans, sans-serif;"
        setOptions={{
          audioAccept: "true",
          imageUrlInput: true,
          imageMultipleFile: true,
          previewTemplate: "<div style='margin: 50px;'> <h1>Cretorial AI View Template</h1> {{contents}}</div>",
          imageGalleryUrl: "https://cretorial.ai/cretorial/api/editor/gallery.php",
          height: "400",
          buttonList: [
            ['undo', 'redo'], ['font', 'fontSize', 'formatBlock', 'fontColor'], ['indent', 'outdent', 'table'],
            ['list'], ['image', 'link', 'video'], ['bold', 'underline', 'italic'],
            ['-right', ':i-More Misc-default.more_vertical', 'blockquote', 'preview', 'print', 'save', 'template',
              'codeView', 'fullScreen', 'showBlocks', 'audio', 'imageGallery',
              'align', 'horizontalRule', 'lineHeight', 'strike', 'subscript', 'superscript',
              'hiliteColor', 'textStyle', 'removeFormat', 'paragraphStyle']

          ],
        }} setAllPlugins={true} />
    </>
  );
};

export default PhotoEditor;
