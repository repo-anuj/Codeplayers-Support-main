import React from "react";
import FeatherIcon from "feather-icons-react";

const IconsForVoucherType = (voucherType) => {
  switch (voucherType) {
    case "Outward Weighment":
      return (
        <FeatherIcon icon="minus-square" className="icon-dual-danger   icon-sm" />
      );
    case "Inward Weighment":
      return (
        <FeatherIcon icon="plus-square" className="icon-dual-success icon-sm" />
      );
    case "Internal Shifting":
      return (
        <FeatherIcon icon="shuffle" className="icon-dual-primary icon-sm" />
      );
    case "Purchase":
      return (
        <FeatherIcon icon="shopping-cart" className="icon-dual-info icon-sm" />
      );
    case "Sales":
      return (
        <FeatherIcon icon="dollar-sign" className="icon-dual-danger icon-sm" />
      );
    case "Recent Activity":
      return (
        <FeatherIcon icon="activity" className="icon-dual-danger icon-sm" />
      );
    case "Average Process Time":
      return <FeatherIcon icon="clock" className="icon-dual-danger icon-sm" />;
    // Add more cases as needed
    default:
      return (
        <FeatherIcon icon="file-text" className="icon-dual-secondary icon-sm" />
      );
  }
};

export default IconsForVoucherType;
