import React, { useEffect, useState, useRef, useContext } from "react";
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
import { Wizard, Steps, Step } from 'react-albus';
import classNames from 'classnames';

// components
import PageTitleNew from "../../components/PageTitleNew";
import * as apiService from "../../services";

import { VerticalForm, FormInput } from '../../components/';
// styles
import "./socia.css";
import "easymde/dist/easymde.min.css";
import { async } from "q";

interface RouteParams {
  name: string;
}

interface ActivityTypes {
  id: number;
  stepno: string;
  title: string;
  staus: boolean;
}

const FullBlog = () => {
  const { name } = useParams<RouteParams>();
  const [validated, setValidated] = useState<boolean>(false);
  const [validated1, setValidated1] = useState<boolean>(false);
  const [validated2, setValidated2] = useState<boolean>(false);
  const [validated3, setValidated3] = useState<boolean>(false);

  const [isSubmitting, setIsLoading] = useState(false);
  const [isSubmitting1, setIsLoading1] = useState(false);
  const [isSubmitting2, setIsLoading2] = useState(false);
  const [isSubmitting3, setIsLoading3] = useState(false);
  const [isSubmitting4, setIsLoading4] = useState(false);

  const [isShow, setIsShow] = useState(false);
  const [isShow1, setIsShow1] = useState(false);
  const [isShow2, setIsShow2] = useState(false);
  const [isShow3, setIsShow3] = useState(false);
  const [isShow4, setIsShow4] = useState(false);

  const [searchData, setsearchData] = useState<any>(null);
  const [searchData1, setsearchData1] = useState<any>(null);
  const [searchData2, setsearchData2] = useState<any>(null);
  const [searchData3, setsearchData3] = useState<any>(null);
  const [keywordData, setkeywordData] = useState<any>(null);

  const [getTitleName, setTitleName] = useState("");
  const [getTitleCard, setTitleCard] = useState("");
  const [getDescPlace, setDescPlace] = useState("");
  const [error, setError] = useState([]);
  const [show, setShow] = useState<boolean>(false);
  const formRef = useRef(null);
  const history = useHistory();
  const [contentEditor, setContentEditor] = useState<Array<HTMLElement>>([]);

  const [activeId, setActiveId] = useState("");
  const [activeId1, setActiveId1] = useState("");
  const [activeId2, setActiveId2] = useState("");
  const [activeId3, setActiveId3] = useState("");

  const [postData, setData] = useState({
    userid: "",
    desc: "",
    title: "",
    tone: "professional",
    outline: "",
    keywords: "",
    intro: "",
    // similar: "",
    // topic: "",
    // product: "",
    // brand: "",
    // words: "",
    // count: "",
  });

  const [activities, setActivities] = useState([
    {
      id: 1,
      stepno: 'Step 1',
      title: 'Title',
      staus: false,
    },
    {
      id: 2,
      stepno: 'Step 2',
      title: 'Outline',
      staus: false,
    },
    {
      id: 3,
      stepno: 'Step 3',
      title: 'Keywords',
      staus: false,
    },
    {
      id: 4,
      stepno: 'Step 4',
      title: 'Introduction',
      staus: false,
    },
    {
      id: 5,
      stepno: 'Step 5',
      title: 'Full blog',
      staus: false,
    },
  ]);

  const handleChange = ({ currentTarget: input }: any) => {
    // console.log(input.value);
    setData({ ...postData, [input.name]: input.value });
  };

  const _saveTitle = (item: string) => {
    // console.log(item);
    setActiveId(item);
    setData({ ...postData, title: item });
    toast.info('Click Next to proceed ahead', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  };

  const _saveOutline = (item: string) => {
    // console.log(item);
    setActiveId1(item);
    setData({ ...postData, outline: item });
    toast.info('Click Next to proceed ahead', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  };

  const _saveIntroduction = (item: string) => {
    // console.log(item);
    setActiveId2(item);
    setData({ ...postData, intro: item });
    toast.info('Click Next to proceed ahead', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
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
      const searchData = postData;
      const data = await apiService.contentPost('caiblogtitle', { searchData });
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
        setIsShow(true);
      }
      setIsLoading(false);
      setValidated(false);
      // // console.log(data);
    }
  };

  const handleSubmit1 = async (e: any) => {
    e.preventDefault();
    setIsLoading1(true);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated1(true);
      setIsLoading1(false);
    } else {
      setsearchData1([]);
      const searchData = postData;
      const data = await apiService.contentPost('caiblogoutline', { searchData });
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
        setsearchData1(cleanArray);
        setIsShow1(true);
      }
      setIsLoading1(false);
      setValidated1(false);
      // // console.log(data);
    }
  };

  const handleSubmit2 = async (e: any) => {
    e.preventDefault();
    setIsLoading2(true);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated2(true);
      setIsLoading2(false);
    } else {
      setsearchData2([]);
      const searchData = postData;
      const data = await apiService.contentPost('caiblogintro', { searchData });
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
        setsearchData2(cleanArray);
        setIsShow2(true);
      }
      setIsLoading2(false);
      setValidated2(false);
      // // console.log(data);
    }
  };

  const handleSubmit3 = async (e: any) => {
    e.preventDefault();
    setIsLoading3(true);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated3(true);
      setIsLoading3(false);
    } else {
      setsearchData3([]);
      const searchData = postData;
      const data = await apiService.contentPost('caigetblogdraft', { searchData });
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
        console.log(data);
        history.push('/social/fulleditior/', { state: data });

        // const cleanArray = data.result.filter((val: any) => val != " ");
        // setsearchData3(cleanArray);
        // setIsShow3(true);
      }
      setIsLoading3(false);
      setValidated3(false);
      // // console.log(data);
    }
  };

  const handleKeywords = async (e: any) => {
    setIsLoading4(true);
    setkeywordData([]);
    const searchData = postData;
    const data = await apiService.contentPost('caiblogkeywords', { searchData });
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
      const stringKe = cleanArray?.map(function (val: any) {
        return val;
      }).join(",");
      setData({ ...postData, keywords: stringKe });
      setIsShow4(true);
      // console.log(cleanArray);
    }
    setIsLoading4(false);
  };

  const getTitle = async () => {
    // setIsShow(true);
    // formRef.current.reset();
    getSubStatus();
    getSubStatus();
    setsearchData([]);
    setIsLoading(false);
    setData({
      userid: "",
      desc: "",
      title: "",
      tone: "professional",
      outline: "",
      keywords: "",
      intro: "",
      // similar: "",
      // keywords: "",
      // topic: "",
      // product: "",
      // brand: "",
      // words: "",
      // count: "",
    });
    setTitleName("Full Blog Wizard");
    setTitleCard("Effortlessly create engaging blogs with supporting visuals all in a few minutes.");
    setDescPlace("eg. The future of automotive design from classic trends to modern innovation.");
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

  // const moreLikeThis = async (e: any, value: any) => {
  //   setIsLoading(true);
  //   setsearchData([]);
  //   // postData.similar = value;
  //   const searchData = postData;
  //   console.log(searchData);
  //   const data = await apiService.contentPost(name, { searchData });
  //   if (data.success === false) {
  //     toast.info(data.Message, {
  //         position: "top-right",
  //         autoClose: 1000,
  //         hideProgressBar: true,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //     });
  //   } else {
  //     const res = data.result?.map(function (val: any) {
  //       return val;
  //     }).join("\r\n");
  //     setsearchData(res);
  //   }
  //   setIsLoading(false);
  //   setValidated(false);
  // };

  const getSubStatus = async () => {
    const data = await apiService.CaiShowSubsData();
    // console.log(data);
    if (data.Status != "Active") {
      history.push("/pages/pricing");
    }
  };

  useEffect(() => {
    getTitle();
  }, []);

  return (
    <React.Fragment>
      <PageTitleNew
        breadCrumbItems={[
          { label: getTitleName, path: `/writer/${name}`, active: true },
        ]}
        title={getTitleName}
        subtitle={getTitleCard}
      />

      <Row>
        <Col className="mx-auto" lg={9}>
          <Card className="fullblog">
            <Card.Body>
              <h4 className="header-title mb-2">{getTitleCard}</h4>

              <Wizard
                render={({ step, steps }) => (
                  <React.Fragment>
                    {/* <ProgressBar
                                animated
                                striped
                                variant="success"
                                now={((steps.indexOf(step) + 1) / steps.length) * 100}
                                className="mb-3 progress-sm"
                            /> */}
                    <Row>
                      {(activities || []).map((item, index) => {
                        return (
                          <Col key={index}>
                            {/* <div>{steps.indexOf(step) == 1 ? 'sucess' : 'fail'}</div> */}
                            {/* <div>{(steps.indexOf(step) + 1)}</div> */}
                            <div className={classNames('d-flex')}>
                              <div className="avatar me-2 fs-24 fw-normal flex-shrink-0">
                                <span
                                  className={classNames(
                                    'avatar-title',
                                    'rounded-circle',
                                    'bg-soft-primary',
                                    'text-primary',
                                    (steps.indexOf(step) + 1) == item.id ? 'active' : ''
                                  )}>
                                  {item.id}
                                </span>
                              </div>

                              <div className="flex-grow-1">
                                <h6 className="mt-0 mb-1 fs-15 fw-normal">
                                  {item.stepno}
                                </h6>
                                <p className="text-muted">{item.title}</p>
                              </div>
                            </div>
                          </Col>
                        );
                      })}
                    </Row>
                    <Steps>
                      <Step
                        id="login"
                        render={({ next }) => (
                          <Form
                            noValidate
                            ref={formRef}
                            validated={validated}
                            onSubmit={handleSubmit}
                          >
                            <Form.Group className="mb-3" controlId="validationCustom05">
                              <Form.Label>
                                Enter your topic
                              </Form.Label>
                              <Form.Control
                                as="textarea"
                                key="desc"
                                name="desc"
                                rows={3}
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
                              <Form.Select name="tone" onChange={handleChange} value={postData.tone} required>
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
                              Generate
                            </Button>
                            {isShow ?
                              <>
                                <div className="search-result my-2">
                                  <h4 className="mb-2">Results</h4>
                                  <p>Generate couple of times for the best results</p>
                                  {searchData?.map((newitem: any) => {
                                    return (
                                      <Card className={`card-search ${activeId === newitem ? "active" : ""}
                                                  `} key={newitem} onClick={(e) => {
                                          _saveTitle(newitem);
                                        }}>
                                        <Row className="g-0 align-items-center">
                                          <Col md={12}>
                                            <Card.Body>
                                              {/* <Card.Title as="h5" className="fs-16">
                                                                                  Card title
                                                                              </Card.Title> */}
                                              <Card.Text className="text-muted">{newitem}</Card.Text>
                                              <ButtonGroup
                                                className="me-1"
                                                onClick={(e) => {
                                                  _copyText(e, newitem);
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
                                                  savePost(e, newitem);
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
                                              {/* <ButtonGroup className="me-1">
                                                            <Button
                                                              className="btn btn-soft-secondary btn-sm"
                                                              onClick={(e) => {
                                                                moreLikeThis(e, newitem);
                                                              }}
                                                            >
                                                              <i className="uil uil-plus-square me-1"></i>More
                                                              Like This
                                                            </Button>
                                                          </ButtonGroup> */}
                                            </Card.Body>
                                          </Col>
                                        </Row>
                                      </Card>
                                    );
                                  })}
                                </div>
                                <ul className="list-inline wizard mb-0">
                                  {/* <li className="previous list-inline-item">
                                                  <Button variant="secondary" disabled>
                                                      Previous
                                                  </Button>
                                              </li> */}
                                  <li className="next list-inline-item float-end">
                                    <Button onClick={next} variant="secondary">
                                      Next
                                    </Button>
                                  </li>
                                </ul>
                              </>
                              :
                              <>
                                {/* <Button type="submit" disabled={isSubmitting}>
                                            {isSubmitting && (
                                              <span className="spinner-border spinner-border-sm me-1"></span>
                                            )}
                                            Generate
                                          </Button> */}
                              </>
                            }

                          </Form>
                        )}
                      />
                      <Step
                        id="gandalf"
                        render={({ next, previous }) => (
                          <Form noValidate validated={validated1} onSubmit={handleSubmit1}>
                            <Form.Group className="mb-3" controlId="validationCustom07">
                              <Form.Label>
                                Enter your topic
                              </Form.Label>
                              <Form.Control
                                key="title"
                                name="title"
                                onChange={handleChange}
                                value={postData.title}
                                placeholder={getDescPlace}
                                required
                              />
                              <Form.Control.Feedback type="invalid">
                                Please provide a some input.
                              </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="validationCustom08">
                              <Form.Label>Tone</Form.Label>
                              <Form.Select name="tone" onChange={handleChange} value={postData.tone} required>
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

                            <Button type="submit" disabled={isSubmitting1}>
                              {isSubmitting1 && (
                                <span className="spinner-border spinner-border-sm me-1"></span>
                              )}
                              Generate
                            </Button>

                            {isShow1 ?
                              <>
                                <div className="search-result my-2">
                                  <h4 className="mb-2">Results</h4>
                                  <p>Generate couple of times for the best results</p>
                                  {searchData1?.map((newitem: any) => {
                                    return (
                                      <Card className={`card-search ${activeId1 === newitem ? "active" : ""}
                                                        `} key={newitem} onClick={(e) => {
                                          _saveOutline(newitem);
                                        }}>
                                        <Row className="g-0 align-items-center">
                                          <Col md={12}>
                                            <Card.Body>
                                              {/* <Card.Title as="h5" className="fs-16">
                                                                                        Card title
                                                                                    </Card.Title> */}
                                              <Card.Text className="text-muted">{newitem}</Card.Text>
                                              <ButtonGroup
                                                className="me-1"
                                                onClick={(e) => {
                                                  _copyText(e, newitem);
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
                                                  savePost(e, newitem);
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
                                              {/* <ButtonGroup className="me-1">
                                                                  <Button
                                                                    className="btn btn-soft-secondary btn-sm"
                                                                    onClick={(e) => {
                                                                      moreLikeThis(e, newitem);
                                                                    }}
                                                                  >
                                                                    <i className="uil uil-plus-square me-1"></i>More
                                                                    Like This
                                                                  </Button>
                                                                </ButtonGroup> */}
                                            </Card.Body>
                                          </Col>
                                        </Row>
                                      </Card>
                                    );
                                  })}
                                </div>
                                <ul className="list-inline wizard mb-0">
                                  <li className="previous list-inline-item">
                                    <Button onClick={previous} variant="secondary">
                                      Previous
                                    </Button>
                                  </li>
                                  <li className="next list-inline-item float-end">
                                    <Button onClick={next} variant="secondary">
                                      Next
                                    </Button>
                                  </li>
                                </ul>
                              </>
                              :
                              <>
                                {/* <Button type="submit" disabled={isSubmitting1}>
                                                {isSubmitting1 && (
                                                  <span className="spinner-border spinner-border-sm me-1"></span>
                                                )}
                                                Generate
                                              </Button> */}
                              </>
                            }
                          </Form>
                        )}
                      />
                      <Step
                        id="gandalfne"
                        render={({ next, previous }) => (
                          <Form noValidate validated={validated2} onSubmit={handleSubmit2}>
                            <Form.Group className="mb-1" controlId="validationCustom09">
                              <Form.Label className="w-100">
                                <span>Keywords</span>
                              </Form.Label>
                              <Form.Control
                                as="textarea"
                                key="keyword"
                                name="keywords"
                                rows={3}
                                onChange={handleChange}
                                value={postData.keywords}
                                placeholder="e.g. Brand marketing, social media design, collaboration, brand campaigns, facebook ads"
                                required
                              />
                              <Form.Control.Feedback type="invalid">
                                Please provide a some input.
                              </Form.Control.Feedback>
                            </Form.Group>
                            {/* <Button type="submit" disabled={isSubmitting2}>
                                                {isSubmitting2 && (
                                                  <span className="spinner-border spinner-border-sm me-1"></span>
                                                )}
                                                Generate
                                            </Button> */}

                            {isShow4 ?
                              <>
                                <ul className="list-inline wizard mb-0">
                                  <li className="previous list-inline-item">
                                    <Button onClick={previous} variant="secondary">
                                      Previous
                                    </Button>
                                  </li>
                                  <li className="next list-inline-item float-end">
                                    <Button onClick={next} variant="secondary">
                                      Next
                                    </Button>
                                  </li>
                                </ul>
                              </>
                              :
                              <>
                                <Button type="submit" onClick={handleKeywords} disabled={isSubmitting4}>
                                  {isSubmitting4 && (
                                    <span className="spinner-border spinner-border-sm me-1"></span>
                                  )}
                                  Generate Keywords
                                </Button>
                              </>
                            }
                          </Form>
                        )}
                      />
                      <Step
                        id="gandalfnew"
                        render={({ next, previous }) => (
                          <Form noValidate validated={validated2} onSubmit={handleSubmit2}>
                            <Form.Group className="mb-1" controlId="validationCustom07">
                              <Form.Label>Blog Topic</Form.Label>
                              <Form.Control
                                key="title"
                                name="title"
                                onChange={handleChange}
                                value={postData.title}
                                placeholder={getDescPlace}
                                required
                              />
                              <Form.Control.Feedback type="invalid">
                                Please provide a some input.
                              </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="validationCustom08">
                              <Form.Label>Tone</Form.Label>
                              <Form.Select name="tone" onChange={handleChange} value={postData.tone} required>
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

                            <Button type="submit" disabled={isSubmitting2}>
                              {isSubmitting2 && (
                                <span className="spinner-border spinner-border-sm me-1"></span>
                              )}
                              Generate
                            </Button>
                            {isShow2 ?
                              <>
                                <div className="search-result my-2">
                                  <h4 className="mb-2">Results</h4>
                                  <p>Generate couple of times for the best results</p>
                                  {searchData2?.map((newitem: any) => {
                                    return (
                                      <Card className={`card-search ${activeId2 === newitem ? "active" : ""}
                                                        `} key={newitem} onClick={(e) => {
                                          _saveIntroduction(newitem);
                                        }}>
                                        <Row className="g-0 align-items-center">
                                          <Col md={12}>
                                            <Card.Body>
                                              <Card.Text className="text-muted">{newitem}</Card.Text>
                                              <ButtonGroup
                                                className="me-1"
                                                onClick={(e) => {
                                                  _copyText(e, newitem);
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
                                                  savePost(e, newitem);
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
                                              {/* <ButtonGroup className="me-1">
                                                                  <Button
                                                                    className="btn btn-soft-secondary btn-sm"
                                                                    onClick={(e) => {
                                                                      moreLikeThis(e, newitem);
                                                                    }}
                                                                  >
                                                                    <i className="uil uil-plus-square me-1"></i>More
                                                                    Like This
                                                                  </Button>
                                                                </ButtonGroup> */}
                                            </Card.Body>
                                          </Col>
                                        </Row>
                                      </Card>
                                    );
                                  })}
                                </div>
                                <ul className="list-inline wizard mb-0">
                                  <li className="previous list-inline-item">
                                    <Button onClick={previous} variant="secondary">
                                      Previous
                                    </Button>
                                  </li>
                                  <li className="next list-inline-item float-end">
                                    <Button onClick={next} variant="secondary">
                                      Next
                                    </Button>
                                  </li>
                                </ul>
                              </>
                              :
                              <>
                                {/* <Button type="submit" disabled={isSubmitting2}>
                                                {isSubmitting2 && (
                                                  <span className="spinner-border spinner-border-sm me-1"></span>
                                                )}
                                                Generate
                                              </Button> */}
                              </>
                            }
                          </Form>
                        )}
                      />
                      <Step
                        id="dumbledore"
                        render={({ previous }) => (
                          <Form noValidate validated={validated3} onSubmit={handleSubmit3}>
                            <Form.Group className="mb-1" controlId="validationCustom07">
                              <Form.Label>Blog Topic</Form.Label>
                              <Form.Control
                                key="title"
                                name="title"
                                onChange={handleChange}
                                value={postData.title}
                                placeholder={getDescPlace}
                                required
                              />
                              <Form.Control.Feedback type="invalid">
                                Please provide a some input.
                              </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="validationCustom08">
                              <Form.Label>Tone</Form.Label>
                              <Form.Select name="tone" onChange={handleChange} value={postData.tone} required>
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

                            <Form.Group className="mb-1" controlId="validationCustom09">
                              <Form.Label>Blog Introduction</Form.Label>
                              <Form.Control
                                as="textarea"
                                key="intro"
                                name="intro"
                                rows={3}
                                onChange={handleChange}
                                value={postData.intro}
                                placeholder="e.g. Brand marketing, social media design, collaboration, brand campaigns, facebook ads"
                                required
                              />
                              <Form.Control.Feedback type="invalid">
                                Please provide a some input.
                              </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-1" controlId="validationCustom09">
                              <Form.Label>Blog Outline</Form.Label>
                              <Form.Control
                                as="textarea"
                                key="outline"
                                name="outline"
                                rows={3}
                                onChange={handleChange}
                                value={postData.outline}
                                placeholder="e.g. Brand marketing, social media design, collaboration, brand campaigns, facebook ads"
                                required
                              />
                              <Form.Control.Feedback type="invalid">
                                Please provide a some input.
                              </Form.Control.Feedback>
                            </Form.Group>

                            <ul className="list-inline wizard mb-0">
                              <li className="previous list-inline-item">
                                <Button onClick={previous} variant="secondary">
                                  Previous
                                </Button>
                              </li>

                              <li className="next list-inline-item float-end">
                                <Button type="submit" disabled={isSubmitting3}>
                                  {isSubmitting3 && (
                                    <span className="spinner-border spinner-border-sm me-1"></span>
                                  )}
                                  Generate
                                </Button>
                              </li>
                            </ul>
                            {isShow3 ?
                              <>
                                <div className="search-result my-2">
                                  <h4 className="mb-2">Results</h4>
                                  <p>Generate couple of times for the best results</p>
                                  {searchData3?.map((newitem: any) => {
                                    return (
                                      <Card className={`card-search ${activeId3 === newitem ? "active" : ""}
                                                          `} key={newitem}>
                                        <Row className="g-0 align-items-center">
                                          <Col md={12}>
                                            <Card.Body>
                                              <Card.Text className="text-muted">{newitem}</Card.Text>
                                              <ButtonGroup
                                                className="me-1"
                                                onClick={(e) => {
                                                  _copyText(e, newitem);
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
                                                  savePost(e, newitem);
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
                                              {/* <ButtonGroup className="me-1">
                                                                    <Button
                                                                      className="btn btn-soft-secondary btn-sm"
                                                                      onClick={(e) => {
                                                                        moreLikeThis(e, newitem);
                                                                      }}
                                                                    >
                                                                      <i className="uil uil-plus-square me-1"></i>More
                                                                      Like This
                                                                    </Button>
                                                                  </ButtonGroup> */}
                                            </Card.Body>
                                          </Col>
                                        </Row>
                                      </Card>
                                    );
                                  })}
                                </div>
                              </>
                              :
                              <>
                                {/* <Button type="submit" disabled={isSubmitting2}>
                                                  {isSubmitting2 && (
                                                    <span className="spinner-border spinner-border-sm me-1"></span>
                                                  )}
                                                  Generate
                                                </Button> */}
                              </>
                            }
                          </Form>
                        )}
                      />
                    </Steps>
                  </React.Fragment>
                )}
              />
            </Card.Body>
          </Card>
        </Col>

        {/* <Col lg={6}>
          
        </Col> */}
      </Row>
    </React.Fragment>
  );
};

export default FullBlog;
