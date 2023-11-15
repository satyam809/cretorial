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

interface RouteParams {
  name: string;
}

const Writer = () => {
  const { name } = useParams<RouteParams>();
  const [validated, setValidated] = useState<boolean>(false);
  const [isSubmitting, setIsLoading] = useState(false);
  const [isShow, setIsShow] = useState(true);
  const [searchData, setsearchData] = useState<any>(null);
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
    desc: "",
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
      setsearchData(null);
      // const {brand, keyword, words, desc, tone} = e.target.elements;
      // if(name === 'blogbykeyword') {
      //     const searchData = {
      //         userid: "",
      //         similar: "",
      //         keyword: "",
      //         topic: "",
      //         title: "",
      //         words: 300,
      //         desc: desc.value,
      //         tone: tone.value,
      //     };
      //     console.log(searchData);
      //     const data = await apiService.contentPost(name,{ searchData });
      //     // setIsShow(false);
      //     const res = data.Message.map(function(val:any) {return val;}).join('\r\n\n');
      //     setsearchData(res);
      // } else if(name === 'faqbykeyword') {
      //     const searchData = {
      //         userid: "",
      //         similar: "",
      //         keyword: desc.value,
      //         topic: "",
      //         title: "",
      //         count: "",
      //         product: "",
      //         brand: "",
      //         desc: desc.value,
      //         tone: tone.value,
      //     };
      //     const data = await apiService.contentPost(name,{ searchData });
      //     const res = data.Message.map(function(val:any) {return val;}).join('\r\n');
      //     setsearchData(res);
      // } else {
      //     const searchData = {keyword: '', topic: '', title:'', words:'', product:'',brand:'', desc:desc.value, tone:tone.value};

      // }

      if (name === "faqbykeyword") {
        postData.keyword = postData.desc;
      }
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
        const res = data.result?.map(function (val: any) {
          return val;
        }).join("\r\n");
        setsearchData(res);
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
    getSubStatus();
    setsearchData(null);
    setIsLoading(false);
    setData({
      userid: "",
      similar: "",
      keyword: "",
      topic: "",
      title: "",
      product: "",
      brand: "",
      words: "",
      desc: "",
      occation_type: "",
      count: "",
      tone: "professional",
    });
    if (name === "blogbykeyword") {
      setTitleName("Blog");
      setTitleCard(
        "Clean, crisp, and conversational high quality blog posts optimized to generate more traffic."
      );
      setDescPlace(
        "eg. How to ace the makeup look with bare minimum home tools."
      );
    } else if (name === "articlebykeyword") {
      setTitleName("Article");
      setTitleCard(
        "Premium quality, SEO-friendly articles that plug in the research factor."
      );
      setDescPlace(
        "eg. The future of automotive industry and how EV cars will change the game"
      );
    } else if (name === "prarticlebykeyword") {
      setTitleName("PR Article");
      setTitleCard(
        "Engaging press releases that amplify the reach of your product or service to the media."
      );
      setDescPlace(
        "eg. The newly launched premium running shoe from the brand ModernSprinters promises to revolutionize the running experience."
      );
    } else if (name === "essaybykeyword") {
      setTitleName("Essay");
      setTitleCard(
        "Go from novice to pro with analytical essays in an instant."
      );
      setDescPlace(
        "eg. The role of autonomous vehicles in reducing accidents and improving traffic."
      );
    } else if (name === "emailbykeyword") {
      setTitleName("Email");
      setTitleCard(
        "Professional emails that help you engage your target audience."
      );
      setDescPlace(
        "eg. A welcome email to be sent to the users registering on a fitness website."
      );
    } else if (name === "coverletterbykeyword") {
      setTitleName("Cover letter");
      setTitleCard(
        "Professional cover letters that leave a lasting impression and helps you get hired faster."
      );
      setDescPlace(
        "eg. Applying for a job of a copywriter. I am skilled in creative writing and multitasking"
      );
    } else if (name === "faqbykeyword") {
      setTitleName("FAQs");
      setTitleCard(
        "Smartly written FAQs that never leave the visitors wondering."
      );
      setDescPlace(
        "eg. A jewelery website that is committed to providing you with the most exquisite jewelry items at unbeatable prices."
      );
    } else if (name === "textexpanderbykeyword") {
      setTitleName("Text expander");
      setTitleCard(
        "Up-level your ideas by turning short sentences into longer, more descriptive ones."
      );
      setDescPlace("The only beauty cream you need for a happy face.");
    } else if (name === "jdbykeyword") {
      setTitleName("Job description");
      setTitleCard("Write a suitable job description for any given role.");
      setDescPlace(
        "eg. Write a job description for a senior manager looking for a financial analyst role"
      );
    } else {
      setTitleName("Quora answers");
      setTitleCard(
        "Build your authority with answers that are clear, descriptive, and research evident."
      );
      setDescPlace(
        "eg. How is the rise of electric vehicles affecting traditional car manufacturers?"
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
    setIsLoading(true);
    setsearchData(null);
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
      const res = data.result?.map(function (val: any) {
        return val;
      }).join("\r\n");
      setsearchData(res);
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
          { label: "Long Form Writer", path: `/writer/${name}` },
          { label: getTitleName, path: `/writer/${name}`, active: true },
        ]}
        title={getTitleName}
        subtitle={getTitleCard}
      />

      <Row>
        <Col lg={6} className={ (searchData) ? "fixedEditor":''}>
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
                  {name === "blogbykeyword" ||
                  name === "articlebykeyword" ||
                  name === "prarticlebykeyword" ||
                  name === "essaybykeyword" ||
                  name === "textexpanderbykeyword" ? (
                    <Form.Label>Your Topic</Form.Label>
                  ) : name === "quorabykeyword" ? (
                    <Form.Label>Enter your question</Form.Label>
                  ) : (
                    <Form.Label>Description</Form.Label>
                  )}
                  {/* <Form.Control type="text" placeholder="Zip" required /> */}
                  <Form.Control
                    as="textarea"
                    name="desc"
                    rows={3}
                    placeholder={getDescPlace}
                    value={postData.desc}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a Description.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="validationCustom06">
                  <Form.Label>Tone</Form.Label>
                  {/* <Form.Control type="text" name="tone" placeholder="Tone" required /> */}
                  <Form.Select name="tone" required>
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
                      <Card.Text className="text-muted">{searchData}</Card.Text>
                      <ButtonGroup className="me-1" onClick={(e) => {
                              _copyText(e, searchData);
                            }}>
                        <Button className="btn btn-soft-secondary btn-sm">
                          <i className="uil uil-copy me-1" style={{ fontStyle: "unset" }}>Copy</i>
                        </Button>
                      </ButtonGroup>
                      <ButtonGroup className="me-1" onClick={(e) => {
                              savePost(e, searchData);
                            }}>
                        <Button className="btn btn-soft-secondary btn-sm">
                          <i className="uil uil-heart-alt me-1" style={{ fontStyle: "unset" }}>Save</i>
                        </Button>
                      </ButtonGroup>
                      <ButtonGroup className="me-1">
                        <Button
                          className="btn btn-soft-secondary btn-sm"
                          onClick={(e) => {
                            moreLikeThis(e, searchData);
                          }}
                        >
                          <i className="uil uil-plus-square me-1"></i>More Like
                          This
                        </Button>
                      </ButtonGroup>
                      {/* <ButtonGroup className="me-1">
                                            <Button className="btn btn-soft-secondary btn-sm">
                                                <i className="uil uil-times-circle me-1"></i>Remove
                                            </Button>
                                        </ButtonGroup> */}
                      {/* <Card.Link href="javascript::void(0)" onClick={() => { _copyText(searchData) }} className="text-custom">
                                            Copy
                                        </Card.Link> */}
                      {/* <Card.Text>
                                            <small className="text-muted">Last updated 3 mins ago</small>
                                        </Card.Text> */}
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            )}
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
                  setContents={contentEditor.map((element) => element).join("</br></br>")}
                  setOptions={{
                    audioAccept: "true",
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
