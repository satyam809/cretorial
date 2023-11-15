import React, { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
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
} from "react-bootstrap";
import Editor from "../../components/Editor/";
import "suneditor/dist/css/suneditor.min.css";
import SunEditor, { buttonList } from "suneditor-react";
import { toast } from "react-toastify";
//import mergeTag from "./merge-tag-plugin";

// components
import PageTitleNew from "../../components/PageTitleNew";
import * as apiService from "../../services";

// styles
import "./socia.css";
import "easymde/dist/easymde.min.css";
import { select } from "redux-saga/effects";
import SunEditorCore from "suneditor/src/lib/core";


interface RouteParams {
  name: string;
}


const BlogW = () => {
  const [showReplacePopup, setShowReplacePopup] = useState<boolean>(false);
  const editor = useRef<SunEditorCore>();
  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor;

  };
  const showController = (name: any, controllers: any) => {
    console.log(name, controllers)
  }
  const { name } = useParams<RouteParams>();
  const [validated, setValidated] = useState<boolean>(false);
  const [isSubmitting, setIsLoading] = useState(false);
  const [isShow, setIsShow] = useState(true);
  const [searchData, setsearchData] = useState([]);
  const [getTitleName, setTitleName] = useState("");
  const [replaceText, setReplaceText]: any = useState("");

  const [getTitleCard, setTitleCard] = useState("");
  const [getDescHeading, setDescHeading] = useState("What is your ad about?");
  const [getDescPlace, setDescPlace] = useState("Cretorial will rewrite your text. Start by writing or pasting something here and then press the Paraphrase button.");
  const [error, setError] = useState([]);
  const [show, setShow] = useState<boolean>(false);
  const formRef = useRef(null);
  const history = useHistory();
  const [contentEditor, setContentEditor] = useState<Array<HTMLElement>>([]);
  const [postData, setData] = useState({
    userid: "",
    desc: "",
    size: 0,
    keywords: "",
    tone: "professional",
  });

  // console.log(name);

  /**
   * handle modal toggle
   */
  const toggle = () => {
    setShow((prevState) => !prevState);
  };

  const delay = 1000;
  const options = {
    autofocus: false,
    autosave: {
      enabled: true,
      uniqueId: "1",
      delay,
    },
  };

  const handleChange = ({ currentTarget: input }: any) => {
    // console.log(input.value);
    setData({ ...postData, [input.name]: input.value });
  };



  const handleDrop = (event: any) => {

  }
  /*
   * handle form submission
   */
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      setIsLoading(false);
    } else {
      setsearchData([]);
      // const {brand, keyword, words, desc, tone} = e.target.elements;
      // const searchData = {brand: '', keyword: '', count:'', desc:desc.value, tone:tone.value};
      const searchData = postData;
      // console.log(searchData);
      const data = await apiService.contentPost(name, { searchData });
      // setIsShow(false);
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
      setIsLoading(false);
      setValidated(false);

      // // console.log(data);
    }
  };

  const getTitle = async (name: string) => {
    // setIsShow(true);
    // formRef.current.reset();
    getSubStatus();
    setIsLoading(false);
    setsearchData([]);
    setData({
      userid: "",
      desc: "",
      size: 0,
      keywords: "",
      tone: "professional",
    });
    if (name == "caitextrewrite") {
      setTitleName("Edit");
      setTitleCard(
        "Generate your blog wizard."
      );
      // setDescHeading("Product/Service Description");
      // setDescPlace(
      //   "eg. This stylish smartwatch for men is the perfect accessory for those who want to stay connected without compromising on style"
      // );
    } else if (name == "caitextimprove") {
      setTitleName("Paraphase");
      setTitleCard(
        "Generate your blog wizard."
      );
      // setDescHeading("Product/Service Characteristics");
      // setDescPlace(
      //   "eg. A smartwatch with sleek design, versatile features, long battery life, and affordable price."
      // );
    } else if (name == "caitextsimplify") {
      setTitleName("Simplify");
      setTitleCard(
        "Generate your blog wizard."
      );
      // setDescHeading("What is your ad about?");
      // setDescPlace(
      //   "eg. A beauty brand that deals in premium products and is offering 20% off for 2 days, urging the users to buy now."
      // );
    } else if (name == "caimakecreative") {
      setTitleName("Make Creative");
      setTitleCard(
        "Generate your blog wizard."
      );
      // setDescHeading("What is your ad about?");
      // setDescPlace(
      //   "eg. A beauty brand that deals in premium products and is offering 20% off for 2 days, urging the users to buy now."
      // );
    } else if (name == "caiwriteformal") {
      setTitleName("Write Formal");
      setTitleCard(
        "Generate your blog wizard."
      );
    } else if (name == "caitextexpanderbykeyword") {
      setTitleName("Expand");
      setTitleCard(
        "Generate your blog wizard."
      );
    } else if (name == "caitextshortner") {
      setTitleName("Summaries");
      setTitleCard(
        "Generate your blog wizard."
      );
    } else {
      setTitleName("Blog Wizard");
      setTitleCard(
        "Generate your blog wizard."
      );
      // setDescHeading("What is your ad about?");
      // setDescPlace(
      //   "eg. A beauty brand that deals in premium products and is offering 20% off for 2 days, urging the users to buy now."
      // );
    }
  };
  let copyArr: Array<HTMLElement> = [];
  const _copyText = (e: any, text: any) => {
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();

    const currentButton = e.target;
    //console.log(currentButton);
    if (currentButton.innerText === "Copy") {
      currentButton.innerHTML = `Copied`;
      copyArr = [...contentEditor, text];
      setContentEditor(copyArr);
    }
  };
  //console.log(contentEditor);

  const savePost = async (e: any, value: any) => {
    //console.log(value);
    const data = await apiService.savePost(name, value);
    if (data.Message) {
      const currentButton = e.target;
      if (currentButton.innerText === "Save") {
        currentButton.innerHTML = ` Saved`;
      }
      toast.success(data.Message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const moreLikeThis = async (e: any, value: any) => {
    history.push('/hashtag/hashtags-by-text/', { state: value });
    setIsLoading(true);
    setsearchData([]);
    const searchData = postData;
    console.log(searchData);
    const data = await apiService.contentPost(name, { searchData });
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
    setIsLoading(false);
    setValidated(false);
  };

  const getSubStatus = async () => {
    const data = await apiService.CaiShowSubsData();
    // console.log(data);
    if (data.Status != "Active") {
      history.push("/pages/pricing");
    }
  };

  useEffect(() => {
    getTitle(name);
  }, [name]);





  const [selection, setSelection]: any = useState('');
  const handleReplaceClick = () => {

    const selectionText = editor.current?.core.getSelection();

    if (selectionText?.toString() != "") {
      setShowReplacePopup(true);
      setSelection(selectionText?.toString());
      setReplaceText(selectionText?.toString());
    }

  };

  const handleReplace = () => {


    const content: any = editor.current?.getContents(true);
    const newContent = content.replace(selection, replaceText);
    editor.current?.setContents(newContent);

    // let content: any = editor.current?.getContents(true).replace(editor.current?.core.getSelection().toString(), replaceText);

    //editor.current?.setContents(content);
    //console.log(replaceText.toString());
    //editor.current?.getContents(true).replace(editor.current?.core.getSelection().toString(), replaceText.toString());
    //editor.current?.setContents(editor.current?.getContents(true).replace(editor.current?.core.getSelection().toString(), replaceText.toString()));

    setShowReplacePopup(false);
  };



  return (
    <React.Fragment>
      <PageTitleNew
        breadCrumbItems={[
          { label: "Blog Wizard", path: `/blogwizard/${name}` },
          { label: getTitleName, path: `/blogwizard/${name}`, active: true },
        ]}
        title={getTitleName}
        subtitle={getTitleCard}
      />

      <Row>
        <Col lg={6} className={(searchData.length > 0) ? "fixedEditor" : ''}>
          <Card>
            <Card.Body>
              <h4 className="header-title mb-2">{getTitleCard}</h4>
              {/* <p className="sub-header">
                                Provide valuable, actionable feedback to your users with HTML5 form validation–available in all
                                our supported browsers.
                            </p> */}

              <Form
                noValidate
                ref={formRef}
                validated={validated}
                onSubmit={handleSubmit}
              >
                {/* <Form.Group className="mb-3" controlId="validationCustom01">
                                    <Form.Label>Brand</Form.Label>
                                    <Form.Control required name="brand" type="text" placeholder="Brand" />
                                    <Form.Control.Feedback type="invalid">Please provide a brand name.</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="validationCustom02">
                                    <Form.Label>Keyword</Form.Label>
                                    <Form.Control as="textarea" name="keyword" rows={1} placeholder="Keyword" required />
                                    <Form.Control.Feedback type="invalid">Please provide a keyword</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="validationCustom03">
                                    <Form.Label>Words</Form.Label>
                                    <Form.Select name="words" required>
                                        <option>50</option>
                                        <option>100</option>
                                        <option>150</option>
                                        <option>200</option>
                                        <option>250</option>
                                        <option>300</option>
                                        <option>350</option>
                                        <option>400</option>
                                        <option>450</option>
                                        <option>500</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">Please provide a words.</Form.Control.Feedback>
                                </Form.Group> */}
                <Form.Group className="mb-3" controlId="validationCustom05">
                  <Form.Label>{getDescHeading}</Form.Label>
                  {/* <Form.Control type="text" placeholder="Zip" required /> */}
                  <Form.Control
                    as="textarea"
                    name="desc"
                    rows={3}
                    placeholder={getDescPlace}
                    onChange={handleChange}
                    value={postData.desc}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a Description.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="validationCustom06">
                  <Form.Label>Tone</Form.Label>
                  {/* <Form.Control type="text" name="tone" placeholder="Tone" required /> */}
                  <Form.Select name="tone" onChange={handleChange} required>
                    <option value="professional">Professional</option>
                    <option value="excited">Excited</option>
                    <option value="encouraging">Encouraging</option>
                    <option value="funny">Funny</option>
                    <option value="dramatic">Dramatic</option>
                    <option value="witty">Witty</option>
                    <option value="sarcastic">Sarcastic</option>
                    <option value="engaging">Engaging</option>
                    <option value="creative">Creative</option>
                    <option value="persusasive">Persusasive</option>
                    <option value="thoughtful">Thoughtful</option>
                    <option value="persuasive">Persuasive</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please provide a Tone.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="validationCustom07">
                  <Form.Label>Size</Form.Label>
                  <Form.Range className="mt-2" min={1} max={1000} name="size" value={postData.size} onChange={handleChange} />
                  <Form.Control.Feedback type="invalid">
                    Please provide a Input.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="validationCustom08">
                  <Form.Label>Additional Keywords</Form.Label>
                  <Form.Control type="text" name="keywords" onChange={handleChange} value={postData.keywords}  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a Input.
                  </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <span className="spinner-border spinner-border-sm me-1"></span>
                  )}
                  Create
                </Button>
                {/* {isShow ? '' :
                                    <Button className="ms-2" variant="primary" onClick={toggle}>
                                        Editior
                                    </Button>
                                }
                                <Offcanvas show={show} onHide={toggle} placement="end">
                                    <Offcanvas.Header closeButton>
                                        <h5 id="offcanvasTopLabel">Editior</h5>
                                    </Offcanvas.Header>
                                    <Offcanvas.Body>
                                        <div>
                                            <Editor />
                                        </div>
                                    </Offcanvas.Body>
                                </Offcanvas> */}
              </Form>
            </Card.Body>
          </Card>
          <div className="my-3">
            {searchData?.map((item, i) => {
              return (
                <Card key={i}>
                  <Row className="g-0 align-items-center">
                    <Col md={12}>
                      <Card.Body>
                        {/* <Card.Title as="h5" className="fs-16">
                                                Card title
                                            </Card.Title> */}
                        <Card.Text className="text-muted">{item}</Card.Text>
                        <ButtonGroup
                          className="me-1"
                          onClick={(e) => {
                            _copyText(e, item);
                          }}
                        >
                          <Button className="btn btn-soft-secondary btn-sm">
                            <i
                              className="uil uil-copy me-1"
                              style={{ fontStyle: "unset" }}
                            >
                              Copy
                            </i>
                          </Button>
                        </ButtonGroup>
                        <ButtonGroup
                          className="me-1"
                          onClick={(e) => {
                            savePost(e, item);
                          }}
                        >
                          <Button className="btn btn-soft-secondary btn-sm">
                            <i
                              className="uil uil-heart-alt me-1"
                              style={{ fontStyle: "unset" }}
                            >
                              Save
                            </i>
                          </Button>
                        </ButtonGroup>
                        <ButtonGroup className="me-1">
                          <Button
                            className="btn btn-soft-secondary btn-sm"
                            onClick={(e) => {
                              moreLikeThis(e, item);
                            }}
                          >
                            <i className="uil uil-plus-square me-1"></i>Get HashTags
                          </Button>
                        </ButtonGroup>
                        {/* <ButtonGroup className="me-1">
                                                <Button className="btn btn-soft-secondary btn-sm">
                                                    <i className="uil uil-times-circle me-1"></i>Remove
                                                </Button>
                                            </ButtonGroup> */}
                        {/* <Card.Link href="javascript::void(0)" className="text-custom">
                                                Copy
                                            </Card.Link> */}
                        {/* <Card.Text>
                                                <small className="text-muted">Last updated 3 mins ago</small>
                                            </Card.Text> */}
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              );
            })}
          </div>
        </Col>

        <Col lg={6}>
          {isShow && (
            // <Card>
            //     <Card.Body>
            //         <h4 className="header-title mt-0 mb-2">Editior</h4>
            //         {/* <p className="sub-header">
            //             SimpleMDE is a light-weight, simple, embeddable, and beautiful JS markdown editor
            //         </p> */}
            //         <Editor />
            //     </Card.Body>
            // </Card>
            <Card>
              <Card.Body>
                <h4 className="header-title mt-0 mb-2">Editior</h4>


                <button type="button"
                  className="btn"
                  onClick={handleReplaceClick}
                  style={{ borderRadius: "0px", backgroundColor: "#fafafa", color: "#000", borderLeft: "1px solid #dadada", borderTop: "1px solid #dadada", borderRight: "1px solid #dadada" }}>Replace</button>

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
                        {
                          name: 'merge_tag',
                          icon: 'fas fa-exchange',
                          title: 'Replace',
                          buttonClass: '',
                          innerHTML: '',
                          dataDisplay: 'dialog',
                        },

                      ],


                    ],
                    callBackSave: function (contents, isChanged) {
                      /* alert(editor.current?.core.getSelection().toString());
                       editor.current?.getContents(true).replace(editor.current?.core.getSelection().toString(), "hello1");
                       editor.current?.setContents(editor.current?.getContents(true).replace(editor.current?.core.getSelection().toString(), "hello1"));*/

                    },


                  }}
                  setAllPlugins={true}

                />
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>

      <Modal show={showReplacePopup} onHide={() => setShowReplacePopup(false)}>
        <Modal.Header onHide={() => setShowReplacePopup(false)} closeButton>
          <Modal.Title as="h5">Replace Selected Text</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            as="textarea"
            name="desc"
            rows={3}
            onChange={(e) => setReplaceText(e.target.value)}
            value={replaceText}
            required
          />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={() => setShowReplacePopup(false)}>
            Cancel
          </Button>{' '}
          <Button variant="primary" onClick={() => handleReplace()}>
            Replace
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );




};

export default BlogW;