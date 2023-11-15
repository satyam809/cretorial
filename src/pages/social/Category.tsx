import React, { useEffect, useState, useRef, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import Fade from "react-reveal/Fade";
import { toast } from "react-toastify";

import {
  Row,
  Col,
  Card,
  Button,
  Alert,
  Form,
  Accordion,
  useAccordionButton,
  AccordionContext,
  ButtonGroup,
} from "react-bootstrap";
import SimpleMDEReact from "react-simplemde-editor";
import { slice } from "lodash";
import PageTitle from "../../components/PageTitle";
import Spinner from "../../components/Spinner";
import * as apiService from "../../services";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classNames from "classnames";
// styles
import "easymde/dist/easymde.min.css";
import { FormInput, VerticalForm } from "../../components";
import "./socia.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface RouteParams {
  id: string;
  name: string;
}
interface ContentType {
  id: number;
  title: string;
  icon?: string;
  data: any;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const Category = () => {
  const [words, setWords] = useState([]);

  const { id, name } = useParams<RouteParams>();
  const [spinner, setSpinner] = useState(true);

  const [post, setPost] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [index, setIndex] = useState(10);
  const initialPosts = slice(post, 0, index);
  const [subCategory, setSubCategory] = useState([]);

  const [subCatName, setSubCatName] = useState("");

  const [tonality, setTonality] = useState([]);
  const [tonalityChecked, setTonalityChecked] = useState([]);
  const [wordChecked, setWordChecked] = useState([]);

  //alert(localStorage.getItem("usersession"));

  const getCategoryData = async (categoryid: any) => {
    setIsCompleted(false);
    setIndex(10);
    setPost([]);
    setSpinner(true);
    // category results
    const res = await apiService.getCategoryResultFromCategory(
      "",
      categoryid,
      true,
      "",
      "",
      "",
      ""
    );
    setPost(res.result.Cards);
    // sub category
    const subCtaegoryResponse = await apiService.businessSubCategory(
      categoryid
    );
    setSubCategory(subCtaegoryResponse.result.Subcategories);

    const tonality = await apiService.tonality();
    const allTonality: any = [];
    for (var i = 0; i < tonality.data.length; i++) {
      allTonality.push(tonality.data[i].name);
    }
    setTonality(allTonality);

    const allWord: any = [];
    allWord.push({ word_id: "1-5", word_name: "1-5" });
    allWord.push({ word_id: "6-10", word_name: "6-10" });
    allWord.push({ word_id: "11-20", word_name: "11-20" });
    allWord.push({ word_id: "21-30", word_name: "21-30" });
    allWord.push({ word_id: ">30", word_name: ">30" });
    setWords(allWord);

    setSpinner(false);
  };

  const loadMore = () => {
    setIndex(index + 10);
    if (index >= post.length) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };
  const [activeTab, setActiveTab] = useState("tab1");
  // const handleTabClick = (e:any,item:any) => {
  //   e.preventDefault();
  //   setActiveTab(item);
  // };
  const _loadSubCategoryData = async (e: any, id: any, subCatName: any) => {
    //e.preventDefault();
    setActiveTab(subCatName);
    setSubCatName(subCatName);
    setSpinner(true);
    // category results
    const res = await apiService.getCategoryResultFromCategory(
      "",
      id,
      true,
      subCatName,
      "",
      "",
      ""
    );
    setPost(res.result.Cards);
    setSpinner(false);
  };
  const _copyText = (e: any, text: any) => {
    //alert(text);
    var textField = document.createElement("textarea");
    textField.innerHTML = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    const currentButton = e.target;
    //console.log(currentButton.innerHTML);
    if (currentButton.innerText === "Copy") {
      currentButton.innerHTML = `Copied`;
      toast.success("Copy to clipboard", {
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
  const savePost = async (e: any, value: any) => {
    console.log(value);
    const data = await apiService.saveCategoryPost("attitude", value);
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

  useEffect(() => {
    getCategoryData(id);
    loadWordCounts();
  }, [id]);

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6.5,
    slidesToScroll: 3.5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1980,
        settings: {
          slidesToShow: 5.5,
          slidesToScroll: 3.5,
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4.5,
          slidesToScroll: 3.5,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 3.5,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2.5,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1.5,
        },
      },
    ],
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleTonalityCheck = (event: any) => {
    let value: String = event.target.value;
    const updatedList: any = [...tonalityChecked];

    if (event.target.checked) {
      updatedList.push(value);
    } else {
      updatedList.splice(updatedList.indexOf(value), 1);
    }
    setTonalityChecked(updatedList);
  };

  const handleWordCheck = (event: any) => {
    let value: String = event.target.value;
    const updatedList: any = [...wordChecked];

    if (event.target.checked) {
      updatedList.push(value);
    } else {
      updatedList.splice(updatedList.indexOf(value), 1);
    }
    setWordChecked(updatedList);
  };

  const clear = () => {
    setTonalityChecked([]);
    setWordChecked([]);
    apply();
  };
  const apply = async () => {
    setSpinner(true);
    const res = await apiService.getCategoryResultFromCategory(
      "",
      id,
      true,
      subCatName,
      tonalityChecked.join(","),
      wordChecked.join(","),
      ""
    );
    setPost(res.result.Cards);
    setSpinner(false);
  };
  // word count
  async function loadWordCounts() {
    let countTitleWords: number[] = [];
    initialPosts.map((item, key) => {
      let text: string = item["Quote"];
      let newText = text != null ? text.split("\n").join(" ") : "";
      countTitleWords.push(newText.split(" ").length);
    });
    let totalWords = 0;
    countTitleWords.forEach((element) => (totalWords += element));
    if (totalWords > 0) {
      //alert(totalWords);
      const data = await apiService.wordCountPost(name, totalWords);
      if (data.Message) {
        // toast.success(data.Message, {
        //   position: "top-right",
        //   autoClose: 1000,
        //   hideProgressBar: true,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        // });
      }
    }
  }
  return (
    <React.Fragment>
      {/* <PageTitle
        breadCrumbItems={[
          {
            label: "Personal Category",
            path: `/social/category/${id}/${name}`,
          },
          { label: name, path: `/social/category/${id}/${name}`, active: true },
          { label: subCatName, path: `/social/category/${id}/${name}` },
        ]}
        title={name}
      /> */}

      <Row>
        <Col lg={12}>
          {spinner && (
            <div className="text-center">
              <Spinner className="m-2" color="primary">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
        </Col>
      </Row>

      {!spinner && (
        // <Row className="stickyRow">
        <Row>
          <Col lg={8} className="_left-12">
            <Card>
              <Card.Body>
                {!spinner && (
                  <div>
                    <Slider {...settings}>
                      {subCategory.map((item) => {
                        return (
                          <div>
                            {/* <Button
                              variant="primary"
                              className="width-lg"
                              onClick={() => _loadSubCategoryData(id, item)}
                            >
                              {item}
                            </Button> */}
                            {/* <button className="width-sm btn-style" onClick={() => _loadSubCategoryData(id, item)}>{item}</button> */}
                            <button
                              className={`width-sm ${activeTab == item
                                ? "btn-changeStyle"
                                : "btn-style"
                                }`}
                              onClick={(e) => _loadSubCategoryData(e, id, item)}
                            >
                              {item}
                            </button>
                          </div>
                        );
                      })}
                    </Slider>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} className="_left-25">
            <Card>
              <Card.Body>
                <Row className="custom-padding">
                  <Col className="text-left mt-1 col-2">
                    <label>Filters</label>
                  </Col>
                  <Col className="col-5">
                    {/* <ButtonGroup>
                      <Button
                        className="btn btn-soft-secondary btn-sm"
                        onClick={clear}
                      >
                        Clear
                      </Button>
                    </ButtonGroup> */}
                    <button className="width-sm btn-style" onClick={clear}>
                      Clear
                    </button>
                  </Col>
                  <Col className="col-5">
                    {/* <ButtonGroup>
                      <Button
                        className={className}
                        onClick={apply}
                      >
                        Apply
                      </Button>
                    </ButtonGroup> */}
                    <button
                      className={
                        tonalityChecked.length == 0 && wordChecked.length == 0
                          ? "width-sm btn-disable-style"
                          : "width-sm btn-style"
                      }
                      onClick={apply}
                      disabled={
                        tonalityChecked.length == 0 && wordChecked.length == 0
                          ? true
                          : false
                      }
                    >
                      Apply
                    </button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      <Row>
        <Col lg={8}>
          {!spinner && (
            <>
              {initialPosts.map((item, key) => {
                let text: string = item["Quote"];
                let newText = text != null ? text.split("\n").join(" ") : "";
                return (
                  <div className="animation-block" key={key}>
                    <Fade top>
                      <Card key={item["ID"]}>
                        <Row className="g-0 align-items-center">
                          <Col md={12}>
                            <Card.Body>
                              <Card.Title as="h5" className="fs-16">
                                {newText}
                              </Card.Title>
                              <Card.Text className="text-muted">
                                {item["Hashtag"] == null ? "" : item["Hashtag"]}
                              </Card.Text>

                              <ButtonGroup
                                className="ms-2 me-1"
                                onClick={(e) => {
                                  _copyText(
                                    e,
                                    item["Quote"] + "\n\n" + item["Hashtag"]
                                  );
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
                                  savePost(
                                    e,
                                    item["Quote"] + "\n\n" + item["Hashtag"]
                                  );
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
                            </Card.Body>
                          </Col>
                        </Row>
                      </Card>
                    </Fade>
                  </div>
                );
              })}

              {!spinner && initialPosts.length > 9 && (
                <div className="d-grid mt-3 mb-5">
                  {isCompleted ? (
                    <button
                      onClick={() => {
                        getCategoryData(id);
                      }}
                      type="button"
                      className="btn btn-danger"
                    >
                      Magic Shuffle
                    </button>
                  ) : (
                    <button
                      onClick={loadMore}
                      type="button"
                      className="btn btn-danger"
                    >
                      Load More +
                    </button>
                  )}
                </div>
              )}

              {!spinner && initialPosts.length == 0 && (
                <h5 className="mt-4 pt-4">
                  We haven’t found great suggestions for your search term. We
                  are continuously training the system to suit your needs.
                  Meanwhile, feel free to enter another search term to find your
                  expression.
                </h5>
              )}
            </>
          )}
        </Col>

        <Col lg={4}>
          {!spinner && (
            <Card>
              <Card.Body>
                <Box
                  sx={{
                    flexGrow: 1,
                    bgcolor: "background.paper",
                    display: "flex",
                  }}
                >
                  <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: "divider" }}
                  >
                    <Tab label="Tonality" {...a11yProps(0)} />
                    <Tab label="Words" {...a11yProps(1)} />
                  </Tabs>
                  <TabPanel value={value} index={0}>
                    {tonality.map((item, index) => (
                      <div className="form-check new-form-check">
                        <input
                          checked={
                            tonalityChecked.includes(item) ? true : false
                          }
                          onClick={handleTonalityCheck}
                          type="checkbox"
                          className="form-check-input"
                          value={item}
                          id={`task-${item}`}
                        />{" "}
                        {item}
                      </div>
                    ))}
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    {words.map((item, index) => (
                      <div className="form-check new-form-check">
                        <input
                          checked={
                            wordChecked.includes(item["word_id"]) ? true : false
                          }
                          onClick={handleWordCheck}
                          type="checkbox"
                          className="form-check-input"
                          value={item["word_id"]}
                          id={`task-${item["word_name"]}`}
                        />
                        {item["word_name"]}
                      </div>
                    ))}
                  </TabPanel>
                </Box>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Category;
