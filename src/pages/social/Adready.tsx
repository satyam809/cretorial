import React, { useEffect, useState, useRef, useCallback } from "react";
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
  Tab,
  Nav,
} from "react-bootstrap";
import Editor from "../../components/Editor/";
import Spinner from "../../components/Spinner";
import "suneditor/dist/css/suneditor.min.css";
import SunEditor, { buttonList } from "suneditor-react";
import { toast } from "react-toastify";
//import mergeTag from "./merge-tag-plugin";
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop, { Crop } from "react-image-crop";
//import Cropper from 'react-easy-crop'

// components
import PageTitleNew from "../../components/PageTitleNew";
import * as apiService from "../../services";

// styles
import "./socia.css";
import "easymde/dist/easymde.min.css";
import { select } from "redux-saga/effects";
import SunEditorCore from "suneditor/src/lib/core";
import { width } from "@mui/system";
import src from "react-select/dist/declarations/src";
import { AnyARecord } from "dns";
//import { getCroppedImg } from "./ImageCrop";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import Spinners from "../uikit/Spinners";
import useQuery from "../../hooks/useQuery";

interface RouteParams {
  name: string;
}
interface TabContentType {
  id: number;
  title: string;
  icon?: string;
  name: string;
  apiname: string;
}

const Adready = () => {
  let query = useQuery();

  const [names, setName] = useState("");
  //  console.log(names);
  const [showReplacePopup, setShowReplacePopup] = useState<boolean>(false);
  const [showUploadImgPopup, setShowUploadImgPopup] = useState<boolean>(false);
  const [showUploadImgPopup1, setShowUploadImgPopup1] =
    useState<boolean>(false);
  const [showUploadImgPopup2, setShowUploadImgPopup2] =
    useState<boolean>(false);
  const [showUploadImgPopup3, setShowUploadImgPopup3] =
    useState<boolean>(false);

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

  const editor = useRef<SunEditorCore>();
  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor;
  };
  const showController = (name: any, controllers: any) => {
    // console.log(name, controllers);
  };
  const { name } = useParams<RouteParams>();
  const [validated, setValidated] = useState<boolean>(false);
  const [isSubmitting, setIsLoading] = useState(false);
  const [isReplaceSpinner, setIsReplaceSpinner] = useState(false);
  const [isShow, setIsShow] = useState(true);
  const [searchData, setsearchData] = useState([]);
  const [getTitleName, setTitleName] = useState("");
  const [replaceText, setReplaceText]: any = useState("");
  const [replace, setReplace]: any = useState("");

  const [spinner, setSpinner] = useState(true);

  const [getTitleCard, setTitleCard] = useState("");
  const [getDescHeading, setDescHeading] = useState("");
  const [getDescPlace, setDescPlace] = useState("");
  const [error, setError] = useState([]);
  const [show, setShow] = useState<boolean>(false);
  const formRef = useRef(null);
  const history = useHistory();
  const [contentEditor, setContentEditor] = useState<Array<HTMLElement>>([]);
  const [postData, setData] = useState({
    userid: "",
    brand: "",
    keyword: "",
    similar: "",
    count: "",
    desc: query.get("quote") != "null" ? query.get("quote")?.toString() : "",
    tone: "professional",
  });
  postData.desc = replaceText;
  const [uploadImg, setUploadImg] = useState([]);
  const [uploadImg1, setUploadImg1] = useState([]);
  const [uploadImg2, setUploadImg2] = useState([]);
  const [uploadImg3, setUploadImg3] = useState([]);
  const [text, setText] = useState();
  // console.log(uploadImg);
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
    setText(input.value);
    setData({ ...postData, [input.name]: input.value });
  };

  const handleDrop = (event: any) => { };
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
      postData.similar = "";
      const searchData = postData;
      // console.log(searchData);
      const data = await apiService.contentPost(name, { searchData });
      console.log(data);
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

  const handle6 = async (name: any, replaceText: any) => {
    setIsReplaceSpinner(true);

    setsearchData([]);
    // const {brand, keyword, words, desc, tone} = e.target.elements;
    // const searchData = {brand: '', keyword: '', count:'', desc:desc.value, tone:tone.value};
    postData.similar = "";
    //const searchData = postData;


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

    const data = await apiService.contentPost(name, { searchData });
    setReplace(data.result);
    //setReplaceText(data.result);
    console.log(data);
    // setIsShow(false);
    setIsReplaceSpinner(false);
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


      // if (form.checkValidity() === false) {
      //   e.stopPropagation();
      //   setValidated(true);
      //   setIsLoading(false);
      // } else {

      //   } else {
      //     const cleanArray = data.result.filter((val: any) => val != " ");
      //     setsearchData(cleanArray);
      //   }

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
      brand: "",
      keyword: "",
      similar: "",
      count: "",
      desc: query.get("quote") != "null" ? query.get("quote")?.toString() : "",
      tone: "professional",
    });
    if (name == "googleadtitlepost") {
      setTitleName("Google Ad Title");
      setTitleCard(
        "Innovate ad titles that entice people to click on your ad to explore further."
      );
      setDescHeading("Product/Service Description");
      setDescPlace(
        "eg. This stylish smartwatch for men is the perfect accessory for those who want to stay connected without compromising on style"
      );
    } else if (name == "googleaddescpost") {
      setTitleName("Google Ad description");
      setTitleCard(
        "Smart performing ad descriptions that converts visitors into buyers."
      );
      setDescHeading("Product/Service Characteristics");
      setDescPlace(
        "eg. A smartwatch with sleek design, versatile features, long battery life, and affordable price."
      );
    } else if (name == "fbadtitlepost") {
      setTitleName("Facebook ads");
      setTitleCard(
        "Facebook ad copies that make your ads distinguished from the rest."
      );
      setDescHeading("What is your ad about?");
      setDescPlace(
        "eg. A beauty brand that deals in premium products and is offering 20% off for 2 days, urging the users to buy now."
      );
    } else if (name == "instaadtitlepost") {
      setTitleName("Instagram ads");
      setTitleCard(
        "Quirky Instagram ad copies that make the user stop scrolling and engage."
      );
      setDescHeading("What is your ad about?");
      setDescPlace(
        "eg. A beauty brand that deals in premium products and is offering 20% off for 2 days, urging the users to buy now."
      );
    } else {
      setTitleName("LinkedIn ads");
      setTitleCard(
        "Professional LinkedIn ad copies that make your brand shine."
      );
      setDescHeading("What is your ad about?");
      setDescPlace(
        "eg. A beauty brand that deals in premium products and is offering 20% off for 2 days, urging the users to buy now."
      );
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
    history.push("/hashtag/hashtags-by-text/", { state: value });
    setIsLoading(true);
    setsearchData([]);
    postData.similar = value;
    const searchData = postData;
    // console.log(searchData);
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

  const handleInsertImage = () => {
    //const editor1 = editor.current?.core;
  };

  const [selection, setSelection]: any = useState("");
  const handleReplaceClick = () => {
    //setShowReplacePopup(true);
    setReplace("");
    const selectionText = editor.current?.core.getSelection();

    if (selectionText?.toString() != "") {
      setShowReplacePopup(true);
      setSelection(selectionText?.toString());
      setReplaceText(selectionText?.toString());

      handle6(tabContents[0].apiname, selectionText?.toString());
    }
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

  const handleUploadImage = async (tag: string) => {
    setShowUploadImgPopup(true);
    const data = await apiService.updateSub(tag);
    console.log(data);
    setUploadImg(data.templates);
    setSpinner(false);
  };

  const handleUploadImage1 = async (tag: string) => {
    setShowUploadImgPopup1(true);
    const data = await apiService.updateSub1(tag);
    // console.log(data.unsplash);
    setUploadImg1(data.unsplash);
    setSpinner(false);
  };

  const handleUploadImage2 = async (tag: string) => {
    setShowUploadImgPopup2(true);
    const data = await apiService.updateSub2(tag);
    // console.log(data);
    setUploadImg2(data.images);
    setSpinner(false);
  };

  const handleUploadImage3 = async (tag: string) => {
    // console.log(tag);
    setShowUploadImgPopup3(true);
    const data = await apiService.updateSub3(tag);
    // console.log(data);
    setUploadImg3(data.images);
    setSpinner(false);
  };

  const [isShowCrop, setIsShowCrop] = useState<boolean>(false);
  const [cropUrl, setCropUrl]: any = useState("");

  const handle3 = (src1: string) => {
    setShowUploadImgPopup3(false);
    setCropUrl(src1);
    setIsShowCrop(true);

    setSpinner(true);
    setTimeout(() => {
      setSpinner(false);
    }, 3000);
  };
  const _original = (url: any) => {
    const img = new Image();
    img.src = url;
    img.alt = "Image description";
    editor.current?.core.insertNode(img);
    setIsShowCrop(false);
  };
  // const [crop, setCrop]: any = useState("");

  const handleKeypress = (e: any) => {
    // console.log('name')
    handleUploadImage(names);
    // if (e.keyCode === "Enter") {
    //   console.log('name')
    //   handleUploadImage(names);
    //   // this.btn.click();
    // }
  };

  const handleKeypress1 = (e: any) => {
    // console.log('name1')
    handleUploadImage1(names);
    // if (e.keyCode === "Enter") {
    //   console.log('name')
    //   handleUploadImage(names);
    //   // this.btn.click();
    // }
  };

  const handleKeypress2 = (e: any) => {
    // console.log('name1')
    handleUploadImage2(names);
    // if (e.keyCode === "Enter") {
    //   console.log('name')
    //   handleUploadImage(names);
    //   // this.btn.click();
    // }
  };

  const handleKeypress3 = (e: any) => {
    // alert(e);
    handleUploadImage3(names);
    // if (e.key === "Enter") {
    //   console.log('name')
    //   handleUploadImage3(names);
    //   // this.btn.click();
    // }
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

  return (
    <React.Fragment>
      <PageTitleNew
        breadCrumbItems={[
          { label: "Advertisers", path: `/adready/${name}` },
          { label: getTitleName, path: `/adready/${name}`, active: true },
        ]}
        title={getTitleName}
        subtitle={getTitleCard}
      />
      <Row>
        <Col lg={6} className={searchData.length > 0 ? "fixedEditor" : ""}>
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
                    //value={postData.desc}
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
                            <i className="uil uil-plus-square me-1"></i>Get
                            HashTags
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
          )}
        </Col>
      </Row>
      <Modal
        show={showReplacePopup}
        onHide={() => setShowReplacePopup(false)}
        size="lg"
      >
        <Modal.Header onHide={() => setShowReplacePopup(false)} closeButton>
          <Modal.Title as="h5">Replace Selected Text</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            as="textarea"
            name="desc"
            rows={3}
            //onChange={handleChange}
            onChange={(e) => setReplaceText(e.target.value)}
            defaultValue={replaceText}
            required
            style={{ height: "40%" }}
          />
          {/* <Button style={{ marginTop: "10px", justifyItems: "right" }} variant="primary" onClick={() => handle6(name)} disabled={isSubmitting}>
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

                          handle6(tab.apiname, replaceText);
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
      {/* // image upload popup1 */}
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
              style={{ width: "45%", margin: "10px auto" }}
              onKeyPress={handleKeypress}
            />
          </Modal.Header>
          <Modal.Body>
            {uploadImg ? (
              <div className="row">
                {uploadImg.map((item) => {
                  //console.log(item);
                  let it = item["previews"]["0"];
                  return (
                    // <div className="row">
                    // <div className="col-md-2">
                    //   <img
                    //   className="mb-2 mb-md-4 shadow-1-strong rounded"
                    //     src={it['src']}
                    //     alt="Uploaded image"
                    //     style={{width:"auto"}}
                    //     // style={{ height: "200px", margin:"5px", padding:"5px"}}
                    //     onClick={() => handle(it['src'])}
                    //   />
                    // </div>
                    // </div>
                    // <div className="col-md-2">

                    //     <img
                    //       src={it['src']}
                    //       alt="Uploaded image"
                    //       style={{width: "auto", height: "200px" }}
                    //       onClick={() => handle(it['src'])}

                    //     />

                    // </div>

                    <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                      <img
                        src={it["src"]}
                        className="w-100 shadow-1-strong rounded mb-4"
                        alt="Boat on Calm Water"
                        style={{ height: "200px" }}
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

      {/* image upload popup2 */}
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
              style={{ width: "45%", margin: "10px auto" }}
              onKeyPress={handleKeypress1}
            />
          </Modal.Header>
          <Modal.Body>
            {uploadImg1 ? (
              <div className="row">
                {uploadImg1.map((item) => {
                  //console.log(item['src']['large']);
                  let it = item["src"];
                  return (
                    <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                      <img
                        src={it["large"]}
                        className="w-100 shadow-1-strong rounded mb-4"
                        alt="Boat on Calm Water"
                        style={{ height: "200px" }}
                        onClick={() => handle1(it["large"])}
                      />
                    </div>
                    // <div className="col-md-2">
                    //   <img
                    //     src={it['large']}
                    //     alt="Uploaded image"
                    //     style={{ width: "100%", height: "200px" }}
                    //     onClick={() => handle1(it['large'])}
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
              onClick={() => setShowUploadImgPopup1(false)}
            >
              Cancel
            </Button>{" "}
          </Modal.Footer>
        </Modal>
      )}
      {/* // image upload popup3 */}
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
              style={{ width: "45%", margin: "10px auto" }}
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
                        style={{ height: "200px" }}
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
      {/* // image upload popup4 */}
      {!spinner && (
        <Modal
          show={showUploadImgPopup3}
          onHide={() => setShowUploadImgPopup3(false)}
          size="xl"
        >
          <Modal.Header
            className="full-editior-model"
            onHide={() => setShowUploadImgPopup3(false)}
            closeButton
          >
            <Modal.Title as="h5" style={{ fontSize: "30px" }}>
              <b>Pixels</b>
            </Modal.Title>
            <input
              type="text"
              placeholder="Search images"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
              style={{ width: "45%", margin: "10px auto" }}
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
                        style={{ height: "200px" }}
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

export default Adready;