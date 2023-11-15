import React, { useEffect, useState, useRef } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Button,
  Alert,
  Form,
  Offcanvas,
  ButtonGroup,
  Modal,
  Tab,
  Nav,
} from "react-bootstrap";
import Editor from "../../components/Editor";
import "suneditor/dist/css/suneditor.min.css";
import SunEditor, { buttonList } from "suneditor-react";
import Spinner from "../../components/Spinner";

// components
import PageTitleNew from "../../components/PageTitleNew";
import * as apiService from "../../services";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
// styles
import "./socia.css";
import "easymde/dist/easymde.min.css";
import SunEditorCore from "suneditor/src/lib/core";
import { toast } from "react-toastify";

interface Editior {
  name: string;
}

interface EditiorState {
  data: string;
  state: {
    result: [];
  };
}
interface TabContentType {
  id: number;
  title: string;
  icon?: string;
  name: string;
  apiname: string;
}
const tabContents: TabContentType[] = [
  {
    id: 2,
    title: "Paraphase",
    icon: "uil-user",
    name: "CaiTextImprove",
    apiname: "caitextimprove"
  },
  {
    id: 3,
    title: "Simplify",
    icon: "uil-envelope",
    name: "CaiTextSimplify",
    apiname: "caitextsimplify"
  },
  {
    id: 4,
    title: "Make Creative",
    icon: "uil-envelope",
    name: "CaiMakeCreative",
    apiname: "caimakecreative"
  },
  {
    id: 5,
    title: "Write Formal",
    icon: "uil-envelope",
    name: "CaiWriteFormal",
    apiname: "caiwriteformal"
  },
  {
    id: 6,
    title: "Expand",
    icon: "uil-envelope",
    name: "CaiTextExpanderByKeyword",
    apiname: "caitextexpanderbykeyword"
  },
  {
    id: 7,
    title: "Summaries",
    icon: "uil-envelope",
    name: "CaiTextShortner",
    apiname: "caitextshortner"
  },
];

