import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, CardBody } from "reactstrap";
import { FaPen } from "react-icons/fa";

const DataTable = ({ data, columns, heading, onUpdate }) => {
    const [editableData, setEditableData] = useState(data || []);
    const [editRowIndex, setEditRowIndex] = useState(null);
    
    useEffect(() => {
        setEditableData(data || []);
    }, [data]);

    const handleInputChange = (rowIndex, key, value) => {
        const updatedData = editableData.map((item, index) =>
            index === rowIndex ? { ...item, [key]: value } : item
        );
        setEditableData(updatedData);
    };

    const saveEdit = () => {
        if (onUpdate && editRowIndex !== null) {
            const updatedRow = editableData[editRowIndex];
            console.log("Updated Row Before Sending to Parent:", updatedRow); // Log updated row
            onUpdate(updatedRow); // Pass updated row to parent
        }
        setEditRowIndex(null);
    };

    const renderHeaders = () => (
        <>
            {columns.map((col, index) => (
                <th key={index} scope="col">
                    {col.label}
                </th>
            ))}
            <th scope="col">Actions</th>
        </>
    );

    const renderRows = () =>
        editableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
                {columns.map((col, colIndex) => (
                    <td key={colIndex}>
                        {editRowIndex === rowIndex ? (
                            <input
                                type="text"
                                value={row[col.key]}
                                onChange={(e) =>
                                    handleInputChange(rowIndex, col.key, e.target.value)
                                }
                                className="form-control"
                            />
                        ) : col.render ? (
                            col.render(row)
                        ) : (
                            row[col.key]
                        )}
                    </td>
                ))}
                <td>
                    {editRowIndex === rowIndex ? (
                        <button
                            className="btn btn-sm btn-success"
                            onClick={saveEdit}
                        >
                            Save
                        </button>
                    ) : (
                        <button
                            className="btn btn-sm"
                            onClick={() => setEditRowIndex(rowIndex)}
                        >
                            <FaPen />
                        </button>
                    )}
                </td>
            </tr>
        ));

    return (
        <React.Fragment>
            <Card>
                <CardHeader className="align-items-center d-flex">
                    <h4 className="card-title mb-0 flex-grow-1">{heading}</h4>
                </CardHeader>
                <CardBody>
                    <div className="table-responsive table-card">
                        <table className="table table-borderless table-centered align-middle table-nowrap mb-0">
                            <thead className="text-muted table-light">
                                <tr>{renderHeaders()}</tr>
                            </thead>
                            <tbody>
                                {editableData.length > 0 ? (
                                    renderRows()
                                ) : (
                                    <tr>
                                        <td colSpan={columns.length + 1} className="text-center">
                                            No data available
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

DataTable.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            key: PropTypes.string.isRequired,
            render: PropTypes.func,
        })
    ).isRequired,
    heading: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired,
};

export default DataTable;
