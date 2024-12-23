import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Spinner,
  Alert,
  Badge,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { GET_PRODUCT_ORDER_HISTORY } from "../../../slices/Products/History/thunk";

const History = () => {
  const dispatch = useDispatch();

  // Fetch the data on component mount
  useEffect(() => {
    dispatch(GET_PRODUCT_ORDER_HISTORY());
  }, [dispatch]);

  const data = useSelector((state) => state.ProductHistory.data);
  const loading = useSelector((state) => state.ProductHistory.loading);
  const error = useSelector((state) => state.ProductHistory.error);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Product License History" pageTitle="History" />
          <Row>
            <Col lg={12}>
              {loading ? (
                <div className="text-center my-4">
                  <Spinner color="primary" />
                </div>
              ) : error ? (
                <Alert color="danger">{error}</Alert>
              ) : data?.length ? (
                <Row>
                  {data.map((item, index) => (
                    <Col lg={4} md={6} key={index} className="mb-4">
                      <Card className="shadow-sm">
                        <CardHeader className="bg-primary text-white">
                          <h5 className="mb-0 text-white">{item.Product}</h5>
                          <small className="text-light">
                            {new Date(item.IssueDate).toLocaleDateString()} -{" "}
                            {new Date(item.ValidTill).toLocaleDateString()}
                          </small>
                        </CardHeader>
                        <CardBody>
                          <Row className="mb-2">
                            <Col xs={6}>
                              <strong>License Number:</strong>
                            </Col>
                            <Col xs={6}>{item.LicenseNumber}</Col>
                          </Row>
                          <Row className="mb-2">
                            <Col xs={6}>
                              <strong>Licensed To:</strong>
                            </Col>
                            <Col xs={6}>{item.LicenseTo}</Col>
                          </Row>
                          <Row className="mb-2">
                            <Col xs={6}>
                              <strong>Edition:</strong>
                            </Col>
                            <Col xs={6}>
                              <Badge color="success">{item.Edition}</Badge>
                            </Col>
                          </Row>
                          <Row className="mb-2">
                            <Col xs={6}>
                              <strong>User Type:</strong>
                            </Col>
                            <Col xs={6}>{item.UserType}</Col>
                          </Row>
                          <Row className="mb-2">
                            <Col xs={6}>
                              <strong>License Mode:</strong>
                            </Col>
                            <Col xs={6}>
                              <Badge color="info">{item.LicenseMode}</Badge>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <Alert color="info">No license history available.</Alert>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default History;
