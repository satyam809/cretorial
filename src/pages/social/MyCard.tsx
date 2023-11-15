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

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// styles
import "easymde/dist/easymde.min.css";

import "./socia.css";

interface RouteParams {
  id: string;
  name: string;
}

const MyCard = () => {
  const { id, name } = useParams<RouteParams>();
  const [spinner, setSpinner] = useState(true);

  const [card, setCard] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [index, setIndex] = useState(10);
  const initialPosts = slice(card, 0, index);

  const _getMyCard = async () => {
    let mycard = await apiService.fetchMyCard();

    setCard(mycard.data);

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
      // toast("Wow so easy !");
    }
  };

  const loadMore = () => {
    //alert(index);
    setIndex(index + 10);
    if (index >= card.length) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };

  useEffect(() => {
    _getMyCard();
  }, []);

  //   const _getMyCard = async () => {
  //     let mycard = await apiService.fetchMyCard();
  //     setCard(mycard.data);
  //   };

  return (
    <React.Fragment>
      <PageTitle
        breadCrumbItems={[
          {
            label: "My Card",
            path: `/social/mycard`,
          },
        ]}
        title={name}
      />

      <Row>
        <Col lg={12}>
          {!spinner && (
            <>
              {initialPosts.map((item, index) => {
                // let text: string = item["value"];
                // let newText = text != null ? text.split("\n").join("</br>") : '';
                return (
                  <div className="animation-block">
                    <Fade top>
                      <Card>
                        <Row className="g-0 align-items-center">
                          <Col md={12}>
                            <Card.Body>
                              <Card.Title
                                as="h5"
                                className="fs-16"
                              ></Card.Title>
                              <Card.Text className="text-muted">
                                {item["value"]}
                              </Card.Text>

                              <ButtonGroup className="ms-2 me-1">
                                <Button
                                  className="btn btn-soft-secondary btn-sm"
                                  onClick={(e) => {
                                    _copyText(e, item["value"]);
                                  }}
                                >
                                  <i
                                    className="uil uil-copy me-1"
                                    style={{ pointerEvents: "none" }}
                                  />
                                  <span>Copy</span>
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
                    <button type="button" className="btn btn-danger">
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
                <h5 className="mt-4 pt-4 text-center">No saved post</h5>
              )}
            </>
          )}
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default MyCard;
