import React, { useEffect, useState, useRef } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import {
  Row,
  Col,
  Modal,
  Button,
  ButtonGroup,
  Form,
  Tab,
  Nav,
  OverlayTrigger, Tooltip, OverlayProps
} from "react-bootstrap";
import type { MenuProps } from 'antd';
import { Popover, Dropdown } from 'antd';
import { toast } from "react-toastify";
import * as _ from 'lodash'; 

// components
import PageTitleNew from "../../components/PageTitleNew";
import * as apiService from "../../services";
import Spinner from "../../components/Spinner";

import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';

// styles
import "./socia.css";
import "easymde/dist/easymde.min.css";

interface TabContentType {
  id: number;
  title: string;
  icon?: string;
  name: string;
  apiname: string;
}

const tabContents: TabContentType[] = [
  {
    id: 1,
    title: 'Edit',
    icon: 'uil-home-alt',
    name: 'CaiTextReWrite',
    apiname: 'caitextrewrite',
  },
  {
    id: 2,
    title: 'Paraphase',
    icon: 'uil-user',
    name: 'CaiTextImprove',
    apiname: 'caitextimprove',
  },
  {
    id: 3,
    title: 'Simplify',
    icon: 'uil-envelope',
    name: 'CaiTextSimplify',
    apiname: 'caitextsimplify',
  },
  {
    id: 4,
    title: 'Make Creative',
    icon: 'uil-envelope',
    name: 'CaiMakeCreative',
    apiname: 'caimakecreative',
  },
  {
    id: 5,
    title: 'Write Formal',
    icon: 'uil-envelope',
    name: 'CaiWriteFormal',
    apiname: 'caiwriteformal',
  },
  {
    id: 6,
    title: 'Expand',
    icon: 'uil-envelope',
    name: 'CaiTextExpanderByKeyword',
    apiname: 'caitextexpanderbykeyword',
  },
  {
    id: 7,
    title: 'Summaries',
    icon: 'uil-envelope',
    name: 'CaiTextShortner',
    apiname: 'caitextshortner',
  },
];

