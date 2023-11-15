import React, { useEffect, useState, useRef } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Button,
  Form,
  Tab,
  Nav,
  ButtonGroup,
  Dropdown,
  Modal,
} from "react-bootstrap";
import {
  FacebookShareButton,
  TwitterShareButton,
  //InstagramShareButton,
} from "react-share";
import axios from "axios";
import DateTime from "../../components/DateTime";
import { toast } from "react-toastify";
import Compressor from "compressorjs";
// components
import PageTitleNew from "../../components/PageTitleNew";
import * as apiService from "../../services";
import Spinner from "../../components/Spinner";

// styles
import "./socia.css";
import "easymde/dist/easymde.min.css";

// images
import coverImg1 from "../../assets/images/hashtag/Frameimage253.svg";
import hearticon from "../../assets/images/hashtag/hearticon.png";
import commenticon from "../../assets/images/hashtag/commenticon.svg";
import saveicon from "../../assets/images/hashtag/save-icon.svg";
import shareicon from "../../assets/images/hashtag/share-icon.svg";
import Login from "../../assets/images/hashtag/Login.svg";
import twiter from "../../assets/images/hashtag/twiter.svg";
import avatar from "../../assets/images/users/avatar-7.jpg";
import fbicon from "../../assets/images/hashtag/fbicon1.png";
import tiktok from "../../assets/images/hashtag/tiktok.png";

interface RouteParams {
  name: string;
}

interface Editior {
  data: string;
  state: string;
}

interface TabContentType {
  id: number;
  title: string;
  icon?: string;
  text: [];
}

const tabContents: TabContentType[] = [
  {
    id: 1,
    title: "Instagram",
    icon: "uil-instagram",
    text: [],
  },
  // {
  //   id: 2,
  //   title: "TikTok",
  //   icon: "uil-music-note",
  //   text: [],
  // },
  {
    id: 3,
    title: "Twitter",
    icon: "uil-twitter",
    text: [],
  },
  {
    id: 4,
    title: "Facebook",
    icon: "uil-facebook",
    text: [],
  },
];

