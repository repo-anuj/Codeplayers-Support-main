import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardHeader, Col, Row } from 'reactstrap';
import CountUp from "react-countup";
import { GET_MainDashboard } from '../../../../slices/thunks';
import { createSelector } from "reselect";
import { Link } from 'react-router-dom';

const DataOverview = () => {
    const dispatch = useDispatch();

    const selectLayoutState = (state) => state.ERPDashboard;

    const userprofileData = createSelector(
        selectLayoutState,
        (state) => ({ user: state.user, success: state.success, error: state.error })
    );

    const { user, success, error } = useSelector(userprofileData);

    useEffect(() => {
        dispatch(GET_MainDashboard());
    }, [dispatch]);

    const getLinkPath = (voucherType) => {
        switch (voucherType) {
            case 'Security Gate':
                return '/securitygate-ERP';
            case 'Inward Order':
                return '/operational';
            default:
                return '/';
        }
    };

    return (
        <React.Fragment>
            {user?.map((item, index) => (
                <Row key={index}>
                    <Col xl={12}>
                        <Link to={getLinkPath(item.voucherType)}> {/* Conditional path */}
                            <Card>
                                <CardHeader className="border-0 align-items-center d-flex">
                                    <h4 className="card-title mb-0 flex-grow-1">{item.voucherType}</h4>
                                    <div class="flex-shrink-0"><a class="badge bg-primary-subtle text-primary fs-11" >Under Process</a></div>
                                </CardHeader>
                                <CardHeader className="p-0 border-0 bg-light-subtle">
                                    <Row className="g-0 text-center">
                                        {item.argumentValue.map((arg, idx) => (
                                            <Col xs={6} sm={3} key={idx}>
                                                <div className="p-3 border border-dashed border-start-0">
                                                    <h5 className="mb-1">
                                                        <span className="counter-value" data-target={arg.argument}>
                                                            <CountUp start={0} end={parseFloat(arg.value)} separator=","duration={4} />
                                                        </span>
                                                    </h5>
                                                    <p className="text-muted mb-0">{arg.argument}</p>
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>
                                </CardHeader>
                            </Card>
                        </Link>
                    </Col>
                </Row>
            ))}
        </React.Fragment>
    );
};

export default DataOverview;