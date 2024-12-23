import React, { useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import FeatherIcon from "feather-icons-react";

const NotificationModal = ({ isOpen, toggle, notification }) => {
  const [loading, setLoading] = useState(false);
  const [approvedSuccess, setapprovedSuccess] = useState(null);

  const handleApproved = async () => {
    setLoading(true);
    setapprovedSuccess(null);
    console.log("button clicked");
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalBody>
        <div className="d-flex align-items-center">
          <FeatherIcon icon="plus-circle" />
          <div className="ms-3 flex-grow-1">
            <h5 className="fs-16 mb-1">
              {notification ? notification.notificationTitle : "Loading..."}
            </h5>
            <p className="text-muted mb-0">
              {notification ? notification.notificationSubTitle : ""}
            </p>
          </div>
        </div>

        <table className="table table-borderless" style={{ fontSize: "14px" }}>
          <tbody>
            <tr>
              <td className="p-3 align-top" style={{ fontSize: "15px" }}>
                <table className="table table-borderless mb-0">
                  <tbody>
                    <tr>
                      <td className="p-2" style={{ fontSize: "13px" }}>
                        <h6 style={{ marginBottom: "2px", fontSize: "14px" }}>
                          {notification
                            ? notification.notificationTitle
                            : "Title"}
                        </h6>
                        <p
                          style={{
                            marginBottom: "2px",
                            fontSize: "13px",
                            color: "#878a99",
                          }}
                        >
                          {notification
                            ? notification.notificationDescription
                            : "Description"}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="mt-3 pt-2">
          {/* <CPSubmitButton
            onSave={handleApproved}
            loading={loading}
            saveSuccess={approvedSuccess}
          /> */}
        </div>
      </ModalBody>
    </Modal>
  );
};

export default NotificationModal;
