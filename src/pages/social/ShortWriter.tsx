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
import Editor from "../../components/Editor/";
import "suneditor/dist/css/suneditor.min.css";
import SunEditor, { buttonList } from "suneditor-react";
import { toast } from "react-toastify";

// components
import PageTitleNew from "../../components/PageTitleNew";
import * as apiService from "../../services";

// styles
import "./socia.css";
import "easymde/dist/easymde.min.css";
import useQuery from "../../hooks/useQuery";

interface RouteParams {
  name: string;
}

const Writer = () => {
  let query = useQuery();


  const { name } = useParams<RouteParams>();
  const [validated, setValidated] = useState<boolean>(false);
  const [isSubmitting, setIsLoading] = useState(false);
  const [isShow, setIsShow] = useState(true);
  const [searchData, setsearchData] = useState([]);
  const [getTitleName, setTitleName] = useState("");
  const [getTitleCard, setTitleCard] = useState("");
  const [getDescPlace, setDescPlace] = useState("");
  const [error, setError] = useState([]);
  const [show, setShow] = useState<boolean>(false);
  const formRef = useRef(null);
  const history = useHistory();
  const [contentEditor, setContentEditor] = useState<Array<HTMLElement>>([]);
  const [postData, setData] = useState({
    userid: "",
    similar: "",
    keyword: "",
    topic: "",
    title: "",
    product: "",
    brand: "",
    words: "",
    desc: query.get("quote") != 'null' ? query.get("quote")?.toString() : "",
    occation_type: "",
    count: "",
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
      postData.similar = "";
      const searchData = postData;
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

        // alert(JSON.stringify(cleanArray));

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
      similar: "",
      keyword: "",
      topic: "",
      title: "",
      product: "",
      brand: "",
      words: "",
      desc: query.get("quote") != 'null' ? query.get("quote")?.toString() : "",
      occation_type: "",
      count: "",
      tone: "professional",
    });
    if (name === "textshortnerbykeyword") {
      setTitleName("Content rephrase");
      setTitleCard(
        "Give your content a fresh spin by rephrasing it in a different voice and style."
      );
      setDescPlace(
        "eg. Unleash the beast within with our speed car, an unrelenting powerhouse built for the adventure-seekers."
      );
    } else if (name === "quotesbykeywords") {
      setTitleName("Quote generator");
      setTitleCard(
        "Grab attention and inspire engagement with eye-catching quotes."
      );
      setDescPlace(
        "eg.  A women's jeans brand that is stylish and comfortable."
      );
    } else if (name === "greetingbybrand") {
      setTitleName("Festival wishes");
      setTitleCard("Write diwali wishes for boss");
      setDescPlace("Write diwali wishes for boss");
    } else if (name === "textrewritebykeyword") {
      setTitleName("Content summarizer");
      setTitleCard(
        "Summarize your content making it more readable while retaining its essence."
      );
      setDescPlace(
        "eg. Elegant jewellery from our collection is created to convey sophistication and style. The best materials are used to preciselly manufacture each item, giving it a classic appearance that will never fade away, just like your smile!"
      );
    } else if (name === "calltoactionbykeywords") {
      setTitleName("Call to action");
      setTitleCard(
        "Attention-grabbing call to action that help boost your sales."
      );
      setDescPlace(
        "eg. The best kitchenware products that are on a 20% sale for a limited time period."
      );
    } else if (name === "notificationsbykeywords") {
      setTitleName("Smart notifications");
      setTitleCard(
        "Engaging notifications for app and SMS that keep the users hooked for more."
      );
      setDescPlace(
        "eg. An app that helps you find the best funds to invest in."
      );
    } else if (name === "emailsubjectbykeyword") {
      setTitleName("Email subject");
      setTitleCard(
        "Give your content a fresh spin by rephrasing it in a different voice and style."
      );
      setDescPlace(
        "eg. Welcome email to a user that registers on a fitness website "
      );
    } else if (name === "sloganskykeywords") {
      setTitleName("Slogans");
      setTitleCard(
        "Uplevel your creative gene with world-class slogans that seperate your brand from the rest."
      );
      setDescPlace(
        "eg. Slogans for a women's apparel brand that deals in high-end styles."
      );
    } else {
      setTitleName("Quora answers");
      setTitleCard("Quora answers");
      setDescPlace("Quora answers");
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
    // console.log(currentButton);
    if (currentButton.innerText === "Copy") {
      currentButton.innerHTML = `Copied`;
      copyArr = [...contentEditor, text];
      setContentEditor(copyArr);
    }
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

  const moreLikeThis = async (e: any, value: any) => {
    history.push('/hashtag/hashtags-by-text/', { state: value });
    setIsLoading(true);
    setsearchData([]);
    postData.similar = value;
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

  return (
    <React.Fragment>
      <PageTitleNew
        breadCrumbItems={[
          { label: "Writer", path: `/shortwriter/${name}` },
          { label: getTitleName, path: `/shortwriter/${name}`, active: true },
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
                    {name === "calltoactionbykeywords"
                      ? "Describe your business/product/service"
                      : name === "quotesbykeywords"
                        ? "Enter your topic"
                        : name === "notificationsbykeywords"
                          ? "Describe your product/ service"
                          : name === "sloganskykeywords"
                            ? "What do you want a slogan on?"
                            : name === "emailsubjectbykeyword"
                              ? "Email description"
                              : "Enter your content"}
                  </Form.Label>
                  {/* <Form.Control type="text" placeholder="Zip" required /> */}
                  <Form.Control
                    as="textarea"
                    name="desc"
                    rows={4}
                    onChange={handleChange}
                    value={postData.desc}
                    placeholder={getDescPlace}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a some input.
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
            <Card>
              <Card.Body>
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
          )}
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Writer;
