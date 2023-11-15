import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';
import FeatherIcons from 'feather-icons-react';
import useRazorpay from "react-razorpay";
import { toast } from 'react-toastify';

// components
import PageTitle from '../../components/PageTitle';

// dummy data
import { pricingPlans, PlanItemsTypes } from './data';
import { APICore } from '../../helpers/api/apiCore';
import * as apiService from '../../services';

interface PricingCardProps {
    pricingPlans: PlanItemsTypes[];
}

interface subscritionType {
    subsid: number;
    subsname: string;
    icon: string;
    subsprice: number;
    subsvalidity: string;
    planname: string;
    subslimit: string;
    subsfeatures: Array<string>;
    isRecommended: boolean;
}

const PricingCard = ({ pricingPlans }: PricingCardProps) => {

    const [plansData, setplansData] = useState([])
    const api = new APICore();
    const loggedInUser = api.getLoggedInUser();

    const Razorpay = useRazorpay();
    const history = useHistory();

    const name = 'Cretorial Ai';
    const store_logo = "https://cretorial.ai/assets/img/new/logo.png";
    let username = loggedInUser.username;
    let email = loggedInUser.email;
    // let contact = `91${user.mobile}`;

    const handlePayment = async (plan:any) => {
        const options = {
            key: process.env.REACT_APP_RAZOR_KEY,
            amount: plan.subsprice*100,
            currency: "INR",
            name: name,
            image: store_logo,
            //   order_id: "orderx_9A33XWu170gUtm",
            prefill: {        
                name: username,        
                email: email,        
            }, 
            // handler: demoSuccessHandler,
            handler: async function (transaction:any){
                // console.log(transaction.razorpay_payment_id);
                const postData =  {  
                    userid:loggedInUser.id, 
                    paymentid: transaction.razorpay_payment_id,
                    subsvalidity: plan.subsvalidity,
                    planid: plan.planname,
                    subslimit:plan.subslimit,
                    subsstatus:1
                };
                // console.log(postData);
                const newdata = await apiService.CaiSubsTopUpPayment({ postData });
                if (newdata) {
                    toast.success(`Subscription Start Successfully`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    // window.location.href = '/dashboard/analytics'; 
                    history.push('/dashboard/analytics');
                }
            },
            theme: {
                color: "#ff2424",
            },
            modal: {
                ondismiss: function(){
                    //   console.log('Checkout form closed');
                    toast.error(`Checkout form closed`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                    //   setIsLoading(false);
                    // $('#paybtn').prop('disabled', false);
                }
            }
        };
    
        const rzp1 = (window as any).Razorpay(options);
        rzp1.on("payment.failed", function (response:any) {
            //   setIsLoading(false);
            // console.log(response.error.code);
            // console.log(response.error.description);
            toast.error(`Payment Failed- ${response.error.description}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        });
        rzp1.open();
    };

    const getPlans = async () => {
        const data = await apiService.CaiSubsTopUp();
        console.log(data.TopUP);
        setplansData(data.TopUP);
        
    }

    const getSubStatus = async () => {
        // if(loggedInUser) {
        //     const data = await apiService.CaiShowSubsUserData(loggedInUser.id);
        //     if(data.Status == 'Active'){
        //         toast.success(`Subscription already started successfully`, {
        //             position: "top-right",
        //             autoClose: 5000,
        //             hideProgressBar: true,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //             theme: "light",
        //         });
        //         // window.location.href = '/dashboard/analytics'; 
        //         history.push('/dashboard/analytics');
        //     }
        // }
    }

    useEffect(() => {
        getPlans();
        getSubStatus();
    }, []);

    return (
        <Row>
            {plansData?.map((plan:subscritionType, idx) => {
                return (
                    <Col lg={4} key={idx}>
                        <Card className="card-pricing">
                            <Card.Body className="px-3 py-4">
                                <div className="d-flex">
                                    <div className="flex-grow-1">
                                        <h5 className="mt-0 mb-2 fs-16">{plan.subsname}</h5>
                                        <h2 className="mt-0 mb-2">
                                             ₹{plan.subsprice} <span className="fs-14">/ Active Plan</span>
                                        </h2>
                                        <h6>{plan.subslimit} Words</h6>
                                    </div>
                                    <div className="align-self-center flex-shrink-0">
                                        <FeatherIcons icon="shopping-bag" className="icon-dual icon-lg"></FeatherIcons>
                                    </div>
                                </div>

                                <ul className="card-pricing-features text-muted border-top pt-2 mt-2 ps-0 list-unstyled">
                                    {(plan.subsfeatures || []).map((feature, idx1) => {
                                        return (
                                            <li key={idx1}>
                                                <i className="uil uil-check text-success fs-15 me-1"></i>
                                                {feature}
                                            </li>
                                        );
                                    })}
                                </ul>

                                <div className="mt-5 text-center">
                                   
                                    <Button onClick={() => handlePayment(plan)}
                                        variant={plan['isRecommended'] ? 'primary' : 'soft-primary'}
                                        className="px-sm-3">
                                        <i className="uil uil-arrow-right me-1"></i>Buy Now for ₹{plan['subsprice']}
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                );
            })}
        </Row>
    );
};

// Topup component
const Topup = () => {
    return (
        <React.Fragment>
            {/* <PageTitle
                breadCrumbItems={[
                    { label: 'Pages', path: '/pages/pricing' },
                    { label: 'Pricing', path: '/pages/pricing', active: true },
                ]}
                title={'Pricing'}
            /> */}

            <Row className="justify-content-center">
                <Col xl={10}>
                    <div className="text-center my-2">
                        <h3>Simple pricing for Everyone</h3>
                        {/* <p className="text-muted">Fully functional accounts are starting from $19/month only</p> */}
                    </div>

                    {/* pricing cards */}
                    <PricingCard pricingPlans={pricingPlans} />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Topup;