const BlogWizard = () => {
  const [name, setName] = useState("caitextrewrite");
  const [validated, setValidated] = useState<boolean>(false);
  const [isSubmitting, setIsLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [searchData, setsearchData] = useState("");
  const [searchDataRplc, setsearchDataRplc] = useState([]);
  const [selectedText, setselectedText] = useState<any>([]);
  const [suggestValues, setSuggestValues] = useState<any>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const [countWord, setCountWord] = useState<number>(0);
  const [countWordRes, setCountWordRes] = useState<number>(0);
  const [buttonName, setbuttonName] = useState("Edit");

  const [postData, setData] = useState({
    userid: "",
    desc: "",
    size: 0,
    keywords: "",
    tone: "professional",
  });

  const [isReplaceSpinner, setIsReplaceSpinner] = useState(false);
  const [showReplacePopup, setShowReplacePopup] = useState<boolean>(false);
  const [selection, setSelection]: any = useState("");
  const [replaceText, setReplaceText]: any = useState("");
  const [replace, setReplace]: any = useState("");

  const [show, setShow] = useState<boolean>(false);
  const [hashtagData, setHashtagData] = useState([]);
  const [selectionWord, setSelectionWord]: any = useState("");
  const [isLoadingWord, setIsLoadingWord] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleChange = ({ currentTarget: input }: any) => {
    // console.log(input.value);
    if(input.name === 'desc') {
      const str = input.value;
      setCountWord(str.split(/\s+/).length);
    }
    setData({ ...postData, [input.name]: input.value });
  };

  const _saveApiName = (item: any) => {
    // console.log(item);
    setName(item.apiname);
    setbuttonName(item.title);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      setIsLoading(false);
    } else {
      setsearchData("");
      const searchData = postData;
      // console.log(searchData);
      const data = await apiService.contentPost(name, { searchData });
      console.log(data)
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
        const newdata = cleanArray?.map(function (val: any) {
          return val;
        }).join("\r\n");
        // console.log(newdata);
        setselectedText(["country", "India"]);
        setsearchData(newdata);
        setCountWordRes(newdata.split(/\s+/).length);

        const result = Object.keys(data.suggests);
        setselectedText(result);
        setSuggestValues(data.suggests);
        // const values = Object.values(data.suggests);
        // result.forEach(([key, value]) => {
        //   console.log(key); // 'one'
        //   console.log(value); // 1
        // });
        
        // console.log(result);
        // console.log(values);

      }
      // setIsShow(false);
      setIsLoading(false);
      setValidated(false);

      // console.log(getfiles);
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

    toast.success("Text Copied", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const content = (seltext: any) => {
    console.log(seltext);
    return (
      <ul>
        <li>{seltext}</li>
        <li>Content</li>
      </ul>
    );
  };

  const Highlighted = ({text = '', highlight = []}) => {
     
    const texthig = highlight.join("|");
    const regex = new RegExp("(" + texthig + ")", "gi");
    const parts = text.split(regex);
    console.log(regex);
    console.log(parts);
    return (
      <div className="h-200">
         {parts.map((part, i) => (
             regex.test(part) ? 
              // <span className="suggetion" key={i} onClick={() => { openSynmous(part); }}>
              <span className="suggetion" key={i}>
                <Popover content={content(part)} trigger="click">
                    <mark>{part}</mark> 
                </Popover>
              </span>
             : 
             <span key={i}>{part}</span>
         ))}
     </div>
    )
  }

  // const getSelectedText = async (e: any) => {
  //   // let seltext;
  //   // if (window.getSelection) {
  //   //   seltext=window.getSelection()?.toString();
  //   // } else if (document.getSelection) {
  //   //   seltext=document.getSelection()?.toString();
  //   // } else return;
  //   // setselectedText(seltext);
  //   // console.log(selectedText);
  // }

  const handleReplaceClick = ({ currentTarget: input }: any) => {
    let seltext;
    if (window.getSelection) {
      seltext=window.getSelection()?.toString();
    } else if (document.getSelection) {
      seltext=document.getSelection()?.toString();
    };

    if (seltext != "") {
      setShowReplacePopup(true);
      setSelection(seltext);
      setReplaceText(seltext);
      handleRepalceSubmit(name, seltext);
    } else {
      toast.info('Please select some text', {
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

  const handleReplace = () => {

    const content: any = searchData;
    const newContent = content.replace(selection, replace);
    console.log(newContent)
    setsearchData(newContent);
    setShowReplacePopup(false);
  };

  const handleRepalceSubmit = async (list: any, replaceText: any) => {
    setIsReplaceSpinner(true);
    setsearchDataRplc([]);
    const searchData = {
      userid: "",
      desc: replaceText,
      size: 0,
      keywords: "",
      tone: "professional",
    };
    const data = await apiService.contentPost(list, { searchData });
    setReplace(data.result);
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
      setsearchDataRplc(cleanArray);
    }
    setIsReplaceSpinner(false);
    setValidated(false);
  };

  const openSynmous = async (seltext: any) => {
    // console.log(seltext)
    setIsLoadingWord(true);
    if (seltext != "") {
      handleShow();
      setSelectionWord(seltext);
      const searchData = {
        word: seltext,
      };
      const data = await apiService.contentPost('getsyn', { searchData });
      // console.log(data);

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
        const cleanArray = data.response.filter((val: any) => val != " ");
        // console.log(cleanArray);
        setHashtagData(cleanArray);
      }
      setIsLoadingWord(false);

    } else {
      toast.info('Please select some text', {
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

  const handleCheck = async (seltext: any) => {
    const content: any = searchData;
    const newContent = content.replace(selectionWord, seltext);
    setsearchData(newContent);
    handleClose();
  };


  useEffect(() => {
    // fetchData();
  }, []);

  return (
    <React.Fragment>
      <PageTitleNew
        breadCrumbItems={[
          { label: "Writer Wizard", path: `/social/blogwizard`, active: true },
        ]}
        title='Writer Wizard'
        subtitle='Generate your wizard'
      />

      <Row className="blogwizard">
        <Col lg={12}>
          {/* <h5 className="header-title mb-3 mt-0">Nav Tabs</h5> */}
          <Row>
            <Col lg={12}>
              <Tab.Container defaultActiveKey="Edit">
                <Nav className="firsttab" as="ul" variant="tabs">
                  <Nav.Item as="li">
                    <Nav.Link style={{
                      color: "#4B4B5A !important"
                    }}>
                      <span className="d-block d-sm-none">
                        <i className="uil-envelope"></i>
                      </span>
                      <span className="d-none d-sm-block">Modes:</span>
                    </Nav.Link>
                  </Nav.Item>
                  {(tabContents || []).map((tab, index) => {
                    return (
                      <Nav.Item as="li" key={index} onClick={() => { _saveApiName(tab); }}>
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
                {/* <Tab.Content className="p-3 text-muted">
                                {(tabContents || []).map((tab, index) => {
                                    return (
                                        <Tab.Pane eventKey={tab.title} id={String(tab.id)} key={index}>
                                            <p>{tab.text}</p>
                                            <p className="mb-0">{tab.text2}</p>
                                        </Tab.Pane>
                                    );
                                })}
                            </Tab.Content> */}
              </Tab.Container>
            </Col>
            <Col lg={12}>
              <div className="mainsection">
                <SplitterLayout primaryIndex={0} percentage>
                  <div className="firstsection">
                    <Form
                      noValidate
                    ref={formRef}
                    validated={validated}
                    onSubmit={handleSubmit}
                    >
                      <Form.Group className="mb-3" controlId="validationCustom05">
                        <Form.Control
                          as="textarea"
                          key="desc"
                          name="desc"
                          rows={4}
                          onChange={handleChange}
                          value={postData.desc}
                          placeholder="Cretorial will rewrite your text. Start by writing or pasting something here and then press the Paraphrase button."
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a some input.
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Row>
                        <Col md={6}>
                          <p>{countWord} Words</p>
                        </Col>
                        <Col md={6}>
                          <Button variant="primary" type="submit" disabled={isSubmitting}>
                            {isSubmitting && (
                              <span className="spinner-border spinner-border-sm me-1"></span>
                            )}
                            {buttonName}
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                  <div className="secondsection">
                    {searchData.length > 0 && (
                      <>
                      <Highlighted text={searchData} highlight={selectedText} />

                       {/* <div className="h-200" onMouseUp={getSelectedText} onMouseDown={getSelectedText} dangerouslySetInnerHTML={{__html: searchData}}></div> */}
                        <Row>
                          <Col md={6}>
                            <p className="words">{countWordRes} Words</p>
                          </Col>
                          <Col md={6}>
                            {/* <p className="words">{countWordRes} Words</p> */}
                              <ButtonGroup className="me-1" onClick={(e) => {_copyText(e, searchData);}}>
                                <OverlayTrigger
                                  placement={"left"}
                                  overlay={
                                      <Tooltip id={`tooltip-left`}>
                                          Copy Full Text
                                      </Tooltip>
                                  }>
                                   <i className="uil uil-copy me-1"></i>
                                </OverlayTrigger>
                               
                              </ButtonGroup>

                              <ButtonGroup className="me-1" onClick={handleReplaceClick}>
                                <Button className="btn btn-secondary btn-sm">Rephrase</Button>
                              </ButtonGroup>
                              {/* 
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
                              </ButtonGroup> */}
                          </Col>
                        </Row>
                      </>
                    )}
                   
                  </div>
                </SplitterLayout>
              </div>
            </Col>
            <Col lg={12}>
              <Row>
                <Col md={2}>
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
                </Col>
                <Col md={4}>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column lg={2} htmlFor="example-number">
                      Size
                    </Form.Label>
                    <Col lg={1}>
                    <p className="mt-1">0</p>
                    </Col>
                    <Col lg={7}>
                      <Form.Range className="mt-2" min={1} max={1000} name="size" onChange={handleChange} value={postData.size} />
                    </Col>
                    <Col lg={1}>
                    <p className="mt-1">1000</p>
                    </Col>
                  </Form.Group>
                </Col>
                <Col md={5}>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column lg={5} htmlFor="example-number">
                      Additional Keywords
                    </Form.Label>
                    <Col lg={6}>
                      <Form.Control id="example-number" type="text" name="keywords" onChange={handleChange}  />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>

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
                          handleRepalceSubmit(tab.apiname, replaceText);
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

      <Modal show={show} onHide={handleClose}>
          <Modal.Header onHide={handleClose} closeButton>
              <Modal.Title as="h5">Change Words</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* {isLoadingWord &&(
              <div className="clearfix text-center">
                <Spinner className="m-2" color="primary">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )} */}
            {hashtagData?.map((item, i) => {
              return <span key={`inline-${i}`}>
                <Button className={`me-2 mb-2`} variant="outline-primary" onClick={() => handleCheck(item)}>{item}</Button>
              </span>
            })}
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
    </React.Fragment>
  );
};

export default BlogWizard;