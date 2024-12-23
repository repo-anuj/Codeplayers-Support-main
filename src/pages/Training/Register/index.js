import React from "react";
import { useDispatch,useSelector } from "react-redux";
import CPBreadCrumbReporting from "../../../Components/CPComponents/CPLayouts/CPBreadCrumbReporting";
import { useState,useEffect } from "react";
import { Container,Row,Col } from "reactstrap";
import CPMasterRegisterTable from "../../../Components/CPComponents/CPDashboard/CPMasterRegisterTable";
import { GET_TrainingDashboard } from "../../../slices/thunks";
import moment from "moment";
const SupportRegister=()=>{
    const dispatch = useDispatch();
    const data = useSelector((state) => state.TrainingDashboard.data);
    const loading = useSelector((state) => state.TrainingDashboard.loading);
    const success = useSelector((state) => state.TrainingDashboard.success);
    const dataRecords = data;

    const today = new Date();
    const storedRange = JSON.parse(sessionStorage.getItem("selectedRange"));
    const [selectedRange, setSelectedRange] = useState([null, null]);

    const dateChange = (newRange) => {
        if (newRange.length === 2) {
            setSelectedRange(newRange);
            sessionStorage.setItem("selectedRange", JSON.stringify(newRange));

            dispatch(
                GET_TrainingDashboard({
                    FromDate: moment(newRange[0]).format("YYYY-MM-DD"),
                    ToDate: moment(newRange[1]).format("YYYY-MM-DD"),
                })
            );
        }
    };

    useEffect(() => {
        const initialRange = storedRange
            ? [new Date(storedRange[0]), new Date(storedRange[1])]
            : [today, today];

        if (selectedRange && selectedRange.length === 2) {
            if (selectedRange[0] === null) {
                dateChange(initialRange);
            }
        }
    }, [selectedRange]);


    return(
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <CPBreadCrumbReporting
                        title="Support Register"
                        pageTitle="Data"/>
                    <Row className="mt-3">
                        <Col xs="12">
                            <div className="table-container" style={{ padding: "10px" }}>
                                {loading ? (
                                    <p className="text-muted">Loading table data...</p>
                                ) : (
                                    <CPMasterRegisterTable dataFromAPI={dataRecords?.record || []} />

                                )}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}
export default SupportRegister;