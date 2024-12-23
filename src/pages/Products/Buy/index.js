import React from "react";
import { Products } from "./ProudctsData";
import { Container, Row, Col } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

const Buy = () => {
  const navigate = useNavigate();

  // Define handleProductClick within the Buy component
  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title={"History"}/>
          <Row>
            {Products.map((item) => (
              <Col
                key={item.id}
                lg={4}
                className={"product-item " + (item.isClass || "")}
              >
                <div
                  className="card explore-box card-animate"
                  onClick={() => handleProductClick(item)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="bookmark-icon position-absolute top-0 end-0 p-2">
                    <button
                      type="button"
                      className="btn btn-icon active"
                      data-bs-toggle="button"
                      aria-pressed="true"
                    >
                      <i className="mdi mdi-cards-heart fs-16"></i>
                    </button>
                  </div>
                  <div className="explore-place-bid-img">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="card-img-top explore-img"
                    />
                    <div className="bg-overlay"></div>
                    <div className="place-bid-btn">
                      <Link to="#!" className="btn btn-success">
                        <i className="ri-auction-fill align-bottom me-1"></i>{" "}
                        Place Bid
                      </Link>
                    </div>
                  </div>
                  <div className="card-body">
                    <p className="fw-medium mb-0 float-end">
                      <i className="mdi mdi-heart text-danger align-middle"></i>{" "}
                      {item.likes}
                    </p>
                    <h5 className="mb-1">{item.name}</h5>
                    <p className="text-muted mb-0">{item.category}</p>
                  </div>
                  <div className="card-footer border-top border-top-dashed">
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1 fs-14">
                        <i className="ri-price-tag-3-fill text-warning align-bottom me-1"></i>{" "}
                        Highest: <span className="fw-medium">{item.highest}</span>
                      </div>
                      <h5 className="flex-shrink-0 fs-14 text-primary mb-0">
                      ₹ {item.price}
                      </h5>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Buy;
