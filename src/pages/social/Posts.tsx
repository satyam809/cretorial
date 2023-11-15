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
} from "react-bootstrap";
import { toast } from "react-toastify";
import "suneditor/dist/css/suneditor.min.css";
import SunEditor, { buttonList } from "suneditor-react";
// components
import PageTitleNew from "../../components/PageTitleNew";
import Editor from "../../components/Editor/";
import * as apiService from "../../services";

// styles
import "react-quill/dist/quill.snow.css";
import "./socia.css";
import useQuery from "../../hooks/useQuery";
interface RouteParams {
  name: string;
}

const Posts = () => {
  let query = useQuery();


  const { name } = useParams<RouteParams>();
  const [validated, setValidated] = useState<boolean>(false);
  const [isSubmitting, setIsLoading] = useState(false);
  const [isShow, setIsShow] = useState(true);
  const [searchData, setsearchData] = useState([]);
  const [getTitleName, setTitleName] = useState("");
  const [getTitleCard, setTitleCard] = useState("");
  const [getDescPlace, setDescPlace] = useState(
    "eg. Cretorial simplifies social media for all with its revolutionary AI technology"
  );
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
    words: "",
    desc: query.get("quote") != 'null' ? query.get("quote")?.toString() : "",
    tone: "professional",
  });

  // console.log(name);

  /**
   * handle modal toggle
   */
  const toggle = () => {
    setShow((prevState) => !prevState);
  };

  // const delay = 1000;
  // const options = {
  //     autofocus: false,
  //     autosave: {
  //         enabled: true,
  //         uniqueId: '1',
  //         delay,
  //     },
  // };

  const handleChange = ({ currentTarget: input }: any) => {
    // console.log(input.value);
    setData({ ...postData, [input.name]: input.value });
  };

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
      console.log(searchData);
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

      // console.log(data);
    }
  };

  const getTitle = async (name: string) => {
    // setIsShow(true);
    getSubStatus();
    setsearchData([]);
    setIsLoading(false);
    setData({
      userid: "",
      brand: "",
      keyword: "",
      similar: "",
      count: "",
      words: "",
      desc: query.get("quote") != 'null' ? query.get("quote")?.toString() : "",
      tone: "professional",
    });
    if (name === "snapchatpost") {
      setTitleName("Snapchat captions");
      setTitleCard(
        "Snap-tastic captions for your snaps turning them engagement ready in an instant."
      );
      setDescPlace(
        "eg. Make your living room shine with premium tiger print sofas."
      );
    } else if (name === "ytideas") {
      setTitleName("Youtube Video Ideas");
      setTitleCard(
        "Relevant and smart video ideas that make your content stand out."
      );
      setDescPlace("eg. Ideas for the latest AI upcoming technologies.");
    } else if (name === "ytscript") {
      setTitleName("Youtube Video Script");
      setTitleCard(
        "Intruiging and engaging youtube video scripts that keep the viewers hooked."
      );
      setDescPlace(
        "eg. Comparing iOS and Android mobile phones in terms of ease of use"
      );
    } else if (name === "ytdesc") {
      setTitleName("Youtube Video Title");
      setTitleCard(
        "Catchy, SEO-friendly descriptions that help your videos raise engagement."
      );
      setDescPlace("eg. The best restaurants for trying sushi");
    } else if (name === "fbpost") {
      setTitleName("Facebook Posts");
      setTitleCard(
        "Get an edge on the competition by facebook posts that are unique and engaging."
      );
      setDescPlace(
        "eg. Stylish hoodies for millenials that makes them look good!"
      );
    } else if (name === "igpost") {
      setTitleName("Instagram captions");
      setTitleCard(
        "Captions that turn your images into an attention-grabbing spectacle."
      );
      setDescPlace("eg. Fast car that reaches 0-100 kmph in 3 seconds");
    } else if (name === "linkedinpost") {
      setTitleName("LinkedIn posts");
      setTitleCard(
        "LinkedIn posts that help establish you as a thought leader in your industry."
      );
      setDescPlace("eg. The role of mentorship in professional development");
    } else if (name === "tweetpost") {
      setTitleName("Twitter Posts");
      setTitleCard(
        "Generate a buzz with tweets that captivate readers' attention inviting them in a conversation."
      );
      setDescPlace("eg. Mutual funds that promise the highest returns");
    } else {
      setTitleName("Snapchat Bio");
      setTitleCard(
        "Snap-tastic captions for your snaps turning them engagement ready in an instant."
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
    console.log(currentButton);
    if (currentButton.innerText === "Copy") {
      currentButton.innerHTML = `Copied`;
      copyArr = [...contentEditor, text];
      setContentEditor(copyArr);
      // toast("Wow so easy !");
    }


  };

  const savePost = async (e: any, value: any) => {
    console.log(value);
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

  const moreLikeThis = async (e: any, value: any) => {
    history.push('/hashtag/hashtags-by-text/', { state: value });
    // setIsLoading(true);
    // setsearchData([]);
    // postData.similar = value;
    // const searchData = postData;
    // console.log(searchData);
    // const data = await apiService.contentPost(name, { searchData });
    // if (data.success === false) {
    //   toast.info(data.Message, {
    //     position: "top-right",
    //     autoClose: 1000,
    //     hideProgressBar: true,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    // } else {
    //   const cleanArray = data.result.filter((val: any) => val != " ");
    //   setsearchData(cleanArray);
    // }
    // setIsLoading(false);
    // setValidated(false);
  };

  const getSubStatus = async () => {
    const data = await apiService.CaiShowSubsData();
    console.log(data);
    if (data.Status != "Active") {
      history.push("/pages/pricing");
    }
  };

  useEffect(() => {
    getTitle(name);
  }, [name]);

  return (
    <React.Fragment>
      <PageTitleNew
        breadCrumbItems={[
          { label: "Social Media", path: `/post/${name}` },
          { label: getTitleName, path: `/post/${name}`, active: true },
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
                  <Form.Label>
                    {name === "ytdesc"
                      ? "What is your video about?"
                      : name === "ytscript" || name === "ytideas"
                        ? "Enter Video Topic"
                        : // :  ?
                        //     ''
                        "Enter Your Topic"}
                  </Form.Label>
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
                        <ButtonGroup className="me-1" onClick={(e) => {
                          savePost(e, item);
                        }}>
                          <Button className="btn btn-soft-secondary btn-sm">
                            <i className="uil uil-heart-alt me-1" style={{ fontStyle: "unset" }}>Save</i>
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
                        {/* <ButtonGroup className="me-1 d-none">
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
            <div className="position-relative">
              <Card className="editior">
                <Card.Body >
                  <h4 className="header-title mt-0 mb-2">Editior</h4>
                  {/* <p className="sub-header">
                                      SimpleMDE is a light-weight, simple, embeddable, and beautiful JS markdown editor
                                  </p> */}
                  <SunEditor
                    setDefaultStyle="font-family:IBM Plex Sans, sans-serif;"
                    setContents={contentEditor
                      .map((element) => element)
                      .join("</br></br>")}
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
                  />
                </Card.Body>
              </Card>
            </div>
          )}
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Posts;
