import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";

import {
  Row,
  Col,
  Card,
  Button,
  Alert,
  Form,
  ButtonGroup,
} from "react-bootstrap";
// components 
import PageTitle from "../../components/PageTitle";
import Select, { components } from "react-select";
import "./socia.css";
import * as apiService from "../../services";
// styles
import "easymde/dist/easymde.min.css";
import Spinner from "../../components/Spinner";
import { slice } from "lodash";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-tagsinput/react-tagsinput.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Fade from "react-reveal/Fade";

import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

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

const SearchSlogans = () => {
  const { id, name } = useParams<RouteParams>();
  const [searchResults, setSearchResults] = useState([]);

  const styles = {
    alignItems: "center",
    justifyContent: "center",
  };

  const searchSlogan = async (event: any) => {
    //console.log(event.target.value);
    const response = await apiService.searchSlogans(event.target.value);
    let output: any = [];
    for (var i = 0; i < response.Output.length; i++) {
      output.push(response.Output[i]);
    }
    setSearchResults(output);
  };

  // for results

  const [words, setWords] = useState([]);
  const [countWords, setCountWords] = useState(0);
  const [spinner, setSpinner] = useState(true);
  const [post, setPost] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [index, setIndex] = useState(10);
  const initialPosts = slice(post, 0, index);
  const [subCatName, setSubCatName] = useState("");
  const [tonality, setTonality] = useState([]);
  const [filterCategory, setFilterCategory] = useState([]);
  const [tonalityChecked, setTonalityChecked] = useState([]);
  const [wordChecked, setWordChecked] = useState([]);
  const [categoryChecked, setCategoryChecked] = useState([]);
  //const [contextual, setContextual] = useState(false);
  let contextual = false;
  const getCategoryData = async (categoryid: any) => {
    //alert(contextual)
    setIndex(10);
    setPost([]);
    setSpinner(true);
    // category results
    const res = await apiService.getCategoryResultFromFrank(
      name,
      0,
      contextual,
      "",
      "",
      "",
      categoryChecked.length > 0 ? categoryChecked.join(",") : ""
    );
    setPost(res.result.Cards);

    const tonality = await apiService.tonality();
    const allTonality: any = [];
    for (var i = 0; i < tonality.data.length; i++) {
      allTonality.push(tonality.data[i].name);
    }
    setTonality(allTonality);

    const category = await apiService.filterCategory();
    setFilterCategory(category.result.data);

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

  const _copyText = (e: any, text: any) => {
    var textField = document.createElement("textarea");
    textField.innerHTML = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    const currentButton = e.target;
    if (currentButton.innerText === "Copy") {
      currentButton.innerHTML = `Copied`;
      // toast("Wow so easy !");
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

  useEffect(() => {
    if (id == "1") {
      getCategoryData(0);
    }
    loadWordCounts();
  }, [id]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const savePost = async (e: any, value: any) => {
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
  const handleCategoryCheck = (event: any) => {
    let value: String = event.target.value;
    const updatedList: any = [...categoryChecked];  

    if (event.target.checked) {
      updatedList.push(value);
    } else {
      updatedList.splice(updatedList.indexOf(value), 1);
    }
    setCategoryChecked(updatedList);
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
    setCategoryChecked([]);
    apply();
  };
  const apply = async () => {
    setSpinner(true);
    const res = await apiService.getCategoryResultFromFrank(
      name,
      0,
      contextual,
      subCatName,
      tonalityChecked.join(","),
      wordChecked.join(","),
      categoryChecked.length > 0 ? categoryChecked.join(",") : ""
    );
    setPost(res.result.Cards);
    setSpinner(false);
  };
  const _clearResults = () => {
    setSearchResults([]);
  };
  let history = useHistory();
  const redirect = (event: any) => {
    if (event.key === "Enter") {
      _clearResults();
      history.push("/social/search-slogans/1/" + event.target.value);
    }
  };

  const switchFilter = (e: any, id: any) => {
    if (e.target.checked == true) {
      contextual = true;
      getCategoryData(id);
    } else {
      contextual = false;
      getCategoryData(id);
    }
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

  const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
    },
  }));

  return (
    <>
      <React.Fragment>
        {id == "0" && (
          <>
            {/* <PageTitle
              breadCrumbItems={[
                {
                  label: "Search Slogans by Keyword",
                  path: `/social/search-slogans`,
                },
                { label: name, path: `/social/search-slogans`, active: true },
              ]}
              title={"Search Slogans by Keyword"}
            /> */}

            <Row className="h-150">
              <Col lg={12}>
                <h6
                  style={{
                    textAlign: "center",
                    position: "relative",
                    top: "60%",
                  }}
                >
                  Search expressions and matching hashtags using millions of
                  keywords
                </h6>
              </Col>
            </Row>
            <Row style={styles}>
              <Col lg={8}>
                <Form.Control
                  name="slogan"
                  type="text"
                  placeholder="Search expression and slogans"
                  onChange={searchSlogan}
                  onKeyPress={redirect}
                />
                {searchResults.length > 0 && (
                  <Card className="scroll-card">
                    <Card.Body className="m-t-m-16">
                      {searchResults.map((item, index) => {
                        return (
                          <div className={index == 0 ? "" : "border-top"}>
                            <Link
                              onClick={() => _clearResults()}
                              to={"/social/search-slogans/1/" + item}
                            >
                              {" "}
                              <h4 className="fs-15">{item}</h4>{" "}
                            </Link>
                          </div>
                        );
                      })}
                    </Card.Body>
                  </Card>
                )}
              </Col>
            </Row>
          </>
        )}

        {id == "1" && (
          <>
            {/* <PageTitle
              breadCrumbItems={[]}
              title={"Search Results / " + name}
            /> */}
            {/* <Row>
                <Col lg={8}>
                  <p>Search results garden</p>
                </Col>
                <Col lg={4}></Col>
              </Row> */}

            <Row>
              <Col lg={8}>
                <div className="row" style={{ marginTop: "30px" }}>
                  <div className="col-md-4">
                    <p>
                      Search results
                      <span style={{ fontWeight: "bold" }}> &#62; </span>
                      <span style={{ fontWeight: "bold" }}>{name}</span>
                    </p>
                  </div>
                  <div className="col-md-4"></div>
                  <div className="col-md-4">
                    <div className="row">
                      <div className="col-md-8" style={{ textAlign: "end" }}>
                        <p>Keyword Match</p>
                      </div>
                      <div className="col-md-2">
                        <Form>
                          <Form.Check
                            type="switch"
                            id="custom-switch"
                            onClick={(e) => {
                              switchFilter(e, id);
                            }}
                          />
                        </Form>
                      </div>
                      <div className="col-md-2">
                        <BootstrapTooltip title="Keep this on if you want to get exact search matches. Turn it off to expand your search and get more creative results.">
                          <i
                            className="uil-info-circle me-1"
                            data-toggle="tooltip"
                            data-placement="bottom"
                          ></i>
                        </BootstrapTooltip>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={4}>
                {!spinner && (
                  <Card>
                    <Card.Body>
                      <Row>
                        <Col className="text-left mt-1 col-2">
                          <label>Filters</label>
                        </Col>
                        <Col className="col-5">
                          <button
                            className="width-sm btn-style"
                            onClick={clear}
                          >
                            Clear
                          </button>
                        </Col>
                        <Col className="col-5">
                          <button
                            className={
                              tonalityChecked.length == 0 &&
                                wordChecked.length == 0 &&
                                categoryChecked.length == 0
                                ? "width-sm btn-disable-style"
                                : "width-sm btn-style"
                            }
                            onClick={apply}
                            disabled={
                              tonalityChecked.length == 0 &&
                                wordChecked.length == 0 &&
                                categoryChecked.length == 0
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
                )}
              </Col>
            </Row>

            <Row>
              <Col lg={8}>
                <>
                  {spinner && (
                    <div className="text-center">
                      <Spinner className="m-2" color="primary">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </div>
                  )}
                  {!spinner &&
                    initialPosts.map((item, key) => {
                      let text: string = item["Quote"];
                      let newText =
                        text != null ? text.split("\n").join(" ") : "";
                      return (
                        <>
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
                                        {item["Hashtag"] == null
                                          ? ""
                                          : item["Hashtag"]}
                                      </Card.Text>

                                      <ButtonGroup
                                        className="ms-2 me-1"
                                        onClick={(e) => {
                                          _copyText(
                                            e,
                                            item["Quote"] +
                                            "\n\n" +
                                            item["Hashtag"]
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
                                            item["Quote"] +
                                            "\n\n" +
                                            item["Hashtag"]
                                          );
                                        }}
                                      >
                                        <Button className="btn btn-soft-secondary btn-sm">
                                          <i
                                            className="uil uil-heart-alt me-1"
                                            style={{ fontStyle: "unset" }}
                                          >Save</i>
                                        </Button>
                                      </ButtonGroup>
                                    </Card.Body>
                                  </Col>
                                </Row>
                              </Card>
                            </Fade>
                          </div>
                        </>
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
                      We haven’t found great suggestions for your search term.
                      We are continuously training the system to suit your
                      needs. Meanwhile, feel free to enter another search term
                      to find your expression.
                    </h5>
                  )}
                </>
              </Col>

              <Col lg={4}>
                <>
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
                            <Tab label="Category" {...a11yProps(1)} />
                            <Tab label="Words" {...a11yProps(2)} />
                          </Tabs>
                          <TabPanel value={value} index={0}>
                            {tonality.map((item, index) => (
                              <div className="form-check">
                                <input
                                  checked={
                                    tonalityChecked.includes(item)
                                      ? true
                                      : false
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
                            {filterCategory.map((item, index) => (
                              <div className="form-check">
                                <input
                                  checked={
                                    categoryChecked.includes(
                                      item["categoryName"]
                                    )
                                      ? true
                                      : false
                                  }
                                  onClick={handleCategoryCheck}
                                  type="checkbox"
                                  className="form-check-input"
                                  value={item["categoryName"]}
                                  id={`task-${item["categoryName"]}`}
                                />
                                {item["categoryName"]}
                              </div>
                            ))}
                          </TabPanel>
                          <TabPanel value={value} index={2}>
                            {words.map((item, index) => (
                              <div className="form-check">
                                <input
                                  checked={
                                    wordChecked.includes(item["word_id"])
                                      ? true
                                      : false
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
                </>
              </Col>
            </Row>
          </>
        )}
      </React.Fragment>
    </>
  );
};

export default SearchSlogans;
