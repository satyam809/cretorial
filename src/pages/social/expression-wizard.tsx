import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
import FeatherIcon from "feather-icons-react";
import Modal from "react-bootstrap/Modal";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import FileUploader from "../../components/FileUploader";
import { transpileModule } from "typescript";
import axios from "axios";
import mainPhoto from "../../assets/images/main_photo.png";

import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { toast } from "react-toastify";
import Compressor from "compressorjs";

interface RouteParams {
  id: string;
  name: string;
}

interface OptionTypes {
  id: number | string;
  value: string;
  label: string;
}

const Search = () => {
  const inputRef = useRef(null);

  let no_of_see_tags = 1;

  const { id, name } = useParams<RouteParams>();
  const [spinner, setSpinner] = useState(false);
  // for tag input see, feep and cocepts
  const [seeSelections, setSeeSelections] = useState([]);
  const [feelSelections, setFeelSelections] = useState([]);
  const [conceptsSelections, setConceptsSelections] = useState([]);

  // after find expression for display card
  const [post, setPost] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [index, setIndex] = useState(10);
  const initialPosts = slice(post, 0, index);
  const [editorQuote, setEditorQuote] = useState("");

  const notInclude = [
    "no person",
    "one",
    "social connection",
    "two",
    "transportation system",
    "many",
    "unlabeled",
  ];

  const onChangeSeeSelection = (selected: any) => {
    const lastItem = selected[selected.length - 1];
    if (notInclude.includes(lastItem)) {
      selected.pop();
      setSeeSelections(selected);
    }
    setSeeSelections(selected);
  };
  const onChangeFeelSelection = (selected: any) => {
    const lastItem = selected[selected.length - 1];
    if (notInclude.includes(lastItem)) {
      selected.pop();
      setFeelSelections(selected);
    }
    setFeelSelections(selected);
  };
  const onChangeConceptsSelection = (selected: any) => {
    const lastItem = selected[selected.length - 1];
    if (notInclude.includes(lastItem)) {
      selected.pop();
      setConceptsSelections(selected);
    }
    setConceptsSelections(selected);
  };

  async function handleChange(file: any) {
    setPost([]);
    setSeeSelections([]);
    setFeelSelections([]);
    setConceptsSelections([]);
    if (file[0] != undefined) {
      //console.table(file[0]);

      new Compressor(file[0], {
        height: 200,
        quality: 0.4,
        beforeDraw: () => {
          //alert("test");
          let parentElement = document.getElementsByClassName(
            "dropzone"
          )[0] as HTMLElement;

          //   let html = `<div className="text-center">
          //   <Spinner className="m-2" color="primary">
          //     <span className="visually-hidden">
          //       Loading...
          //     </span>
          //   </Spinner>
          // </div>`;

          //   parentElement.innerHTML += html;
          //$(".dropzone").append(``);
          setSpinner(true);
        },
        success: (compressedResult) => {
          //console.table(compressedResult);
          sendImageData(compressedResult);
        },
      });
      //setSpinner(false);
    }
  }
  async function sendImageData(compressedResult: any) {
    const res = await apiService.clarifyPost(compressedResult);
    //console.log(res);
    const seeOptions: any = [];
    for (let i = 0; i < no_of_see_tags; i++) {
      if (!notInclude.includes(res[i].name)) {
        seeOptions.push(res[i].name);
      }
    }
    setSeeSelections(seeOptions);
    const feelConceptResponse = await apiService.feelConcepts(
      Array.prototype.map
        .call(seeOptions, function (item) {
          return item;
        })
        .join(",")
    );

    const feelOptions: any = [];
    const conceptsOptions: any = [];
    for (let i = 0; i < feelConceptResponse.length; i++) {
      for (let j = 0; j < feelConceptResponse[i].Feel.length; j++) {
        //console.log(feelConceptResponse[i].Feel[j])
        if (!notInclude.includes(feelConceptResponse[i].Feel[j])) {
          feelOptions.push(feelConceptResponse[i].Feel[j]);
        }
      }
      for (let j = 0; j < feelConceptResponse[i].Concept.length; j++) {
        if (!notInclude.includes(feelConceptResponse[i].Concept[j])) {
          conceptsOptions.push(feelConceptResponse[i].Concept[j]);
        }
      }
    }

    setFeelSelections(feelOptions);
    setConceptsSelections(conceptsOptions);

    setSpinner(false);
  }

  async function handleChange1(file: any) {
    handleChange(file.target.files);
  }

  const findMyExpresson = async () => {
    setSpinner(true);
    const response = await apiService.findMyExpression(
      Array.prototype.map
        .call(seeSelections, function (item) {
          return item;
        })
        .join(","),
      Array.prototype.map
        .call(feelSelections, function (item) {
          return item;
        })
        .join(","),
      Array.prototype.map
        .call(conceptsSelections, function (item) {
          return item;
        })
        .join(",")
    );

    setSpinner(false);
    setPost(response.data);
  };
  const changePhoto = (event: any) => {
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = (e) => {
      handleChange1(e);
    };
    input.click();
  };

  const loadMore = () => {

    setIndex(index + 10);
    if (index >= post.length) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
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
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (quote: any) => {
    setEditorQuote(quote);

    setShow(true);
  };

  useEffect(() => {
    _getWizardLogic();
    loadWordCounts();
  });
  const _getWizardLogic = async () => {
    const response = await apiService.getWizardLogic();
    no_of_see_tags = response.data.wizards_tags_logic.no_of_see_tags;
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

      const data = await apiService.wordCountPost("Express Wizard", totalWords);
      if (data.Message) {
        //alert(data.Message)
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
    <>
      <React.Fragment>
        {/* <PageTitle
          breadCrumbItems={[
            {
              label: "Expression Wizard",
              path: `/social/expression-wizard`,
            },
            { label: name, path: `/social/expression-wizard`, active: true },
          ]}
          title={"Expression Wizard"}
        /> */}
        <div className="row">
          <div className="col-md-6">
            <h2 style={{ fontSize: "larger" }}>Photo Expression Wizard</h2>
            <p>
              Get ideas for perfect expressions and hashtags for your photos
              using AI. Be more creative and viral-ready
            </p>
          </div>
        </div>
        <Row>
          <Col lg={6}>
            <Card>
              <Card.Body>
                <FileUploader
                  onFileUpload={(event) => {
                    handleChange(event);
                  }}
                />
              </Card.Body>

              {/* <Row>
                <Col lg={12}>
                  <div className="clearfix text-center mt-3 mb-3">
                    <Button variant="danger" onClick={changePhoto}>
                      Change Photo
                    </Button>

                  </div>
                </Col>
              </Row> */}
            </Card>
          </Col>
          <Col lg={6}>
            <Card>
              <Card.Body>
                {/* display card area */}
                <div>

                  {(() => {
                    if (initialPosts.length > 0) {
                      return (
                        <>
                          {initialPosts.map((item) => {
                            let text: string = item["Quote"];
                            let newText =
                              text != null ? text.split("\n").join(" ") : "";

                            return (
                              <Card key={item["ID"]}>
                                <Row className="g-0 align-items-center">
                                  <Col md={12}>
                                    <Card.Body>
                                      <Card.Title as="h5" className="fs-16">
                                        {/* {item["Quote"] == null ? "" : item["Quote"]} */}
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
                                          <i className="uil uil-copy me-1" style={{ fontStyle: "unset" }}>Copy</i>
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
                                          <i className="uil uil-heart-alt me-1" style={{ fontStyle: "unset" }}>Save</i>
                                        </Button>
                                      </ButtonGroup>
                                    </Card.Body>
                                  </Col>
                                </Row>
                              </Card>
                            );
                          })}

                          {initialPosts.length > 0 && (
                            <div className="d-grid mt-3 mb-5">
                              {isCompleted ? (
                                <></>
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
                        </>
                      )
                    } else if (!spinner && initialPosts.length == 0 &&
                      feelSelections.length == 0 &&
                      conceptsSelections.length == 0 &&
                      initialPosts.length == 0) {
                      return (<>
                        <img src={mainPhoto} className="w-100"></img>
                      </>)
                    } else {
                      return (<>
                        <div>
                          <p className="mb-1 mt-3 fw-bold">
                            {" "}
                            <i className="uil uil-eye me-1"></i> What do you see
                            on the photo?
                          </p>

                          <TagsInput
                            value={seeSelections}
                            onChange={onChangeSeeSelection}
                            inputProps={{
                              placeholder: "Add Keywords",
                            }}
                          />
                        </div>

                        <div>
                          <p className="mb-1 mt-3 fw-bold">
                            <i className="uil uil-smile-dizzy me-1"></i> What do
                            you feel?
                          </p>

                          <TagsInput
                            value={feelSelections}
                            onChange={onChangeFeelSelection}
                            inputProps={{
                              placeholder: "Add Keywords 1",
                            }}
                          />
                        </div>

                        <div>
                          <p className="mb-1 mt-3 fw-bold">
                            <i className="uil  uil-lightbulb me-1"></i> What
                            concepts do you have in mind?
                          </p>

                          <TagsInput
                            value={conceptsSelections}
                            onChange={onChangeConceptsSelection}
                            inputProps={{
                              placeholder: "Add Keywords",
                            }}
                          />
                        </div>

                        {spinner && (
                          <div className="text-center">
                            <Spinner className="m-2" color="primary">
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </Spinner>
                          </div>
                        )}

                        {!spinner && (
                          <div className="clearfix text-center mt-3">
                            <Button variant="danger" onClick={findMyExpresson}>
                              Find My Expresson
                            </Button>
                          </div>
                        )}
                      </>)
                    }


                  })()}


                </div>




              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Preview the text that will appear on the photo
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <textarea className="form-control">{editorQuote}</textarea>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Next
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    </>
  );
};

export default Search;
