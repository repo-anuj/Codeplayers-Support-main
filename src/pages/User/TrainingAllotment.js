import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Input, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
    GET_AllotedTraining,
    GET_TrainingTask,
    POST_AllotTraining,
} from "../../slices/User/TraningAllotment/thunk";
import { GET_ListModule} from "../../slices/User/Combo/ModuleCombo/thunk"
import { GET_ListUser } from "../../slices/User/Combo/UserCombo/thunk";
import CPBreadCrumbMasters from "../../Components/CPComponents/CPLayouts/CPBreadCrumbMasters";


const TrainingAllotment = () => {
    const dispatch = useDispatch();

    // TrainingTask data
    const data = useSelector((state) => state.TraningTask.data);
    const loading = useSelector((state) => state.TraningTask.loading);
    const success = useSelector((state) => state.TraningTask.success);

    // Module data
    const moduleData = useSelector((state) => state.ListModule.data);
    const moduleLoading = useSelector((state) => state.ListModule.loading);
    const moduleSuccess = useSelector((state) => state.ListModule.success);

    // User data
    const userData = useSelector((state) => state.ListUser.data);
    const userLoading = useSelector((state) => state.ListUser.loading);
    const userSuccess = useSelector((state) => state.ListUser.success);

    // Alloted data
    const allotedData = useSelector((state) => state.TraningTask.allotedData);
    const allotedDataLoading = useSelector((state) => state.TraningTask.loading);
    const allotedDataSuccess = useSelector((state) => state.TraningTask.success);

    const [user, setUser] = useState("");
    const [module, setModule] = useState("");
    const [selectedRows, setSelectedRows] = useState([]);
    const [userTaskData, setUserTaskData] = useState({ SubUserID: "", TaskID: [] });

    // Modal state
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    useEffect(() => {
        dispatch(GET_TrainingTask());
        dispatch(GET_ListModule());
        dispatch(GET_ListUser());
    }, [dispatch]);

    const toggleModal = () => setModalOpen(!modalOpen);

    const handleUserChange = (e) => {
        const selectedUserID = e.target.value;
        setUser(selectedUserID);
        setUserTaskData({ SubUserID: selectedUserID, TaskID: userTaskData.TaskID || [] });
    };

    const handleModuleChange = (e) => setModule(e.target.value);

    const handleSelectAllChange = (e) => {
        if (!data) return;
        const allTaskIDs = data.map((item) => item.TaskID);
        if (e.target.checked) {
            setSelectedRows(allTaskIDs);
            setUserTaskData((prev) => ({ ...prev, TaskID: allTaskIDs }));
        } else {
            setSelectedRows([]);
            setUserTaskData((prev) => ({ ...prev, TaskID: [] }));
        }
    };

    const handleRowChange = (e, taskId) => {
        const updatedSelectedRows = e.target.checked
            ? [...selectedRows, taskId]
            : selectedRows.filter((id) => id !== taskId);

        setSelectedRows(updatedSelectedRows);
        setUserTaskData((prev) => ({ ...prev, TaskID: updatedSelectedRows }));
    };

    const handleSubmit = () => {
        if (!userTaskData.SubUserID) {
            setModalMessage("Please select a user.");
            setModalOpen(true);
            return;
        }

        dispatch(GET_AllotedTraining(userTaskData.SubUserID));
    };



    const [showRemoveButton, setShowRemoveButton] = useState(false);

    useEffect(() => {
        if (userTaskData.TaskID.length === 0 || !allotedData) return;

        const matchedTaskIDs = userTaskData.TaskID.filter((taskID) =>
            allotedData.includes(taskID)
        );

        console.log("matchedIDs");
        console.log(matchedTaskIDs);

        // Function to get matching Task Names based on TaskID
        function getMatchingTaskNames(x, y) {
            // Filter the data to find matching TaskIDs
            const matchedTasks = x.filter(task => y.includes(task.TaskID));
            return matchedTasks;
        }

        // Get the matching task objects
        const matchedTasked = getMatchingTaskNames(data, matchedTaskIDs);

        if (matchedTaskIDs.length > 0) {
            setShowRemoveButton(true);  // Show the Remove button
            setModalMessage(
                <div>
                    <p>This training(s) are already allotted:</p>
                    <div style={{
                        maxHeight: "50vh",
                        overflowY: "auto",
                        position: "relative",
                    }}>
                        <Table striped bordered>
                            <thead style={{
                                position: "sticky",
                                top: 0,
                                background: "#fff",
                                zIndex: 1,
                            }}>
                                <tr>
                                    <th>Menu Type</th>
                                    <th>Menu Name</th>
                                    <th>Task Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {matchedTasked.map((task) => (
                                    <tr key={task.TaskID}>
                                        <td>{task.MenuType}</td>
                                        <td>{task.MenuName}</td>
                                        <td>{task.TaskName}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            );
            setModalOpen(true);
        } else {
            console.log("Submitting the following data:", userTaskData);
            // Uncomment below for actual submission
            dispatch(POST_AllotTraining(userTaskData));

            setUser("");  // Reset the user
            setModule("");  // Reset the module
            setSelectedRows([]);  // Reset selected rows
            setUserTaskData({ SubUserID: "", TaskID: [] });  // Reset userTaskData

            // Optionally reset modal message
            setModalMessage("Training successfully allotted.");
        }
    }, [allotedData]);



    const handleRemoveAllotedTasks = () => {
        // Calculate matchedTaskIDs
        const matchedTaskIDs = userTaskData.TaskID.filter((taskID) =>
            allotedData.includes(taskID)
        );

        // Filter out the matchedTaskIDs from selectedRows
        const updatedSelectedRows = selectedRows.filter(
            (taskId) => !matchedTaskIDs.includes(taskId)
        );

        // Filter out the matchedTaskIDs from userTaskData.TaskID
        const updatedTaskIDs = userTaskData.TaskID.filter(
            (taskId) => !matchedTaskIDs.includes(taskId)
        );

        // Update the selectedRows and userTaskData state
        setSelectedRows(updatedSelectedRows);
        setUserTaskData((prev) => ({ ...prev, TaskID: updatedTaskIDs }));

        // Close the modal
        toggleModal();

        // Log to check if the removal was successful
        console.log("Updated selected rows:", updatedSelectedRows);
        console.log("Updated userTaskData:", updatedTaskIDs);
        console.log("Updated userTaskData:", userTaskData);
    };

    useEffect(() => {
        console.log("Updated userTaskData2:", userTaskData);
    }, [userTaskData]); // This will run whenever userTaskData changes



    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <CPBreadCrumbMasters title="Training Allotment" pageTitle="Data" />

                    {/* User and Module Dropdowns */}
                    <Row className="mt-4">
                        <Col md={6}>
                            <label htmlFor="userDropdown">User</label>
                            <Input
                                type="select"
                                id="userDropdown"
                                value={user}
                                onChange={handleUserChange}
                            >
                                <option value="">Select User</option>
                                {userData?.length > 0
                                    ? [...new Map(userData.map(item => [item.Name, item])).values()].map((user) => (
                                        <option key={user.SubUserID} value={user.SubUserID}>
                                            {user.Name}
                                        </option>
                                    ))
                                    : <option disabled>No Users Available</option>}
                            </Input>
                        </Col>

                        <Col md={6}>
                            <label htmlFor="moduleDropdown">Module</label>
                            <Input
                                type="select"
                                id="moduleDropdown"
                                value={module}
                                onChange={handleModuleChange}
                            >
                                <option value="">Select Module</option>
                                {moduleData?.length > 0
                                    ? Array.from(new Set(moduleData.map((item) => item.Module))).map(
                                        (moduleName) => (
                                            <option key={moduleName} value={moduleName}>
                                                {moduleName}
                                            </option>
                                        )
                                    )
                                    : <option disabled>No Modules Available</option>}
                            </Input>
                        </Col>
                    </Row>

                    {/* Time Table Section */}
                    <Row className="mt-4">
                        <Col md={12}>
                            <h5>Time Table</h5>
                            {loading && <p>Loading...</p>}
                            {success && data?.length > 0 && (
                                <div
                                    style={{
                                        maxHeight: "50vh",
                                        overflowY: "auto",
                                        position: "relative",
                                    }}
                                >
                                    <Table striped bordered>
                                        <thead
                                            style={{
                                                position: "sticky",
                                                top: 0,
                                                background: "#fff",
                                                zIndex: 1,
                                            }}
                                        >
                                            <tr>
                                                <th>
                                                    <Input
                                                        type="checkbox"
                                                        onChange={handleSelectAllChange}
                                                        checked={data && selectedRows.length === data.length}
                                                    />
                                                    Select All
                                                </th>
                                                <th>Menu Type</th>
                                                <th>Menu Name</th>
                                                <th>Task Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data
                                                .filter((item) => !module || item.Module === module)
                                                .map((item) => (
                                                    <tr key={item.TaskID}>
                                                        <td>
                                                            <Input
                                                                type="checkbox"
                                                                checked={selectedRows.includes(item.TaskID)}
                                                                onChange={(e) => handleRowChange(e, item.TaskID)}
                                                            />
                                                        </td>
                                                        <td>{item.MenuType}</td>
                                                        <td>{item.MenuName}</td>
                                                        <td>{item.TaskName}</td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </Table>
                                </div>
                            )}
                            {!loading && success && data?.length === 0 && <p>No tasks available</p>}
                        </Col>
                    </Row>

                    {/* Submit Button */}
                    <Row className="mt-4">
                        <Col md={12} className="text-center">
                            <Button color="primary" className="w-100" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </Container>

                {/* Modal for Feedback */}
                <Modal isOpen={modalOpen} toggle={toggleModal}>
                    <ModalHeader toggle={toggleModal}>Information</ModalHeader>
                    <ModalBody>{modalMessage}</ModalBody>
                    <ModalFooter className="d-flex justify-content-around w-100">
                        <Button color="primary" className="w-50" onClick={toggleModal}>
                            Close
                        </Button>
                        {showRemoveButton && user && (
                            <Button color="primary" onClick={handleRemoveAllotedTasks}>
                                Remove Alloted Tasks
                            </Button>
                        )}
                    </ModalFooter>

                </Modal>
            </div>
        </React.Fragment>
    );
};

export default TrainingAllotment;
