import React, { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Button,
  Nav,
  Form,
  Tab,
} from "react-bootstrap";
import { toast } from "react-toastify";
import Select from 'react-select';

// components
import PageTitleNew from "../../components/PageTitleNew";
import * as apiService from "../../services";
import Spinner from '../../components/Spinner';

// styles
import "./socia.css";

interface TabContentType {
  id: number;
  title: string;
  icon?: string;
}

const tabContents: TabContentType[] = [
  {
      id: 1,
      title: 'Shape',
      icon: 'Word list',
  },
  {
      id: 2,
      title: 'Url',
      icon: 'uil-user'
  },
  {
      id: 3,
      title: 'Text',
      icon: 'uil-envelope'
  },
  {
    id: 4,
    title: 'Files',
    icon: 'uil-envelope'
  },
  {
    id: 5,
    title: 'Fonts',
    icon: 'uil-envelope'
  },
  {
    id: 6,
    title: 'Colors',
    icon: 'uil-envelope'
  }
];

const CreativeCloud = () => {
  // const { name } = useParams<RouteParams>();
  const [validated, setValidated] = useState<boolean>(false);
  const [validatedUrl, setValidatedUrl] = useState<boolean>(false);
  const [validatedText, setValidatedText] = useState<boolean>(false);
  const [validatedFile, setValidatedFile] = useState<boolean>(false);
  const [validatedFont, setValidatedFont] = useState<boolean>(false);
  const [isSubmitting, setIsLoading] = useState(false);
  const [isShow, setIsShow] = useState(true);
  const [searchData, setsearchData] = useState("");
  const [getTitleName, setTitleName] = useState("");
  const [getTitleCard, setTitleCard] = useState("");
  const [getDescPlace, setDescPlace] = useState("");
  const [shapeImage, setshapeImage] = useState("");
  const [shapeName, setshapeName] = useState("");
  const [iconShape, seticonShape] = useState([]);
  const [searchImage, setsearchImage] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [allFonts, setAllFonts] = useState([]);
  const [palleteFont, setpalleteFont] = useState("");
  const [palleteColor, setpalleteColort] = useState("#3FC9E7 #3FC9E7 #3FC9E7 #3FC9E7");
  const [responseString, setresponseString] = useState("");

  const formRef = useRef(null);
  const history = useHistory();
  const [postData, setData] = useState({
    searchres: "",
    url: "",
    import_word_text: "",
    user_id: "btlg_ravi.s",
    btm_icon_name: "",
    btm_icon_category: ""
  });

  const handleChange = ({ currentTarget: input }: any) => {
    // console.log(input.value);
    setData({ ...postData, [input.name]: input.value });
  };

  const onChanges = (e:any) => {
    setpalleteFont(e.value);
  }

  const handleChangeColor = ({ currentTarget: input }: any) => {
    // console.log(input.value);
    setpalleteColort(`${input.value} #3FC9E7 #3FC9E7 #3FC9E7`)
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
      setsearchData("");
      const searchData = postData;
      console.log(searchData);
      const data = await apiService.createCloud('searchbar-search-api',{ searchData });
      // // setIsShow(false);
      if (!data) {
        toast.info('Something Wrong', {
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
        setshapeImage(data.shape_image);
        setshapeName(data.shape_name);
        seticonShape(data.all_shapes);
        setresponseString(data.search_word);

        const shapeicon = await apiService.searchimage(postData.searchres);
        if(shapeicon){
          setsearchImage(shapeicon);
        }
      }

      setIsLoading(false);
      setValidated(false);

      console.log(data);
    }
  };

  const handleSubmitUrl = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidatedUrl(true);
      setIsLoading(false);
    } else {
      setsearchData("");
      const searchData = postData;
      const data = await apiService.createCloud('ajax-urlread-api',{ searchData });
      // // setIsShow(false);
      if (!data) {
        toast.info('Something Wrong', {
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
        setshapeImage(data.shape_image);
        setshapeName(data.shape_name);
        seticonShape(data.all_shapes);
      }

      setIsLoading(false);
      setValidatedUrl(false);
    }
  };

  const handleSubmitText = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidatedText(true);
      setIsLoading(false);
    } else {
      setsearchData("");
      const searchData = {
        user_id: "btlg_ravi.s",
        import_word_text: postData.import_word_text,
      };
      const data = await apiService.createCloud('ajax-importworddoc-api',{ searchData });
      // // setIsShow(false);
      if (!data) {
        toast.info('Something Wrong', {
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
        setshapeImage(data.shape_image);
        setshapeName(data.shape_name);
        seticonShape(data.all_shapes);
      }

      setIsLoading(false);
      setValidatedText(false);
    }
  };

  const handleSubmitFile = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidatedFile(true);
      setIsLoading(false);
    } else {
      setsearchData("");
      const searchData = {
        user_id: "btlg_ravi.s",
        filename: selectedFile
      };
      const data = await apiService.createCloud('ajax-importdoc-api',{ searchData });
      // // setIsShow(false);
      if (!data) {
        toast.info('Something Wrong', {
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
        setshapeImage(data.shape_image);
        setshapeName(data.shape_name);
        seticonShape(data.all_shapes);
      }

      setIsLoading(false);
      setValidatedFile(false);
    }
  };

  const handleSubmitFont = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidatedFile(true);
      setIsLoading(false);
    } else {
      setsearchData("");
      const searchData = {
        text_vartical: "0",
        pallete_font: palleteFont,
        design_pallete_color: palleteColor,
        user_id: "btlg_ravi.s",
        shape_name: "house-user.jpg",
        response_string: responseString,
        username: "Ravi"
      };
      const data = await apiService.createCloud('color-change-pallete-api',{ searchData });
      // // setIsShow(false);
      if (!data) {
        toast.info('Something Wrong', {
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
        setshapeImage(data.shape_image);
        setshapeName(data.shape_name);
        seticonShape(data.all_shapes);
      }

      setIsLoading(false);
      setValidatedFile(false);
    }
  };

  const getTitle = async () => {
    // setIsShow(true);
    // formRef.current.reset();
    getSubStatus();
    setIsLoading(false);
    setsearchData("");
    setTitleName("Creative Cloud");
    setTitleCard("Discover a world of creative text suggestions, hashtags, design elements and more!");
    setDescPlace("What would you like to search today?");
  };

  const getSubStatus = async () => {
    const data = await apiService.CaiShowSubsData();
    // console.log(data);
    if (data.Status != "Active") {
      history.push("/pages/pricing");
    }
  };

  const handleImagePreview = async (src:any) => {
    setIsLoading(true);
    postData.btm_icon_name = src.image_name;
    postData.btm_icon_category = src.image_category_id;
    const searchData = postData;
    console.log(searchData);
    const data = await apiService.shapeCloud({ searchData });
    if (!data) {
      toast.info('Something Wrong', {
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
      setshapeImage(data.shape_image);
      setshapeName(data.shape_name);
      seticonShape(data.all_shapes);
    }
    setIsLoading(false);
  }

  const styles = {
    alignItems: "center",
    justifyContent: "center",
  };

  const searchcreative = async (event: any) => {
    // console.log(event);
    // const response = await apiService.searchCreativ(event.target.value);
    setData({ ...postData, [event.target.name]: event.target.value });
    const response = await apiService.searchCreativCloud(event.target.value);
    // console.log(response.desing_new_layouts.length);
    let output: any = [];
    if (response.desing_new_layouts.length != 0) {
      for (var i = 0; i < response.desing_new_layouts.length; i++) {
        output.push(response.desing_new_layouts[i].words);
      }
    }
    // console.log(output)
    setSearchResults(output);
  };

  const redirect = (event: any) => {
    if (event.key === "Enter") {
      _clearResults(event.target.value);
    }
  };

  const _clearResults = async (text: any) => {
    setSearchResults([]);
    setIsLoading(true);
    const searchData = postData;
    postData.searchres = text;
    const data = await apiService.createCloud('searchbar-search-api',{ searchData });
    if (!data) {
      toast.info('Something Wrong', {
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
      setshapeImage(data.shape_image);
      setshapeName(data.shape_name);
      seticonShape(data.all_shapes);
      setresponseString(data.search_word);
      const shapeicon = await apiService.searchimage(postData.searchres);
      if(shapeicon){
        setsearchImage(shapeicon);
      }
      setIsLoading(false);
      setIsShow(false);
    }
    
  };

  const getFonts = async () => {
    const data = await apiService.fontsApi();
    const options = await data.map((item:any) => {
        return {
            label: item.font_name,
            value: item.font_name
        };
    });
    setAllFonts(options);
  }

  useEffect(() => {
    getTitle();
    getFonts();
  }, []);

  return (
    <React.Fragment>
      <PageTitleNew
        breadCrumbItems={[
          { label: "Creative Cloud", path: `/social/creativecloud` , active: true},
        ]}
        title={getTitleName}
        subtitle={getTitleCard}
      />
      {isShow ?
      <>
      <Row className="h-150">
        <Col lg={12}>
          <h6
            style={{
              textAlign: "center",
              position: "relative",
              top: "60%",
            }}
          >
            Search creative and matching hashtags using millions of
            keywords
          </h6>
        </Col>
      </Row>
      
      <Row style={styles}>
        <Col lg={8}>
          <Form.Control
            name="searchres"
            type="text"
            value={postData.searchres}
            placeholder={getDescPlace}
            onChange={searchcreative}
            onKeyPress={redirect}
          />
          {searchResults.length > 0 && (
            <Card className="scroll-card-new">
              <Card.Body className="m-t-m-16">
                {searchResults.map((item, index) => {
                  return (
                    <div className={index == 0 ? "" : "border-top"}>
                        <h4 className="fs-15" onClick={() => _clearResults(item)}>{item}</h4>{" "}
                    </div>
                  );
                })}
              </Card.Body>
            </Card>
          )}
           {isSubmitting && (
              <div className="text-center">
                <Spinner className="m-2" type="grow" color={"primary"}>
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}
        </Col>
      </Row>
      </>
      :
      <>
      <Row className="">
        <Col lg={8}>
          <Card>
            <Card.Body>
              <h4 className="header-title mb-2">{getTitleCard}</h4>
              {/* <p className="sub-header">
                                Provide valuable, actionable feedback to your users with HTML5 form validation–available in all
                                our supported browsers.
                            </p> */}
              <Row>
                <Col lg={10} className="mx-auto">
                  <Form
                    noValidate
                    ref={formRef}
                    validated={validated}
                    onSubmit={handleSubmit}
                  >
                    <div className="input-group">
                        <Form.Control
                          type="text"
                          name="searchres"
                          placeholder={getDescPlace}
                          onChange={handleChange}
                          value={postData.searchres}
                          required
                        />
                        <Button type="submit" className="input-group-text" disabled={isSubmitting}>
                          {/* {isSubmitting && (
                            <span className="spinner-border spinner-border-sm me-1"></span>
                          )} */}
                          Create
                        </Button>
                                                            
                        <Form.Control.Feedback type="invalid">
                          Please provide a Keyword.
                        </Form.Control.Feedback>
                    </div>
                  </Form>
                </Col>
                <Col lg={10} className="m-auto mt-2">
                  {isSubmitting && (
                    <div className="text-center">
                      <Spinner className="m-2" type="grow" color={"primary"}>
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </div>
                  )}
                  {shapeImage && (
                    <Card>
                      <Card.Body>
                        <div style={{
                            backgroundImage: `url(${shapeImage})`,
                            backgroundRepeat:'no-repeat',
                            minHeight: '500px',
                            backgroundSize: 'contain',
                            backgroundPosition: 'center'
                        }}>
                        </div>
                        <Row>
                        {(iconShape || []).map((icon:any, i) => {
                          return (
                              <Col className="text-center p-1" sm={1} key={i}>
                                <img src={icon['image_url']} alt="" className="img-thumbnail mb-2 hashtagimg" onClick={() => handleImagePreview(icon)} />
                              </Col>
                            );
                        })}
                        </Row>
                      </Card.Body>
                    </Card>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card>
              <Card.Body>
                  <h5 className="header-title mb-3 mt-0">Filters</h5>
                  <Tab.Container defaultActiveKey="Shape">
                    <Row>
                      <Col lg={4}>
                        <Nav className="d-inline-block border-bottom-0" as="ul" variant="tabs">
                            {(tabContents || []).map((tab, index) => {
                                return (
                                    <Nav.Item as="li" key={index}>
                                        <Nav.Link className="px-0" eventKey={tab.title}>
                                            <span className="d-block d-sm-none">
                                                <i className={tab.icon}></i>
                                            </span>
                                            <span className="d-none d-sm-block">{tab.title}</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                );
                            })}
                        </Nav>
                      </Col>
                      <Col lg={8}>
                        <Tab.Content className="rightside text-muted">
                            {(tabContents || []).map((tab, index) => {
                                return (
                                    <Tab.Pane eventKey={tab.title} id={String(tab.id)} key={index}>
                                        {tab.id === 1 ?
                                        <>
                                         <Row>
                                            {(searchImage || []).map((icon:any, i) => {
                                              return (
                                                    <Col className="text-center" sm={3} xl={3} key={i}>
                                                      <img src={icon['image_url']} alt="" className="img-thumbnail mb-2 hashtagimg" onClick={() => handleImagePreview(icon)} />
                                                    </Col>
                                                );
                                            })}
                                          </Row>
                                        </>
                                        : tab.id === 2 ?
                                        <>
                                          <Row>
                                            <Col lg={12}>
                                              <Form
                                                noValidate
                                                ref={formRef}
                                                validated={validatedUrl}
                                                onSubmit={handleSubmitUrl}
                                              >
                                                <Form.Group className="mb-3" controlId="validationCustom05">
                                                    <Form.Control
                                                      type="url"
                                                      name="url"
                                                      placeholder="Enter Your Url"
                                                      onChange={handleChange}
                                                      value={postData.url}
                                                      required
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                      Please provide a Keyword.
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                                <Button type="submit" className="input-group-text" disabled={isSubmitting}>
                                                    {/* {isSubmitting && (
                                                      <span className="spinner-border spinner-border-sm me-1"></span>
                                                    )} */}
                                                    Create
                                                  </Button>
                                              </Form>
                                            </Col>
                                          </Row>
                                        </>
                                        : tab.id === 3 ?
                                        <>
                                          <Row>
                                            <Col lg={12}>
                                              <Form
                                                noValidate
                                                ref={formRef}
                                                validated={validatedText}
                                                onSubmit={handleSubmitText}
                                              >
                                                <Form.Group className="mb-3" controlId="validationCustom05">
                                                    <Form.Control
                                                      as="textarea"
                                                      name="import_word_text"
                                                      placeholder="Enter Your Text"
                                                      onChange={handleChange}
                                                      value={postData.import_word_text}
                                                      required
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                      Please provide a Keyword.
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                                <Button type="submit" className="input-group-text" disabled={isSubmitting}>
                                                    {/* {isSubmitting && (
                                                      <span className="spinner-border spinner-border-sm me-1"></span>
                                                    )} */}
                                                    Create
                                                  </Button>
                                              </Form>
                                            </Col>
                                          </Row>
                                        </>
                                        : tab.id === 4 ?
                                        <>
                                          <Row>
                                            <Col lg={12}>
                                              <Form
                                                noValidate
                                                ref={formRef}
                                                validated={validatedFile}
                                                onSubmit={handleSubmitFile}
                                              >
                                                <Form.Group className="mb-3" controlId="validationCustom05">
                                                    <Form.Control type="file" name="filename" onChange={(e:any) => setSelectedFile(e.target.files[0])} required />
                                                    {/* <Form.Control
                                                      as="textarea"
                                                      name="import_word_text"
                                                      placeholder="Enter Your Text"
                                                      onChange={handleChange}
                                                      value={postData.import_word_text}
                                                      required
                                                    /> */}
                                                    <Form.Control.Feedback type="invalid">
                                                      Please provide a file.
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                                <Button type="submit" className="input-group-text" disabled={isSubmitting}>
                                                    {/* {isSubmitting && (
                                                      <span className="spinner-border spinner-border-sm me-1"></span>
                                                    )} */}
                                                    Create
                                                  </Button>
                                              </Form>
                                            </Col>
                                          </Row>
                                        </>
                                        : tab.id === 5 ?
                                        <>
                                          <Row>
                                            <Col lg={12}>
                                              <Form
                                                className="h-200"
                                                noValidate
                                                ref={formRef}
                                                validated={validatedFont}
                                                onSubmit={handleSubmitFont}
                                              >
                                                <Form.Group className="mb-3" controlId="validationCustom05">
                                                  <Select
                                                    className="react-select react-select-container"
                                                    classNamePrefix="react-select"
                                                    onChange={onChanges}
                                                    options={allFonts}></Select>

                                                    <Form.Control.Feedback type="invalid">
                                                      Please provide a file.
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                                <Button type="submit" className="input-group-text" disabled={isSubmitting}>
                                                    {/* {isSubmitting && (
                                                      <span className="spinner-border spinner-border-sm me-1"></span>
                                                    )} */}
                                                    Create
                                                  </Button>
                                              </Form>
                                            </Col>
                                          </Row>
                                        </>
                                        :
                                        <>
                                       <>
                                          <Row>
                                            <Col lg={12}>
                                              <Form
                                                className="h-200"
                                                noValidate
                                                ref={formRef}
                                                validated={validatedFont}
                                                onSubmit={handleSubmitFont}
                                              >
                                                <Form.Group className="mb-3" controlId="validationCustom05">
                                                    <Form.Control
                                                        id="example-color"
                                                        type="color"
                                                        name="color"
                                                        className="w-100"
                                                        defaultValue="#5369f8"
                                                        onChange={handleChangeColor}
                                                    />

                                                    <Form.Control.Feedback type="invalid">
                                                      Please provide a color.
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                                <Button type="submit" className="input-group-text" disabled={isSubmitting}>
                                                    {/* {isSubmitting && (
                                                      <span className="spinner-border spinner-border-sm me-1"></span>
                                                    )} */}
                                                    Create
                                                  </Button>
                                              </Form>
                                            </Col>
                                          </Row>
                                        </>
                                        </>
                                        }
                                    </Tab.Pane>
                                );
                            })}
                          </Tab.Content>
                      </Col>
                    </Row>
                  </Tab.Container>
              </Card.Body>
          </Card>
        </Col>
      </Row>
      </>
      }
    </React.Fragment>
  );
};

export default CreativeCloud;
