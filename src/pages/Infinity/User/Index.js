import React, { useState, useEffect } from "react";
import { Spinner } from "reactstrap";
import UserRegisterModal from "./UserRegisterModal"; // Adjust import path accordingly
import { useDispatch, useSelector } from "react-redux";
import { GET_USER_Data } from "../../../slices/Infinity/User/Data/thunk";
import { PATCH_USER_Data } from "../../../slices/Infinity/User/Register/thunk";
import DataTable from "../../../Components/CPComponents/CPDashboard/CPDataTable";

const Users = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const data = useSelector((state) => state.UserData.data);
    const loading = useSelector((state) => state.UserData.loading);
    const error = useSelector((state) => state.UserData.error);
    const dispatch = useDispatch();


    console.log(data);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    // Automatically fetch data when component mounts
    useEffect(() => {
        dispatch(GET_USER_Data());
    }, [dispatch]);


    const handleRowUpdate = (updatedRow) => {
        console.log(updatedRow);
        dispatch(PATCH_USER_Data(updatedRow))
            .then((response) => {
                console.log("Row updated successfully:", response);
            })
            .catch((error) => {
                console.error("Error updating row:", error);
            });
    };

    const columns = [
        { label: "Name", key: "Name" },
        { label: "WhatsApp Number", key: "WhatsappNumber" },
        { label: "Email ID", key: "EmailID" },
        {
            label: "Status",
            key: "IsActive",
            render: (row) =>
                row.IsActive === "True" ? (
                    <span className="badge bg-success">Active</span>
                ) : (
                    <span className="badge bg-danger">Inactive</span>
                ),
        },
        { label: "Role", key: "UserRole" },
    ];

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100vh",
                justifyContent: "center",
                textAlign: "center",
                padding: "20px", // Add some padding for spacing
            }}
        >
            {/* <h2>Users</h2> */}

            {/* Conditional rendering for feedback */}
            {loading && <Spinner color="primary" />}
            {error && (
                <div className="alert alert-danger" role="alert">
                    Failed to load data. Please try again.
                </div>
            )}

            {/* Table container with increased size */}
            {!loading && data && data.length > 0 ? (
                <div
                    style={{
                        width: "80%", // Adjust table width (80% of the container width)
                        maxWidth: "1200px", // Optional: Limit max table width
                        overflowX: "auto", // Handle horizontal overflow gracefully
                        margin: "20px 0", // Spacing around the table
                    }}
                >
                    <DataTable
                        data={data}
                        columns={columns}
                        heading={"Users"}
                        onUpdate={handleRowUpdate}
                        style={{
                            fontSize: "1.1rem", // Increase font size for better readability
                            padding: "10px", // Add padding for cells
                        }}

                    />
                </div>
            ) : (
                !loading && <p>No data available</p>
            )}

            {/* Registration modal */}
            <div style={{ marginBottom: "20px" }}>
                <button
                    className="btn btn-success"
                    onClick={toggleModal}
                >
                    Open Registration
                </button>
            </div>
            <UserRegisterModal isOpen={isModalOpen} toggle={toggleModal} />
        </div>
    );

};

export default Users;
