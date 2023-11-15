import React from 'react';
import { Row, Col, Breadcrumb } from 'react-bootstrap';

interface BreadcrumbItems {
    label: string;
    path: string;
    active?: boolean;
}

interface PageTitleProps {
    breadCrumbItems: Array<BreadcrumbItems>;
    title: string;
    subtitle: string;
}

/**
 * PageTitle
 */
const PageTitleNew = (props: PageTitleProps) => {
    return (
        <Row>
            <Col>
                <div className="page-title-box">
                    <h4 className="page-title">{props.title}
                        <br/>
                        <span>{props.subtitle}</span>
                    </h4>
                    {/* <div className="page-title-right">
                        <Breadcrumb listProps={{ className: 'm-0' }}>
                            <Breadcrumb.Item href="/">Cretorial</Breadcrumb.Item>

                            {(props.breadCrumbItems || []).map((item, index) => {
                                return item.active ? (
                                    <Breadcrumb.Item active key={index}>
                                        {item.label}
                                    </Breadcrumb.Item>
                                ) : (
                                    <Breadcrumb.Item key={index} href={item.path}>
                                        {item.label}
                                    </Breadcrumb.Item>
                                );
                            })}
                        </Breadcrumb>
                    </div> */}
                </div>
                <Breadcrumb listProps={{ className: 'm-0' }}>
                    <Breadcrumb.Item href="/">Cretorial</Breadcrumb.Item>

                    {(props.breadCrumbItems || []).map((item, index) => {
                        return item.active ? (
                            <Breadcrumb.Item active key={index}>
                                {item.label}
                            </Breadcrumb.Item>
                        ) : (
                            <Breadcrumb.Item key={index} href={item.path}>
                                {item.label}
                            </Breadcrumb.Item>
                        );
                    })}
                </Breadcrumb>
                
            </Col>
        </Row>
    );
};

export default PageTitleNew;