const FullEditior = () => {
  const [name, setNames]: any = useState("caitextrewrite");
  const [names, setName] = useState("");
  const [isShowCrop, setIsShowCrop] = useState<boolean>(false);
  const [showReplacePopup, setShowReplacePopup] = useState<boolean>(false);
  const [showUploadImgPopup, setShowUploadImgPopup] = useState<boolean>(false);
  const [showUploadImgPopup1, setShowUploadImgPopup1] =
    useState<boolean>(false);
  const [showUploadImgPopup2, setShowUploadImgPopup2] =
    useState<boolean>(false);
  const [showUploadImgPopup3, setShowUploadImgPopup3] =
    useState<boolean>(false);
  const [validated, setValidated] = useState<boolean>(false);
  const [isSubmitting, setIsLoading] = useState(false);
  const [searchData, setsearchData] = useState([]);
  const [cropUrl, setCropUrl]: any = useState("");
  const [postData, setData] = useState({
    userid: "",
    desc: "love",
    size: 0,
    keywords: "love",
    tone: "professional",
  });
  // postData.desc = (replaceText);
  const [selection, setSelection]: any = useState("");
  const [replaceText, setReplaceText]: any = useState("");

  postData.desc = replaceText;

  const [replace, setReplace]: any = useState("");
  // const [uploadImg, setUploadImg] = useState([]);
  const editor = useRef<SunEditorCore>();
  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor;
  };
  const showController = (name: any, controllers: any) => {
    // console.log(name, controllers);
  };
  const [spinner, setSpinner] = useState(true);
  const [isReplaceSpinner, setIsReplaceSpinner] = useState(false);
  const [uploadImg, setUploadImg] = useState([]);
  const [uploadImg1, setUploadImg1] = useState([]);
  const [uploadImg2, setUploadImg2] = useState([]);
  const [uploadImg3, setUploadImg3] = useState([]);

  const [contentEditor, setContentEditor] = useState<Array<HTMLElement>>([]);
  const location = useLocation<EditiorState>();
  const data = location.state;
  // console.log(data.state.result);

  const _saveApiName = (item: string) => {
    // console.log(item);
    setNames(replaceText);
  };

  const [countWord, setCountWord] = useState<number>(0);
  const [text, setText] = useState();
  const handleChange = ({ currentTarget: input }: any) => {
    // console.log(input.value);
    setText(input.value);
    if (input.name === "desc") {
      const str = input.value;
      setCountWord(str.split(/\s+/).length);
    }
    setData({ ...postData, [input.name]: input.value });
  };

  const handleSubmit = async (list: any, replaceText: any) => {
    // e.preventDefault();
    setIsReplaceSpinner(true);
    setsearchData([]);
    //const searchData = postData;
    // console.log(searchData);
    const searchData = {
      userid: "",
      desc: replaceText,
      size: 0,
      keywords: "",
      tone: "professional",
    };
    if (typeof text !== "undefined") {
      searchData.desc = text;
    }
    const data = await apiService.contentPost(list, { searchData });
    setReplace(data.result);
    console.log(data.result);
    if (data.success === false) {
      toast.info(data.Message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      const cleanArray = data.result.filter((val: any) => val != " ");
      setsearchData(cleanArray);
    }
    // setIsShow(false);
    // handleChange(replace);
    setIsReplaceSpinner(false);
    setValidated(false);
    // const form = e.currentTarget;
    // if (form.checkValidity() === false) {
    //   e.stopPropagation();
    //   setValidated(true);
    //   setIsLoading(false);
    // } else {

    //   // console.log(getfiles);
    // }
  };

  const handleReplaceClick = ({ currentTarget: input }: any) => {
    // const img = new Image();
    // img.src = 'https://pixabay.com/get/gb03a40e23a688126b712784a9f89d6d8961e0ae4a10b0243e6eef6d18aab601023acb614246240e4f8cfa0f7f64883bcdcaa30d57573df7da0af08ff76db6385_640.jpg';
    // img.alt = 'Image description';
    // editor.current?.core.insertNode(img);
    //setShowReplacePopup(true);
    const selectionText = editor.current?.core.getSelection();

    if (selectionText?.toString() != "") {
      setShowReplacePopup(true);
      // setNames(selectionText?.toString());
      setSelection(selectionText?.toString());
      setReplaceText(selectionText?.toString());
      handleSubmit(tabContents[0].apiname, selectionText?.toString());
      // postData.desc = (selectionText?.toString());
      // setData({ ...postData, ["desc"]: selectionText?.toString() });
      // setData({ ...postData, postData.desc : selectionText?.toString() });
      // setData['desc'] = selectionText?.toString();
    }
  };

  const handleDrop = (event: any) => { };

  const handleInsertImage = () => {
    //const editor1 = editor.current?.core;
  };

  const handle = (src1: string) => {
    setShowUploadImgPopup(false);
    setCropUrl(src1);
    setIsShowCrop(true);

    setSpinner(true);
    setTimeout(() => {
      setSpinner(false);
    }, 3000);
  };

  const handle1 = (src1: string) => {
    setShowUploadImgPopup1(false);
    setCropUrl(src1);
    setIsShowCrop(true);

    setSpinner(true);
    setTimeout(() => {
      setSpinner(false);
    }, 3000);
  };

  const handle2 = (src1: string) => {
    setShowUploadImgPopup2(false);
    setCropUrl(src1);
    setIsShowCrop(true);
    setSpinner(true);
    setTimeout(() => {
      setSpinner(false);
    }, 3000);
  };

  const handle3 = (src1: string) => {
    setShowUploadImgPopup3(false);
    setCropUrl(src1);
    setIsShowCrop(true);

    setSpinner(true);
    setTimeout(() => {
      setSpinner(false);
    }, 3000);
  };

  let cropedImgaeUrl = "";
  const cropperRef = useRef<ReactCropperElement>(null);
  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;
    cropedImgaeUrl = cropper!.getCroppedCanvas().toDataURL();
    console.log(cropper!.getCroppedCanvas().toDataURL());
  };
  const _cropedImage = () => {
    const img = new Image();
    img.src = cropedImgaeUrl;
    img.alt = "Image description";
    editor.current?.core.insertNode(img);
    setIsShowCrop(false);
  };

  const handleUploadImage = async (tag: string) => {
    setShowUploadImgPopup(true);
    const data = await apiService.updateSub(tag);
    setUploadImg(data.templates);
    setSpinner(false);
  };

  const handleUploadImage1 = async (tag: string) => {
    setShowUploadImgPopup1(true);
    const data = await apiService.updateSub1(tag);
    setUploadImg1(data.unsplash);
    setSpinner(false);
  };

  const handleUploadImage2 = async (tag: string) => {
    setShowUploadImgPopup2(true);
    const data = await apiService.updateSub2(tag);
    setUploadImg2(data.images);
    setSpinner(false);
  };

  const handleUploadImage3 = async (tag: string) => {
    setShowUploadImgPopup3(true);
    const data = await apiService.updateSub3(tag);
    setUploadImg3(data.images);
    setSpinner(false);
  };

  const handleKeypress = (e: any) => {
    handleUploadImage(names);
  };

  const handleKeypress1 = (e: any) => {
    handleUploadImage1(names);
  };

  const handleKeypress2 = (e: any) => {
    handleUploadImage2(names);
  };

  const handleKeypress3 = (e: any) => {
    handleUploadImage3(names);
  };
  const _original = (url: any) => {
    const img = new Image();
    img.src = url;
    img.alt = "Image description";
    editor.current?.core.insertNode(img);
    setIsShowCrop(false);
  };

  const handleReplace = () => {
    //const img = `<img src="https://pixabay.com/get/gb03a40e23a688126b712784a9f89d6d8961e0ae4a10b0243e6eef6d18aab601023acb614246240e4f8cfa0f7f64883bcdcaa30d57573df7da0af08ff76db6385_640.jpg" alt="image"/>`;

    const content: any = editor.current?.getContents(true);
    const newContent = content.replace(selection, replace);
    //console.log(newContent)
    editor.current?.setContents(newContent);
    //editor.current?.setContents(replace);

    setShowReplacePopup(false);
  };

  const fetchData = async () => {
    const cleanArray = data.state.result.filter((val: any) => val != " ");
    setContentEditor(cleanArray);
    console.log(cleanArray);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <PageTitleNew
        breadCrumbItems={[
          { label: "Full Editior", path: `/social/fulleditior`, active: true },
        ]}
        title="Full Editior"
        subtitle="Generate your blog in 2 min"
      />

      <Row>
        <Col lg={12}>
          <Card>
            <Card.Body>
              <h4 className="header-title mt-0 mb-2">Full Editior</h4>
              <button
                type="button"
                className="btn"
                onClick={handleReplaceClick}
                style={{
                  borderRadius: "0px",
                  backgroundColor: "#fafafa",
                  color: "#000",
                  borderLeft: "1px solid #dadada",
                  borderTop: "1px solid #dadada",
                  borderRight: "1px solid #dadada",
                }}
              >
                Replace
              </button>

              <button
                type="button"
                className="btn"
                onClick={() => handleUploadImage(names)}
                style={{
                  borderRadius: "0px",
                  backgroundColor: "#fafafa",
                  color: "#000",
                  borderLeft: "1px solid #dadada",
                  borderTop: "1px solid #dadada",
                  borderRight: "1px solid #dadada",
                }}
              >
                Template
              </button>

              <button
                type="button"
                className="btn"
                onClick={() => handleUploadImage1(names)}
                style={{
                  borderRadius: "0px",
                  backgroundColor: "#fafafa",
                  color: "#000",
                  borderLeft: "1px solid #dadada",
                  borderTop: "1px solid #dadada",
                  borderRight: "1px solid #dadada",
                }}
              >
                Unsplash
              </button>

              <button
                type="button"
                className="btn"
                onClick={() => handleUploadImage2(names)}
                style={{
                  borderRadius: "0px",
                  backgroundColor: "#fafafa",
                  color: "#000",
                  borderLeft: "1px solid #dadada",
                  borderTop: "1px solid #dadada",
                  borderRight: "1px solid #dadada",
                }}
              >
                Pixabay
              </button>

              <button
                type="button"
                className="btn"
                onClick={() => handleUploadImage3("Pixels")}
                style={{
                  borderRadius: "0px",
                  backgroundColor: "#fafafa",
                  color: "#000",
                  borderLeft: "1px solid #dadada",
                  borderTop: "1px solid #dadada",
                  borderRight: "1px solid #dadada",
                }}
              >
                Pixels
              </button>

              {/* <SunEditor
                setDefaultStyle="font-family:IBM Plex Sans, sans-serif;"
                setContents={contentEditor.map((element) => element).join("</br></br>")}
                setOptions={{
                  audioAccept: "true",
                  imageUrlInput: true,
                  imageMultipleFile: true,
                  previewTemplate: "<div style='margin: 50px;'> <h1>Cretorial AI View Template</h1> {{contents}}</div>",
                  imageGalleryUrl: "https://cretorial.ai/cretorial/api/editor/gallery.php",
                  height: "400",
                  buttonList: [
                    ["undo", "redo"],
                    ["font", "fontSize", "formatBlock", "fontColor"],
                    ["indent", "outdent", "table"],
                    ["list"],
                    ["image", "link", "video"],
                    ["bold", "underline", "italic"],
                    [
                      "-right",
                      ":i-More Misc-default.more_vertical",
                      "blockquote",
                      "preview",
                      "print",
                      "save",
                      "template",
                      "codeView",
                      "fullScreen",
                      "showBlocks",
                      "audio",
                      "imageGallery",
                      "align",
                      "horizontalRule",
                      "lineHeight",
                      "strike",
                      "subscript",
                      "superscript",
                      "hiliteColor",
                      "textStyle",
                      "removeFormat",
                      "paragraphStyle",
                    ],
                  ],
                }}
                setAllPlugins={true}
              /> */}

              <SunEditor
                getSunEditorInstance={getSunEditorInstance}
                onDrop={handleDrop}
                setDefaultStyle="font-family:IBM Plex Sans, sans-serif;"
                setContents={contentEditor
                  .map((element) => element)
                  .join("</br></br>")}
                showController={showController}
                setOptions={{
                  //plugins: [mergeTag],
                  audioAccept: "true",
                  imageUrlInput: true,
                  imageMultipleFile: true,
                  previewTemplate:
                    "<div style='margin: 50px;'>{{contents}}</div>",
                  imageGalleryUrl:
                    "https://cretorial.ai/cretorial/api/editor/gallery.php",
                  height: "400",

                  buttonList: [
                    ["undo", "redo"],
                    ["font", "fontSize", "formatBlock", "fontColor"],
                    ["indent", "outdent", "table"],
                    ["list"],
                    ["image", "link", "video"],
                    ["bold", "underline", "italic"],
                    [
                      "-right",
                      ":i-More Misc-default.more_vertical",
                      "blockquote",
                      "preview",
                      "print",
                      "save",
                      "template",
                      "codeView",
                      "fullScreen",
                      "showBlocks",
                      "audio",
                      "imageGallery",
                      "align",
                      "horizontalRule",
                      "lineHeight",
                      "strike",
                      "subscript",
                      "superscript",
                      "hiliteColor",
                      "textStyle",
                      "removeFormat",
                      "paragraphStyle",
                      {
                        name: "merge_tag",
                        icon: "fas fa-exchange",
                        title: "Replace",
                        buttonClass: "",
                        innerHTML: "",
                        dataDisplay: "dialog",
                      },
                    ],
                  ],
                  callBackSave: function (contents, isChanged) {
                    //  alert(editor.current?.core.getSelection().toString());
                    //  editor.current?.getContents(true).replace(editor.current?.core.getSelection().toString(), "hello1");
                    //  editor.current?.setContents(editor.current?.getContents(true).replace(editor.current?.core.getSelection().toString(), "hello1"));
                  },
                }}
                onFocus={() => handleInsertImage()}
                setAllPlugins={true}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Modal
        show={showReplacePopup}
        onHide={() => setShowReplacePopup(false)}
        size="lg"
      >
        <Modal.Header onHide={() => setShowReplacePopup(false)} closeButton>
          <Modal.Title as="h5">Replace Selected Text </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            as="textarea"
            name="desc"
            key="desc"
            rows={3}
            //onChange={handleChange}
            onChange={(e) => setReplaceText(e.target.value)}
            defaultValue={replaceText}
            required
            style={{ height: "40%" }}
          />
          {/* <Button style={{ marginTop: "10px", justifyItems: "right" }} variant="primary" onClick={() => handleSubmit(name)} disabled={isSubmitting}>
            {isSubmitting && (
              <span className="spinner-border spinner-border-sm me-1"></span>
            )}
            Paraphrase
          </Button> */}
          <Row>
            <Col lg={12}>
              <Tab.Container defaultActiveKey="Paraphase">
                <Nav
                  className="firsttab d-flex"
                  as="ul"
                  variant="tabs"
                  style={{ borderBottom: "0px" }}
                >
                  {(tabContents || []).map((tab, index) => {
                    return (
                      <Nav.Item
                        as="li"
                        key={index}
                        onClick={() => {

                          handleSubmit(tab.apiname, replaceText);
                        }}
                      >
                        <Nav.Link eventKey={tab.title}>
                          <span className="d-block d-sm-none">
                            <i className={tab.icon}></i>
                          </span>
                          <span className="d-none d-sm-block">{tab.title}</span>
                        </Nav.Link>
                      </Nav.Item>
                    );
                  })}
                </Nav>
              </Tab.Container>
            </Col>
          </Row>
          <Form.Control
            as="textarea"
            name="desc"
            rows={3}
            onChange={(e) => setReplace(e.target.value)}
            defaultValue={replace}
            required
            style={{ marginTop: "10px" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={() => setShowReplacePopup(false)}>
            Cancel
          </Button>{" "}
          <Button variant="primary" onClick={() => handleReplace()} disabled={isReplaceSpinner}>
            {isReplaceSpinner && (
              <span className="spinner-border spinner-border-sm me-1"></span>
            )}
            Replace
          </Button>
        </Modal.Footer>
      </Modal>

      {!spinner && (
        <Modal
          show={showUploadImgPopup}
          onHide={() => setShowUploadImgPopup(false)}
          size="xl"
        >
          <Modal.Header
            className="full-editior-model"
            onHide={() => setShowUploadImgPopup(false)}
            closeButton
          >
            <Modal.Title as="h5" style={{ fontSize: "30px" }}>
              <b>Template</b>
            </Modal.Title>
            <input
              type="text"
              placeholder="Search images"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
              style={{ width: "65%", margin: "10px auto" }}
              onKeyPress={handleKeypress}
            />
          </Modal.Header>
          <Modal.Body>
            {uploadImg ? (
              <div className="row">
                {uploadImg.map((item) => {
                  let it = item["previews"]["0"];
                  return (
                    // <div className="col-md-2">

                    //   <img
                    //     src={it['src']}
                    //     alt="Uploaded image"
                    //     style={{ width: "100%", height: "200px" }}
                    //     onClick={() => handle(it['src'])}

                    //   />

                    // </div>
                    <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                      <img
                        src={it["src"]}
                        className="w-100 shadow-1-strong rounded mb-4"
                        alt="Boat on Calm Water"
                        style={{ height: "250px" }}
                        onClick={() => handle(it["src"])}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>Loading...</div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="light"
              onClick={() => setShowUploadImgPopup(false)}
            >
              Cancel
            </Button>{" "}
          </Modal.Footer>
        </Modal>
      )}
      {!spinner && (
        <Modal
          show={showUploadImgPopup1}
          onHide={() => setShowUploadImgPopup1(false)}
          size="xl"
        >
          <Modal.Header
            className="full-editior-model"
            onHide={() => setShowUploadImgPopup1(false)}
            closeButton
          >
            <Modal.Title as="h5" style={{ fontSize: "30px" }}>
              <b>Unsplash</b>
            </Modal.Title>
            <input
              type="text"
              placeholder="Search images"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
              style={{ width: "65%", margin: "10px auto" }}
              onKeyPress={handleKeypress1}
            />
          </Modal.Header>
          <Modal.Body>
            {uploadImg1 ? (
              <div className="row">
                {uploadImg1.map((item) => {
                  let it = item["src"];
                  return (
                    <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                      <img
                        src={it["large"]}
                        className="w-100 shadow-1-strong rounded mb-4"
                        alt="Boat on Calm Water"
                        style={{ height: "250px" }}
                        onClick={() => handle1(it["large"])}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>Loading...</div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="light"
              onClick={() => setShowUploadImgPopup1(false)}
            >
              Cancel
            </Button>{" "}
          </Modal.Footer>
        </Modal>
      )}
      {!spinner && (
        <Modal
          show={showUploadImgPopup2}
          onHide={() => setShowUploadImgPopup2(false)}
          size="xl"
        >
          <Modal.Header
            className="full-editior-model"
            onHide={() => setShowUploadImgPopup2(false)}
            closeButton
          >
            <Modal.Title as="h5" style={{ fontSize: "30px" }}>
              <b>Pixabay</b>
            </Modal.Title>
            <input
              type="text"
              placeholder="Search images"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
              style={{ width: "65%", margin: "10px auto" }}
              onKeyPress={handleKeypress2}
            />
          </Modal.Header>
          <Modal.Body>
            {uploadImg2 ? (
              <div className="row">
                {uploadImg2.map((item) => {
                  let it = item;
                  return (
                    <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                      <img
                        src={it["src"]}
                        className="w-100 shadow-1-strong rounded mb-4"
                        alt="Boat on Calm Water"
                        style={{ height: "250px" }}
                        onClick={() => handle2(it["src"])}
                      />
                    </div>
                    // <div className="col-md-2">
                    //   <img
                    //     src={it['src']}
                    //     alt="Uploaded image"
                    //     style={{ width: "100%", height: "200px" }}
                    //     onClick={() => handle2(it['src'])}
                    //   />
                    // </div>
                  );
                })}
              </div>
            ) : (
              <div>Loading...</div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="light"
              onClick={() => setShowUploadImgPopup2(false)}
            >
              Cancel
            </Button>{" "}
          </Modal.Footer>
        </Modal>
      )}
      {!spinner && (
        <Modal
          show={showUploadImgPopup3}
          onHide={() => setShowUploadImgPopup3(false)}
          size="xl"
        >
          <Modal.Header
            closeButton
            className="full-editior-model"
            onHide={() => setShowUploadImgPopup3(false)}
          >
            <Modal.Title as="h5" style={{ fontSize: "30px" }}>
              <b>Pixels</b>
            </Modal.Title>
            <input
              type="text"
              placeholder="Search images"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
              style={{ width: "65%", margin: "10px auto" }}
              onKeyPress={handleKeypress3}
            />
          </Modal.Header>
          <Modal.Body>
            {uploadImg3 ? (
              <div className="row">
                {uploadImg3.map((item) => {
                  let it = item;
                  return (
                    <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                      <img
                        src={it["src"]}
                        className="w-100 shadow-1-strong rounded mb-4"
                        alt="Boat on Calm Water"
                        style={{ height: "250px" }}
                        onClick={() => handle3(it["src"])}
                      />
                    </div>
                    // <div className="col-md-2">
                    //   <img
                    //     src={it['src']}
                    //     alt="Uploaded image"
                    //     style={{ width: "100%", height: "200px" }}
                    //     onClick={() => handle3(it['src'])}
                    //   />
                    // </div>
                  );
                })}
              </div>
            ) : (
              <div>Loading...</div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="light"
              onClick={() => setShowUploadImgPopup3(false)}
            >
              Cancel
            </Button>{" "}
          </Modal.Footer>
        </Modal>
      )}

      <Modal
        show={isShowCrop}
        onHide={() => setIsShowCrop(false)}
        size="lg"
        fullscreen="lg-down"
      >
        <Modal.Header
          className="full-editior-model"
          onHide={() => setIsShowCrop(false)}
          closeButton
        >
          <Modal.Title as="h5" style={{ fontSize: "30px" }}>
            <b>Crop</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "center" }}>
          {spinner ? (
            <>
              <div className="text-center">
                <Spinner className="m-2" color="primary">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            </>
          ) : (
            <>
              <Cropper
                src={cropUrl}
                style={{ height: 400, width: "100%" }}
                initialAspectRatio={16 / 9}
                guides={false}
                crop={onCrop}
                ref={cropperRef}
              />
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => _cropedImage()}>
            Crop
          </Button>
          <Button variant="success" onClick={() => _original(cropUrl)}>
            Original
          </Button>
          <Button variant="danger" onClick={() => setIsShowCrop(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default FullEditior;