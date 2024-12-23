import React from "react";
import RecentOrders from "./RecentOrders";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Container } from "reactstrap";
const QuotationRegister = () => {
  return (
    <React.Fragment>
          <div className="page-content">
            <Container fluid>
             <BreadCrumb title={"Quotation Register"} pageTitle={"Quotation Register"} />
             <RecentOrders />
        </Container>
      </div>
    </React.Fragment>
    

  );
};

export default QuotationRegister;
