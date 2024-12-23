import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import CPComboBox from "./../CPInputs/CPComboBox"; // Import CPComboBox component

const CPMasterRegisterTable = ({ dataFromAPI, onSave }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const statusOptions = [
    { primaryKey: "pending", mainColumn: "Pending" },
    { primaryKey: "inProgress", mainColumn: "In Progress" },
    { primaryKey: "done", mainColumn: "Done" },
  ];

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "done":
        return "badge bg-success-subtle text-success";
      case "pending":
        return "badge bg-danger-subtle text-danger";
      default:
        return "badge bg-warning-subtle text-warning";
    }
  };

  const handleRowClick = (row) => {
    setSelectedRow({ ...row }); // Create a copy of the row to edit
    setModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedRow((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (value) => {
    setSelectedRow((prev) => ({ ...prev, Status: value }));
  };

  const handleSaveChanges = () => {
    if (onSave) {
      onSave(selectedRow); // Pass updated data to parent
    }
    setModalOpen(false);
  };

  return (
    <React.Fragment>
      <Card>
        <CardHeader className="align-items-center d-flex">
          <h4 className="card-title mb-0 flex-grow-1">Master Register</h4>
        </CardHeader>

        <CardBody>
          <div className="table-responsive table-card">
            <table className="table table-borderless table-centered align-middle table-nowrap mb-0">
              <thead className="text-muted table-light">
                <tr>
                  <th scope="col">Module</th>
                  <th scope="col">Menu</th>
                  <th scope="col">Sub Module</th>
                  <th scope="col">Form</th>
                  <th scope="col">Task</th>
                  <th scope="col">Date</th>
                  <th scope="col">Deadline</th>
                  <th scope="col">Status</th>
                  <th scope="col">Client Remarks</th>
                  <th scope="col">Codeplayer Remarks</th>
                </tr>
              </thead>
              <tbody>
                {(Array.isArray(dataFromAPI) ? dataFromAPI : []).map((row, key) => (
                  <tr
                    key={key}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleRowClick(row)}
                  >
                    <td>{row.Module || "N/A"}</td>
                    <td>{row.Menu || "N/A"}</td>
                    <td>{row["SubModule"] || "N/A"}</td>
                    <td>{row.Form || "N/A"}</td>
                    <td>{row.Task || "N/A"}</td>
                    <td>{row.Date || "N/A"}</td>
                    <td>{row.Deadline || "N/A"}</td>
                    <td>
                      <span className={getStatusClass(row.Status)}>
                        {row.Status || "Pending"}
                      </span>
                    </td>
                    <td>{row["Client Remarks"] || "N/A"}</td>
                    <td>{row["Codeplayer Remarks"] || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      {/* Modal for Editing */}
      {selectedRow && (
        <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
          <ModalHeader toggle={() => setModalOpen(!modalOpen)}>Edit Details</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="deadline">Deadline</Label>
                <Input
                  type="date"
                  name="Deadline"
                  id="deadline"
                  value={selectedRow.Deadline || ""}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="status">Status</Label>
                <CPComboBox
                  labelTitle="Status"
                  choicesFromApi={statusOptions}
                  id="status"
                  value={selectedRow.Status || ""}
                  onChange={handleStatusChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="clientRemarks">Client Remarks</Label>
                <Input
                  type="text"
                  name="Client Remarks"
                  id="clientRemarks"
                  value={selectedRow["Client Remarks"] || ""}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="codeplayerRemarks">Codeplayer Remarks</Label>
                <Input
                  type="text"
                  name="Codeplayer Remarks"
                  id="codeplayerRemarks"
                  value={selectedRow["Codeplayer Remarks"] || ""}
                  disabled
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
            <Button color="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </React.Fragment>
  );
};

export default CPMasterRegisterTable;