const Hashtag = () => {
  const { name } = useParams<RouteParams>();
  const [validated, setValidated] = useState<boolean>(false);
  const [validatedImg, setValidatedImg] = useState<boolean>(false);
  const [isSubmitting, setIsLoading] = useState(false);
  const [isSubmittingImg, setIsLoadingImg] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isShow, setIsShow] = useState(true);
  const [searchData, setsearchData] = useState<any>(null);
  const [hashtagData, setHashtagData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [gallaryTab, setGallaryTab] = useState([]);
  const [selectedDataString, setSelectedDataString] = useState<any>(null);
  const [getTitleName, setTitleName] = useState("");
  const [getTitleCard, setTitleCard] = useState("");
  const [coverImg, setcoverImg] = useState(coverImg1);
  const [error, setError] = useState([]);
  const [show, setShow] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const history = useHistory();
  const [getKeyword, setKeyword] = useState("");
  const [getKeywordImg, setKeywordImg] = useState("");
  const [imagePreview, setImagePreview] = useState<File | null>(null);

  const [contentEditor, setContentEditor] = useState<Array<HTMLElement>>([]);

  const location = useLocation<Editior>();
  const [activeIndicies, setActiveIndicies] = useState([]);

  // console.log(data.state);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      const searchData = {
        page: "1",
        size: "60",
        searchTerm: getKeyword,
        type: "0",
        length: "1 - 15",
        ipaddress: "223.236.160.200",
        searchid: "",
        searchedby: "Keywords",
        mode: "0",
        usersession: "11252022093019423805",
      };
      console.log(searchData);
      const data = await apiService.contentPost("gethashtag", { searchData });
      // setIsShow(false);
      const res = data.connection
        .map(function (val: any) {
          return val.hashtag;
        })
        .join(" ");
      setHashtagData(data.connection);
      setsearchData(res);
      setSelectedData([]);
      setSelectedDataString("");
      setIsLoading(false);
      setValidated(false);

      // console.log(data);
    }
  };

  const resetFileInput = () => {
    formRef.current?.reset();
  };

  const getTitle = async (name: string) => {
    // setIsShow(true);
    // formRef.current.reset();
    getSubStatus();
    setImagePreview(null);
    resetFileInput();
    setIsLoading(false);
    setsearchData(null);
    const data = location.state;
    if (data) {
      setKeyword(data.state);
    }
    if (name == "hashtags-by-keyword") {
      setTitleName("Hashtags By Keyword");
      setTitleCard(
        "Generate relevant, contextual, and viral ready hashtags by any word."
      );
    } else if (name == "hashtags-by-image") {
      setTitleName("Hashtags By Image");
      setTitleCard(
        "Pictures speak a thousand words; Well, in our case that's hashtags!"
      );
    } else if (name == "hashtags-by-text") {
      setTitleName("Hashtags By Text");
      setTitleCard(
        "Generate magical, reach boosting hashtags by any quote or caption."
      );
    } else {
      setTitleName("Hashtag");
      setTitleCard("Hashtag");
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
    if (currentButton.innerText === "Copy") {
      currentButton.innerHTML = `Copied`;
      copyArr = [...contentEditor, text];
      setContentEditor(copyArr);
    }
  };

  const uploadFile = async (e: any) => {
    // console.log(e);
    if (e.target.value.length) {
      console.log("svffv");
      setIsLoading(true);
      setIsUploading(true);
      const file = e.target.files[0];
      new Compressor(file, {
        height: 200,
        quality: 0.4,
        success: (compressedResult) => {
          //   console.table(compressedResult);
          sendImageData(compressedResult, file);
        },
      });
    } else {
      setImagePreview(null);
      resetFileInput();
    }
  };

  async function sendImageData(compressedResult: any, file: any) {
    setImagePreview(file);
    const data = await apiService.clarifyPost(compressedResult);
    const keyword = data
      .map(function (val: any) {
        return val.name;
      })
      .join(",");
    // console.log(keyword);
    setKeyword(keyword);
    setIsLoading(false);
    setIsUploading(false);
  }

  const handleChanges = async (e: any) => {
    setKeyword(e.target.value);
  };

  const handleChangesImg = async (e: any) => {
    setKeywordImg(e.target.value);
  };

  const addOrRemove = (array: any, item: any) => {
    const exists = array.includes(item);

    if (exists) {
      return array.filter((c: any) => {
        return c !== item;
      });
    } else {
      const result = array;
      result.push(item);
      return result;
    }
  };

  const handleCheck = async (e: any) => {
    // setKeyword(e.target.value);
    const newPeople = addOrRemove(selectedData, e);
    setSelectedData(newPeople);
    const res = newPeople
      .map(function (val: any) {
        return val;
      })
      .join(" ");
    setSelectedDataString(res);
    // console.log(newPeople);
  };

  const savePost = async (e: any, value: any) => {
    // console.log(value);
    const data = await apiService.savePost(name, value);
    if (data.Message) {
      const currentButton = e.target;
      if (currentButton.innerText === "Save") {
        currentButton.innerHTML = `Saved`;
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

  const getSubStatus = async () => {
    const data = await apiService.CaiShowSubsData();
    // console.log(data);
    if (data.Status != "Active") {
      history.push("/pages/pricing");
    }
  };

  const getImageGallary = async () => {
    const anykey = "";
    const data = await apiService.imageGallary(anykey);
    setGallaryTab(data.result);
    // console.log(data);
  };

  const handleSubmitKey = async (e: any) => {
    e.preventDefault();
    setIsLoadingImg(true);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidatedImg(true);
      setIsLoadingImg(false);
    } else {
      console.log(getKeywordImg);
      const data = await apiService.imageGallary(getKeywordImg);
      setGallaryTab(data.result);
      setIsLoadingImg(false);
      setValidatedImg(false);
      console.log(data);
    }
  };

  const handleImagePreview = async (src: any) => {
    // console.log(src);
    setcoverImg(src);
    handleClose();
  };

  
  
const sharePostOnInstagram = async (getKeyword: any, coverImg: any) => {
  const access_token ="IGQVJXalhPckc4dzBWLUV5d2RBRmZADeVBDNlU0d196QlduVkJ5R01XZAXk1ODZAyREVkaWpXVVJ5RzBwZAWVUZATBPMTRDaVJsU0ZAHckl3NTZAKbjM5UTQtWHhEMmdjR3VxZAFdNM1h1QkRxTUFvamxVbTZADaAZDZD"
  // "IGQVJYOGc0ZATNLWlh5cGUwUXJvRkFyNTZAxMDlwYkJ6Ukc4bzcwNUZAuc09jTXNHbXY5WWlEVV8zWUNzV19zMmlpWmdpWTd1YWY2eEhmMllNOTZAYVldWVmhJQ3ZAnR2Y4Tzl3azZAZAR0t2NHMwdWdScm9DbgZDZD";
  const endpoint = `https://graph.instagram.com/me/media?access_token=${access_token}`;
  const formData = new FormData();
  formData.append("caption", getKeyword);
  formData.append("media_type", "IMAGE");
  formData.append("media_url", coverImg);
  //formData.append("access_token", access_token)
  try {
    const response = await axios.post(endpoint, formData);
    console.log(response.data);
    // Handle response as needed
  } catch (error) {
    console.error(error);
    // Handle error as needed
  }
};


  useEffect(() => {
    getTitle(name);
    getImageGallary();
  }, [name]);

  return (
    <React.Fragment>
      <PageTitleNew
        breadCrumbItems={[
          { label: "Hashtag Generator", path: `/post/${name}` },
          { label: getTitleName, path: `/post/${name}`, active: true },
        ]}
        title={getTitleName}
        subtitle={getTitleCard}
      />

      <Row>
        <Col lg={6} className={searchData ? "fixedEditor" : ""}>
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
                style={{ display: "unset" }}
              >
                {name === "hashtags-by-keyword" ? (
                  <Form.Group className="mb-3" controlId="validationCustom05">
                    <Form.Label>Enter your keyword</Form.Label>
                    <Form.Control
                      type="text"
                      name="searchTerm"
                      placeholder="eg. Furniture"
                      onChange={handleChanges}
                      value={getKeyword}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a Keyword.
                    </Form.Control.Feedback>
                  </Form.Group>
                ) : name === "hashtags-by-text" ? (
                  <Form.Group className="mb-3" controlId="validationCustom05">
                    <Form.Label>Type or paste your text here</Form.Label>
                    {/* <Form.Control type="text" placeholder="Zip" required /> */}
                    <Form.Control
                      as="textarea"
                      name="searchTerm"
                      rows={3}
                      onChange={handleChanges}
                      value={getKeyword}
                      placeholder="Get ready to feel the road rush with a car built for premium adventures!"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a Text.
                    </Form.Control.Feedback>
                  </Form.Group>
                ) : (
                  <Form.Group className="mb-3">
                    <Form.Label>Upload your Image</Form.Label>
                    <Form.Control
                      accept="image/*"
                      type="file"
                      name="uploadimg"
                      onChange={uploadFile}
                      required
                    />
                    {imagePreview === null ? (
                      ""
                    ) : (
                      <div className="my-3">
                        <img
                          className="uploadimg img-fluid"
                          src={
                            imagePreview === null
                              ? ""
                              : URL.createObjectURL(imagePreview)
                          }
                          alt="preview"
                        />
                      </div>
                    )}
                    {/* <img src={file} className="img-fluid" /> */}
                    <Form.Control.Feedback type="invalid">
                      Please provide a Keyowrd.
                    </Form.Control.Feedback>
                  </Form.Group>
                )}

                {/* <Form.Group className="mb-3" controlId="validationCustom06">
                                    <Form.Label>Tone</Form.Label>
                                    <Form.Select name="tone" required>
                                        <option value="excited">Excited</option>
                                        <option value="professional">Professional</option>
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
                                    <Form.Control.Feedback type="invalid">Please provide a Tone.</Form.Control.Feedback>
                                </Form.Group> */}

                {isUploading ? (
                  <div className="clearfix text-center">
                    <Spinner className="m-2" color="primary">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <p>Uploading</p>
                  </div>
                ) : (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && (
                      <span className="spinner-border spinner-border-sm me-1"></span>
                    )}
                    Create
                  </Button>
                )}
              </Form>
              {searchData && (
                <>
                  <Button
                    className="ms-2"
                    variant="primary"
                    onClick={handleShow}
                  >
                    Image gallery
                  </Button>
                  <Modal show={show} onHide={handleClose} size="lg">
                    <Modal.Header onHide={handleClose} closeButton>
                      <Modal.Title as="h5">Image gallery</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Tab.Container defaultActiveKey="Templates">
                        <Nav as="ul" justify variant="pills" className="p-1">
                          {(gallaryTab || []).map(
                            (tab: TabContentType, index) => {
                              return (
                                <Nav.Item as="li" key={index}>
                                  <Nav.Link
                                    className="cursor-pointer"
                                    eventKey={tab.title}
                                  >
                                    <span className="d-block d-sm-none">
                                      <i className={tab.icon}></i>
                                    </span>
                                    {/* <span className="d-none d-sm-block"><i className={tab.icon}></i> {tab.title}</span> */}
                                    <span className="d-none d-sm-block">
                                      {tab.title}
                                    </span>
                                  </Nav.Link>
                                </Nav.Item>
                              );
                            }
                          )}
                        </Nav>
                        <Tab.Content className="text-muted">
                          {(gallaryTab || []).map(
                            (tab: TabContentType, index) => {
                              return (
                                <Tab.Pane
                                  eventKey={tab.title}
                                  id={String(tab.id)}
                                  key={index}
                                >
                                  <Row>
                                    <Col sm={12} xl={12}>
                                      <Row>
                                        <Col className="mx-auto" sm={6} xl={6}>
                                          <div className="task-search mb-3">
                                            <Form
                                              noValidate
                                              validated={validatedImg}
                                              onSubmit={handleSubmitKey}
                                            >
                                              <div className="input-group">
                                                <Form.Control
                                                  type="text"
                                                  name="searchTerm"
                                                  placeholder="Search..."
                                                  onChange={handleChangesImg}
                                                  value={getKeywordImg}
                                                  required
                                                />
                                                <Button
                                                  variant="soft-primary"
                                                  className="input-group-text"
                                                  type="submit"
                                                  disabled={isSubmittingImg}
                                                >
                                                  {isSubmittingImg && (
                                                    <span className="spinner-border spinner-border-sm me-1"></span>
                                                  )}
                                                  <i className="uil uil-search"></i>
                                                </Button>
                                                <Button
                                                  variant="soft-primary"
                                                  className="input-group-text"
                                                  type="button"
                                                  onClick={getImageGallary}
                                                  disabled={isSubmittingImg}
                                                >
                                                  Clear
                                                </Button>
                                                <Form.Control.Feedback type="invalid">
                                                  Please provide a Keyword.
                                                </Form.Control.Feedback>
                                              </div>
                                            </Form>
                                          </div>
                                        </Col>
                                      </Row>
                                    </Col>
                                    {(tab.text || []).map((text: any, i) => {
                                      return (
                                        <Col sm={6} xl={3} key={i}>
                                          <img
                                            src={text["thumbnail"]}
                                            alt=""
                                            className="img-thumbnail mb-2 hashtagimg"
                                            onClick={() =>
                                              handleImagePreview(text["src"])
                                            }
                                          />
                                          {/* <p>{text['name']}</p> */}
                                        </Col>
                                      );
                                    })}
                                  </Row>
                                </Tab.Pane>
                              );
                            }
                          )}
                        </Tab.Content>
                      </Tab.Container>
                    </Modal.Body>
                    {/* <Modal.Footer>
                          <Button variant="light" onClick={handleClose}>
                              Close
                          </Button>{' '}
                          <Button variant="primary" onClick={handleClose}>
                              Save changes
                          </Button>
                      </Modal.Footer> */}
                  </Modal>
                </>
              )}

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
            </Card.Body>
          </Card>
          <div className="my-3">
            {searchData === null ? (
              ""
            ) : (
              <Card>
                <Row className="g-0 align-items-center">
                  <Col md={12}>
                    <Card.Body>
                      {/* <Card.Title as="h5" className="fs-16">
                                                Card title
                                            </Card.Title> */}
                      <Card.Text className="text-muted">
                        {/* {searchData} */}
                        {hashtagData?.map((item, i) => {
                          return (
                            <span key={`inline-${i}`}>
                              <Button
                                className={`ms-2 mb-2 ${
                                  selectedData.includes(item["hashtag"]) &&
                                  "active"
                                }`}
                                variant="outline-primary"
                                onClick={() => handleCheck(item["hashtag"])}
                              >
                                {item["hashtag"]}
                              </Button>
                              {/* <Form.Check inline type="checkbox" id={`inline-${i}`} onChange={handleCheck} label={item['hashtag']} value={item['hashtag']} /> */}
                            </span>
                          );
                        })}
                      </Card.Text>
                      <ButtonGroup
                        className="me-1"
                        onClick={(e) => {
                          _copyText(e, searchData);
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
                          savePost(e, searchData);
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
                        <Button className="btn btn-soft-secondary btn-sm">
                          <i className="uil uil-plus-square me-1"></i>More Like
                          This
                        </Button>
                      </ButtonGroup>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            )}
          </div>
        </Col>

        <Col lg={6}>
          {searchData && (
            <Card>
              <Card.Body className="">
                <h4 className="header-title mt-0 mb-2">Editior</h4>
                <Tab.Container defaultActiveKey="Instagram">
                  <Nav as="ul" justify variant="pills" className="p-1">
                    {(tabContents || []).map((tab, index) => {
                      return (
                        <Nav.Item as="li" key={index}>
                          <Nav.Link
                            className="cursor-pointer"
                            eventKey={tab.title}
                          >
                            <span className="d-block d-sm-none">
                              <i className={tab.icon}></i>
                            </span>
                            <span className="d-none d-sm-block">
                              <i className={tab.icon}></i>
                            </span>
                            {tab.title}
                            {/* <span className="d-none d-sm-block">{tab.title}</span> */}
                          </Nav.Link>
                        </Nav.Item>
                      );
                    })}
                  </Nav>
                  <Tab.Content className="text-muted">
                    {(tabContents || []).map((tab, index) => {
                      return (
                        <Tab.Pane
                          eventKey={tab.title}
                          id={String(tab.id)}
                          key={index}
                        >
                          <Row>
                            <Col className="mx-auto" md={7} xxl={7}>
                              {tab.id === 1 ? (
                                <>
                                  <Card className="instagram px-1">
                                    <Row className="my-1">
                                      <Col md={6}>
                                        <span className="login">Login</span>
                                        {/* <img src={Login} alt="" className="img-fluid rounded shadow" /> */}
                                      </Col>
                                      <Col md={6}>
                                        <Dropdown
                                          className="float-end"
                                          align="end"
                                        >
                                          <Dropdown.Toggle
                                            as="a"
                                            className="cursor-pointer arrow-none text-muted"
                                          >
                                            <i
                                              className="uil uil-share-alt"
                                              onClick={() =>
                                                sharePostOnInstagram(
                                                  getKeyword,
                                                  coverImg
                                                )
                                              }
                                            ></i>
                                            {/* <InstagramShareButton
                                              url={coverImg}
                                              title={getKeyword}
                                              className="instagram-button"
                                            >
                                              <i className="uil uil-share-alt"></i>
                                            </InstagramShareButton> */}
                                            {/* <InstagramShareButton
                                              socialMedia="instagram"
                                              url={coverImg}
                                              title={getKeyword}
                                              media={coverImg}
                                            >
                                              <i className="uil uil-share-alt"></i>
                                            </InstagramShareButton> */}
                                          </Dropdown.Toggle>
                                        </Dropdown>
                                      </Col>
                                    </Row>
                                    <img
                                      src={coverImg}
                                      alt="Shreyu"
                                      className="img-fluid"
                                    />
                                    <Card.Body className="p-0">
                                      <Row className="mt-1">
                                        <Col md={6}>
                                          <ul className="list-group list-group-horizontal">
                                            <li>
                                              <img
                                                src={hearticon}
                                                alt=""
                                                className="img-fluid"
                                              ></img>
                                            </li>
                                            <li>
                                              <img
                                                src={commenticon}
                                                alt=""
                                                className="img-fluid"
                                              />
                                            </li>
                                            <li>
                                              <img
                                                src={saveicon}
                                                alt=""
                                                className="img-fluid"
                                              />
                                            </li>
                                          </ul>
                                        </Col>
                                        <Col md={6}>
                                          <div className="float-end">
                                            <img
                                              src={shareicon}
                                              alt=""
                                              className="img-fluid"
                                            />
                                          </div>
                                        </Col>
                                        <Col md={12}>
                                          <p className="like">
                                            <span>
                                              Liked by <b>user</b> and{" "}
                                              <b>415 others.</b>
                                            </span>
                                          </p>
                                        </Col>
                                        <Col md={12}>
                                          <p className="serenity">
                                            <span>
                                              {name === "hashtags-by-image"
                                                ? "Serenity"
                                                : getKeyword}
                                            </span>
                                            <span className="hashtag">
                                              {selectedDataString}
                                            </span>
                                          </p>
                                        </Col>
                                      </Row>
                                    </Card.Body>
                                  </Card>
                                </>
                              ) : tab.id === 2 ? (
                                <>
                                  <Card className="tiktok px-1">
                                    <Card.Body className="p-2">
                                      <img
                                        src={tiktok}
                                        className="card-img-top"
                                        alt=""
                                      />
                                    </Card.Body>
                                  </Card>
                                </>
                              ) : tab.id === 3 ? (
                                <>
                                  <Card className="twitter">
                                    <Card.Body className="p-2">
                                      <div className="d-flex">
                                        <img
                                          src={avatar}
                                          className="avatar-lg rounded-circle me-2"
                                          alt=""
                                        />
                                        <div className="flex-grow-1">
                                          <h4 className="mt-2 mb-0">
                                            Shreyu N
                                          </h4>
                                          <p>@ name</p>
                                        </div>

                                        <Dropdown
                                          className="float-end"
                                          align="end"
                                        >
                                          <Dropdown.Toggle
                                            as="a"
                                            className="cursor-pointer arrow-none text-muted"
                                          >
                                            {/* <i className="uil uil-share-alt"></i> */}
                                            <TwitterShareButton
                                              // url={coverImg}
                                              // //quote={encodeURIComponent(getKeyword)}
                                              // //hashtag={getKeyword}
                                              // title="Check out this post!"
                                              // hashtags={["react", "typescript"]}
                                              // media={shareImage}
                                              // className="my-custom-class"
                                              url=" "
                                              title={getKeyword}
                                              // hashtags={[
                                              //   "myImage",
                                              //   "reactShare",
                                              // ]}
                                              // image={imageUrl}
                                            >
                                              <i className="uil uil-share-alt"></i>
                                            </TwitterShareButton>
                                          </Dropdown.Toggle>
                                        </Dropdown>
                                      </div>

                                      <p className="serenity mt-2">
                                        <span>
                                          {name === "hashtags-by-image"
                                            ? "Serenity"
                                            : getKeyword}
                                        </span>
                                        <span className="hashtag">
                                          {selectedDataString}
                                        </span>
                                      </p>
                                      <img
                                        src={coverImg}
                                        alt="Shreyu"
                                        className="img-fluid"
                                      />

                                      <Row className="mt-1">
                                        <Col>
                                          <DateTime></DateTime>
                                        </Col>
                                        <Col>
                                          <span className="fs-15">
                                            Twitter for iPhone
                                          </span>
                                        </Col>
                                      </Row>

                                      <div className="mt-1 pt-2 border-top  text-start">
                                        <p className="text-muted mb-2">
                                          3.854k Retweets 1.098 Quote Tweets
                                          21.4k Likes
                                        </p>
                                      </div>
                                      <img
                                        src={twiter}
                                        alt="Shreyu"
                                        className="img-fluid"
                                      />
                                    </Card.Body>
                                  </Card>
                                </>
                              ) : (
                                <>
                                  <Card className="facebook">
                                    <Card.Body className="p-2">
                                      <div className="d-flex">
                                        <img
                                          src={avatar}
                                          className="avatar-lg rounded-circle me-2"
                                          alt=""
                                        />
                                        <div className="flex-grow-1">
                                          <h4 className="mt-2 mb-0">
                                            Shreyu N
                                          </h4>
                                          <DateTime></DateTime>
                                        </div>

                                        <Dropdown
                                          className="float-end"
                                          align="end"
                                        >
                                          <Dropdown.Toggle
                                            as="a"
                                            className="cursor-pointer arrow-none text-muted"
                                          >
                                            <FacebookShareButton
                                              url={coverImg}
                                              quote={encodeURIComponent(
                                                getKeyword
                                              )}
                                              hashtag={getKeyword}
                                              className="my-custom-class"
                                            >
                                              <i className="uil uil-share-alt"></i>
                                            </FacebookShareButton>
                                          </Dropdown.Toggle>
                                          {/* <Dropdown.Menu>
                                                              <Dropdown.Item>
                                                                  <i className="uil uil-edit-alt me-2"></i>Edit
                                                              </Dropdown.Item>
                                                              <Dropdown.Item>
                                                                  <i className="uil uil-refresh me-2"></i>Refresh
                                                              </Dropdown.Item>
                                                              <Dropdown.Divider />
                                                              <Dropdown.Item className="text-danger">
                                                                  <i className="uil uil-trash me-2"></i>Delete
                                                              </Dropdown.Item>
                                                          </Dropdown.Menu> */}
                                        </Dropdown>
                                      </div>

                                      <p className="serenity mt-2">
                                        <span>
                                          {name === "hashtags-by-image"
                                            ? "Serenity"
                                            : getKeyword}
                                        </span>
                                        <span className="hashtag">
                                          {selectedDataString}
                                        </span>
                                      </p>
                                      <img
                                        src={coverImg}
                                        alt="Shreyu"
                                        className="img-fluid"
                                      />

                                      <Row className="my-2 justify-content-between">
                                        <Col sm={4}>
                                          <img
                                            src={fbicon}
                                            alt=""
                                            className="img-fluid"
                                          />
                                        </Col>
                                        <Col sm className="mt-2 mt-sm-0">
                                          <span className="fs-13">
                                            You and 99 others
                                          </span>
                                        </Col>
                                        <Col
                                          sm
                                          className="mt-2 mt-sm-0 text-sm-end"
                                        >
                                          <span className="fs-13">
                                            100 Comments
                                          </span>
                                        </Col>
                                      </Row>

                                      {/* <div className="mt-1 pt-2  text-start">
                                                      <p className="text-muted mb-2">Hi I'm Shreyu. I am foodie and love to eat different cuisine!</p>
                                                  </div> */}

                                      <Row className="mt-4 text-center border-top">
                                        <Col>
                                          <span className="fs-15">
                                            <i className="uil uil-users-alt me-1"></i>
                                            Like
                                          </span>
                                        </Col>
                                        <Col>
                                          <span className="fs-15">
                                            <i className="uil uil-users-alt me-1"></i>
                                            Comment
                                          </span>
                                        </Col>
                                      </Row>
                                    </Card.Body>
                                  </Card>
                                </>
                              )}
                              {/* <p>{tab.text}</p>
                                        <p className="mb-0">{tab.text2}</p> */}
                            </Col>
                          </Row>
                        </Tab.Pane>
                      );
                    })}
                  </Tab.Content>
                </Tab.Container>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Hashtag;
