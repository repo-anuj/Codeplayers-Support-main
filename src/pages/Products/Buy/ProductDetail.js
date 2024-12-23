import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardTitle,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  Badge,
} from "reactstrap";
import classnames from "classnames";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
const ProductDetail = () => {
  const location = useLocation();

  // Retrieve product data from location state or from localStorage if available
  const storedProduct = JSON.parse(localStorage.getItem("productData"));
  const initialProduct = location.state?.product || storedProduct || {};

  const [product, setProduct] = useState(initialProduct);
  const [customActiveTab, setcustomActiveTab] = useState("1");

  // Store product data in localStorage to persist across page refreshes
  useEffect(() => {
    if (product?.id) {
      localStorage.setItem("productData", JSON.stringify(product));
    }
  }, [product]);

  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };

  return (
    <div className="page-content">
      <Container fluid >
        <BreadCrumb  title={"Product Detail"}/>
        <Row className="g-4">
          {/* Product Image */}
          <Col lg="6">
            <Card className="shadow-sm">
              <img
                src={product?.img || "placeholder.jpg"}
                alt={product?.name || "No Image Available"}
                className="card-img-top"
                style={{ borderRadius: "10px" }}
              />
            </Card>
          </Col>

          {/* Product Details */}
          <Col lg="6">
            <Card className="shadow-sm">
              <CardBody>
                <CardTitle tag="h2" className="mb-4">
                  {product?.name || "Product Name"}
                </CardTitle>
                <p className="text-muted mb-1">
                  <strong>Category:</strong> {product?.category || "N/A"}
                </p>
                <p className="mb-3">{product?.description || "No description available."}</p>
                <h4 className="text-primary mb-3">Price: ₹{product?.price || "N/A"}</h4>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <Badge color={product?.stock > 0 ? "success" : "danger"}>
                    {product?.stock > 0 ? `In Stock (${product?.stock})` : "Out of Stock"}
                  </Badge>
                  <Badge color="info">Rating: ⭐ {product?.rating || "N/A"}</Badge>
                </div>
                <Button color="primary" className="mt-3" disabled={product?.stock === 0}>
                  {product?.stock > 0 ? "Buy Now" : "Out of Stock"}
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Product Description Tabs */}
        <Row className="mt-5">
          <Col>
            <Card className="shadow-sm">
              <CardBody>
                <h5 className="fs-14 mb-3">Product Description:</h5>
                <Nav tabs className="nav-tabs-custom nav-success">
                  <NavItem>
                    <NavLink
                      className={classnames("nav-link", { active: customActiveTab === "1" })}
                      onClick={() => toggleCustom("1")}
                    >
                      <i className="mdi mdi-format-list-bulleted me-1"></i>Specification
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames("nav-link", { active: customActiveTab === "2" })}
                      onClick={() => toggleCustom("2")}
                    >
                      <i className="mdi mdi-information-outline me-1"></i>Details
                    </NavLink>
                  </NavItem>
                </Nav>

                <TabContent activeTab={customActiveTab} className="border border-top-0 p-4">
                  {/* Specifications Tab */}
                  <TabPane tabId="1">
                    <div className="table-responsive">
                      <table className="table table-striped mb-0">
                        <tbody>
                          <tr>
                            <th scope="row" style={{ width: "200px" }}>
                              Category
                            </th>
                            <td>{product?.category || "N/A"}</td>
                          </tr>
                          <tr>
                            <th scope="row">Brand</th>
                            <td>Tommy Hilfiger</td>
                          </tr>
                          <tr>
                            <th scope="row">Color</th>
                            <td>Blue</td>
                          </tr>
                          <tr>
                            <th scope="row">Material</th>
                            <td>Cotton</td>
                          </tr>
                          <tr>
                            <th scope="row">Weight</th>
                            <td>140 Gram</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </TabPane>

                  {/* Details Tab */}
                  <TabPane tabId="2">
                    <div>
                      <h5 className="font-size-16 mb-3">
                        Tommy Hilfiger Sweatshirt for Men (Pink)
                      </h5>
                      <p>
                        Tommy Hilfiger men striped pink sweatshirt. Crafted with
                        cotton. Material composition is 100% organic cotton. This is
                        one of the world’s leading designer lifestyle brands and is
                        internationally recognized for celebrating the essence of
                        classic American cool style, featuring preppy with a twist
                        designs.
                      </p>
                      <ul className="list-unstyled">
                        <li className="mb-2">
                          <i className="mdi mdi-circle-medium me-2 text-muted"></i>Machine Wash
                        </li>
                        <li className="mb-2">
                          <i className="mdi mdi-circle-medium me-2 text-muted"></i>Fit Type: Regular
                        </li>
                        <li className="mb-2">
                          <i className="mdi mdi-circle-medium me-2 text-muted"></i>100% Cotton
                        </li>
                        <li className="mb-0">
                          <i className="mdi mdi-circle-medium me-2 text-muted"></i>Long sleeve
                        </li>
                      </ul>
                    </div>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductDetail;
