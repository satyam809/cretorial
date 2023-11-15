import React, { useEffect, useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Row, Col, Card, Table, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

// components
import PageTitle from '../../components/PageTitle';
import * as apiService from '../../services';

const Tables = () => {

    const [isSubmitting, setIsLoading] = useState(false);
    const [subData, setSubData] = useState([]);
    const [subStatus, setSubStatus] = useState("");

    const getSubData = async () => {
        const data = await apiService.caiShowSubsUsersData();
        // setIsShow(false);
        setSubData(data.subscriberhistory);
        setSubStatus(data.Status);
        setIsLoading(false);
    }

    const handleCancel = async (subsid:any) => {
        // console.log(subsid);
        const data = await apiService.caiSubsCancel(subsid);
        if(data){
            toast.success(`Subscription Plan Cancelled Successfully`, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            getSubData();
        }
    }

    useEffect(() => {
        getSubData();
    }, []);
    


    return (
        <React.Fragment>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Subscription', path: '/ui/tables/basic' },
                ]}
                title={'Basic Tables'}
            />
            <br/>
            <Row>
                <Col lg={12}>
                    <Card>
                        <Card.Body>
                            <h4 className="header-title mt-0 mb-1">All Subscription</h4>
                            {/* <p className="sub-header">
                                Create responsive tables by wrapping any <code>&lt;Table&gt;</code> in <code>responsive</code>{' '}
                                attribute to make them scroll horizontally on small devices (under 768px).
                            </p> */}

                            <Table className="mb-0" responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Plan</th>
                                        <th>Purchase Id</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Word limit</th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {subData?.map((item, i) => {
                                    return  <tr key={i}>
                                        <th scope="row">{i+1}</th>
                                        <td>
                                            {item['subsvalidity'] === 365 ? 'Yearly' : item['subsvalidity'] === 30 ? 'Monthly' : 'Free Trail'}
                                        </td>
                                        <td>{item['purchid']}</td>
                                        <td>{item['startdate']}</td>
                                        <td>{item['enddate']}</td>
                                        <td>{item['subslimit']}</td>
                                        <td>{item['subsstatus'] == '0' ?
                                            'Completed'
                                            : item['subsstatus'] =='1' ?
                                            'Active'
                                            : 'Deactivate' 
                                            }
                                        </td>
                                        <td>
                                            {item['cancelledbyuser'] =='0' && item['subsvalidity'] !='3' ?
                                                <Button variant="danger" onClick={() => handleCancel(item['plankey'])} className="waves-effect waves-light">
                                                Cancel
                                                </Button>
                                            : '' 
                                            }
                                        </td>
                                    </tr>
                                    })}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Tables;
