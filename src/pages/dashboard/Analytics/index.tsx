import React from 'react';
import { Card, Col, Nav, Row, Tab } from 'react-bootstrap';
import FeatherIcon from 'feather-icons-react';
import { Link, useLocation } from 'react-router-dom';

// components
import PageTitle from '../../../components/PageTitle';
import "./analytics.css";
import Overview from './Overview';
import NewUsers from './NewUsers';
import SocialMediaChart from './SocialMediaChart';
import Sources from './Sources';
import EngagementOverviews from './EngagementOverviews';
import Platforms from './Platforms';
import Channels from './Channels';
import ViewsDetails from './ViewsDetails';
import SessionbyLocations from './SessionbyLocations';
import SessionbyBrowser from './SessionbyBrowser';
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import hashtagIcon from '../../../assets/images/icon/hashtag.png';
import images from './images';
import Slider from "react-slick";
// dummy data
import { channels, engagementOverviews, platforms, sources, viewsDetails } from './data';


interface TabContentType {
    key: string;
    label: string;
    text?: string;
    icon?: string;
    url?: string;
    parentKey?: string;
    target?: string;
    children?: TabContentType[];
}

const tabContents: TabContentType[] = [
    {
        key: 'automated-content',
        label: 'Image',
        icon: 'briefcase',
        children: [
            {
                key: 'hashtags-from-image',
                label: 'Hashtags From Image',
                url: '/image/hashtagimgkeyword',
                parentKey: 'automated-content',
                icon: `${images.Group7}`,
                text: 'Get AI generated contextual hashtags that complement your image making it viral ready.',
            },
            {
                key: 'slogans-from-image',
                label: 'Slogans From Image',
                url: '/image/slogans',
                parentKey: 'automated-content',
                icon: `${images.Group13}`,
                text: 'Get high-quality slogans generated by our AI Wizard inspired by visuals, emotions, and concept of your image.',

            },
            {
                key: 'facebook-from-image',
                label: 'Facebook Caption From Image',
                url: '/image/facebookimgkeyword',
                parentKey: 'automated-content',
                icon: `${images.Group11}`,
                text: 'Get AI generated quirky captions that complement your post making it truly shine!',
            },
            {
                key: 'instagram-from-image',
                label: 'Instagram Caption From Image',
                url: '/image/instaimgkeyword',
                parentKey: 'automated-content',
                icon: `${images.Group2}`,
                text: 'Get AI generated captivating captions for Instagram that make your posts unlike no other!',
            },
            {
                key: 'tweet-from-image',
                label: 'Tweet From Image',
                url: '/image/tweetimgkeyword',
                parentKey: 'automated-content',
                icon: `${images.Group9}`,
                text: 'Get AI generated tweets that are relevant and contextual to your image.',
            },
            {
                key: 'linkedin-from-image',
                label: 'LinkedIn Post From Image',
                url: '/image/linkedinimgkeyword',
                parentKey: 'automated-content',
                icon: `${images.Group10}`,
                text: 'Get AI generated professional posts to establish yourself as a thought leader in your industry.',
            },
            {
                key: 'keyword-files',
                label: 'Keyword from files and webpages',
                url: '/image/keywordfiles',
                parentKey: 'automated-content',
                icon: `${images.Group8}`,
                text: 'Break down complex files and webpages into simple to read and understand keywords.',
            },
            {
                key: 'expression-wizard',
                label: 'Expression Wizard',
                url: '/social/expression-wizard',
                parentKey: 'readymade-expressions',
                icon: `${images.Group31}`,
                text: 'Get the perfect expressions that match the visuals and emotions for your image.',
            },
        ],
    },
    {
        key: 'content-cocial-media',
        label: 'Social Media',
        icon: 'message-square',
        children: [
            {
                key: 'facebook-posts',
                label: 'Facebook posts',
                url: '/post/fbpost',
                parentKey: 'content-cocial-media',
                icon: `${images.Group11}`,
                text: 'Get an edge on the competition by facebook posts that are unique and engaging.',
            },
            {
                key: 'instagram-posts',
                label: 'Instagram captions',
                url: '/post/igpost',
                parentKey: 'content-cocial-media',
                icon: `${images.Group2}`,
                text: 'Captions that turn your images into an attention-grabbing spectacle.',
            },
            {
                key: 'linkedin-posts',
                label: 'LinkedIn posts',
                url: '/post/linkedinpost',
                parentKey: 'content-cocial-media',
                icon: `${images.Group10}`,
                text: 'LinkedIn posts that help establish you as a thought leader in your industry.',
            },
            {
                key: 'twitter-posts',
                label: 'Twitter Posts',
                url: '/post/tweetpost',
                parentKey: 'content-cocial-media',
                icon: `${images.Group9}`,
                text: 'Generate a buzz with tweets that captivate readers\' attention inviting them in a conversation.',
            },
            {
                key: 'snapchat-captions',
                label: 'Snapchat captions',
                url: '/post/snapchatpost',
                parentKey: 'content-cocial-media',
                icon: `${images.Group26}`,
                text: 'Snap-tastic captions for your snaps turning them engagement ready in an instant.',
            },
            {
                key: 'youtube-video-description',
                label: 'Youtube video title',
                url: '/post/ytdesc',
                parentKey: 'content-cocial-media',
                icon: `${images.Group25}`,
                text: 'Catchy, SEO-friendly descriptions that help your videos raise engagement.',
            },
            {
                key: 'youtube-video-script',
                label: 'Youtube video script',
                url: '/post/ytscript',
                parentKey: 'content-cocial-media',
                icon: `${images.Group25}`,
                text: 'Intruiging and engaging youtube video scripts that keep the viewers hooked.',
            },
            {
                key: 'youtube-video-ideas',
                label: 'Youtube video ideas',
                url: '/post/ytideas',
                parentKey: 'content-cocial-media',
                icon: `${images.Group25}`,
                text: 'Relevant and smart video ideas that make your content stand out.',
            },
            {
                key: 'instagram-bio',
                label: 'Instagram bio',
                url: '/bio/instabio',
                parentKey: 'content-cocial-media',
                icon: `${images.Group2}`,
                text: 'Crisp and quirky company bio that will help you connect with your target audience.',
            },
            {
                key: 'facebook-bio',
                label: 'Facebook bio',
                url: '/bio/facebookbio',
                parentKey: 'content-cocial-media',
                icon: `${images.Group11}`,
                text: 'Engaging and relevant company bio to uplevel your social profile.',
            },
            {
                key: 'twitter-bio',
                label: 'Twitter bio',
                url: '/bio/twitterbio',
                parentKey: 'content-cocial-media',
                icon: `${images.Group9}`,
                text: 'Contextual and value driven company bio that will help you establish thought leadership.',
            },
            {
                key: 'linkedin-bio',
                label: 'LinkedIn bio',
                url: '/bio/linkedinbio',
                parentKey: 'content-cocial-media',
                icon: `${images.Group10}`,
                text: 'Professionally compelling company bio that will help communicate your brand values.',
            },
            {
                key: 'snapchat-bio',
                label: 'Snapchat bio',
                url: '/bio/snapchatbio',
                parentKey: 'content-cocial-media',
                icon: `${images.Group26}`,
                text: 'Fun and catchy company bio that will help you raise your engagement quotient.',
            },
        ],
    },
    {
        key: 'short-form-writer',
        label: 'Writer',
        icon: 'clipboard',
        children: [
            {
                key: 'content-rephrase',
                label: 'Content rephrase',
                url: '/shortwriter/textshortnerbykeyword',
                parentKey: 'short-form-writer',
                icon: `${images.shortGroup13}`,
                text: 'Give your content a fresh spin by rephrasing it in a different voice and style.',
            },
            {
                key: 'quote-generator',
                label: 'Quote generator',
                url: '/shortwriter/quotesbykeywords',
                parentKey: 'short-form-writer',
                icon: `${images.shortGroup7}`,
                text: 'Grab attention and inspire engagement with eye-catching quotes.',
            },
            // {
            //     key: 'festival-wishes',
            //     label: 'Festival wishes',
            //     url: '/shortwriter/greetingbybrand',
            //     parentKey: 'short-form-writer',
            //     icon: `${images.shortGroup10}`,
            //     text: 'Professional yet creative wishes that help your brand stand out on social media.',
            // },
            {
                key: 'content-summarizer',
                label: 'Content summarizer',
                url: '/shortwriter/textrewritebykeyword',
                parentKey: 'short-form-writer',
                icon: `${images.shortGroup14}`,
                text: 'Summarize your content making it more readable while retaining its essence.',
            },
            {
                key: 'call-to-action',
                label: 'Call to action',
                url: '/shortwriter/calltoactionbykeywords',
                parentKey: 'short-form-writer',
                icon: `${images.shortGroup8}`,
                text: 'Attention-grabbing call to action that help boost your sales.',
            },
            {
                key: 'smart-notifications',
                label: 'Smart notifications',
                url: '/shortwriter/notificationsbykeywords',
                parentKey: 'short-form-writer',
                icon: `${images.shortGroup12}`,
                text: 'Engaging notifications for app and SMS that keep the users hooked for more.',
            },
            {
                key: 'slogans',
                label: 'Slogans',
                url: '/shortwriter/sloganskykeywords',
                parentKey: 'short-form-writer',
                icon: `${images.shortGroup9}`,
                text: 'Uplevel your creative gene with world-class slogans that seperate your brand from the rest.',
            },
            {
                key: 'email-subject',
                label: 'Email subject',
                url: '/shortwriter/emailsubjectbykeyword',
                parentKey: 'short-form-writer',
                icon: `${images.shortGroup11}`,
                text: 'Compelling email subject lines that command user clicks.',
            },
        ],
    },
    {
        key: 'e-commerce-content',
        label: 'E-Commerce',
        icon: 'grid',
        children: [
            {
                key: 'product-descriptions',
                label: 'Product descriptions',
                url: '/ecommerce/productdescbykeyword',
                parentKey: 'e-commerce-content',
                icon: `${images.productGroup19}`,
                text: 'Innovative product descriptions that make your products rank higher.',
            },
            {
                key: 'product-features',
                label: 'Product features',
                url: '/ecommerce/productfeaturecbykeyword',
                parentKey: 'e-commerce-content',
                icon: `${images.productGroup18}`,
                text: 'Advantages and features of your products that make them the buyers\' first choice.',
            },
            {
                key: 'product-titles',
                label: 'Product titles',
                url: '/ecommerce/producttitlebykeyword',
                parentKey: 'e-commerce-content',
                icon: `${images.productGroup21}`,
                text: 'Eye-catching product titles that differentiate your product from its competitors.',
            },
            {
                key: 'product-name-generator',
                label: 'Product name generator',
                url: '/ecommerce/productnamebykeyword',
                parentKey: 'e-commerce-content',
                icon: `${images.productGroup17}`,
                text: 'Generate novel name ideas for your product making them stand out from the competiton.',
            },
            {
                key: 'review-responder',
                label: 'Review responder',
                url: '/ecommerce/reviewreplybykeyword',
                parentKey: 'e-commerce-content',
                icon: `${images.productGroup16}`,
                text: 'Human-like personalized replies for negative or positive customer reviews.',
            },
            {
                key: 'seo-keywords',
                label: 'SEO keywords',
                url: '/ecommerce/seokeywordbykeyword',
                parentKey: 'e-commerce-content',
                icon: `${images.productGroup20}`,
                text: 'A set of SEO-friendly keywords for your product or service.',
            },
        ],
    },
    {
        key: 'ad-ready',
        label: 'Advertisers',
        icon: 'cpu',
        children: [
            {
                key: 'google-ad-title',
                label: 'Google ad title',
                url: '/adready/googleadtitlepost',
                parentKey: 'ad-ready',
                icon: `${images.Group5}`,
                text: 'Innovate ad titles that entice people to click on your ad to explore further.',
            },
            {
                key: 'google-ad-description',
                label: 'Google ad description',
                url: '/adready/googleaddescpost',
                parentKey: 'ad-ready',
                icon: `${images.Group5}`,
                text: 'Smart performing ad descriptions that converts visitors into buyers.',
            },
            {
                key: 'facebook-ads',
                label: 'Facebook ads',
                url: '/adready/fbadtitlepost',
                parentKey: 'ad-ready',
                icon: `${images.Group11}`,
                text: 'Facebook ad copies that make your ads distinguished from the rest.',
            },
            {
                key: 'instagram-ads',
                label: 'Instagram ads',
                url: '/adready/instaadtitlepost',
                parentKey: 'ad-ready',
                icon: `${images.Group2}`,
                text: 'Quirky Instagram ad copies that make the user stop scrolling and engage.',
            },
            {
                key: 'Linkedin-ads',
                label: 'LinkedIn ads',
                url: '/adready/linkedinadtitlepost',
                parentKey: 'ad-ready',
                icon: `${images.Group10}`,
                text: 'Professional LinkedIn ad copies that make your brand shine.',
            },
        ],
    },
    {
        key: 'long-form-writer',
        label: 'Long form writer',
        icon: 'bookmark',
        children: [
            {
                key: 'blog',
                label: 'Blog',
                url: '/writer/blogbykeyword',
                parentKey: 'long-form-writer',
                icon: `${images.longGroup15}`,
                text: 'Clean, crisp, and conversational high quality blog posts optimized to generate more traffic.',
            },
            {
                key: 'article',
                label: 'Article',
                url: '/writer/articlebykeyword',
                parentKey: 'long-form-writer',
                icon: `${images.longGroup16}`,
                text: 'Premium quality, SEO-friendly articles that plug in the research factor.',
            },
            {
                key: 'pr-article',
                label: 'PR Article',
                url: '/writer/prarticlebykeyword',
                parentKey: 'long-form-writer',
                icon: `${images.longGroup18}`,
                text: 'Engaging press releases that amplify the reach of your product or service to the media.',
            },
            {
                key: 'essay',
                label: 'Essay',
                url: '/writer/essaybykeyword',
                parentKey: 'long-form-writer',
                icon: `${images.longGroup31}`,
                text: 'Go from novice to pro with analytical essays in an instant.',
            },
            {
                key: 'email',
                label: 'Email',
                url: '/writer/emailbykeyword',
                parentKey: 'long-form-writer',
                icon: `${images.longGroup19}`,
                text: 'Professional emails that help you engage your target audience.',
            },
            {
                key: 'cover-letter',
                label: 'Cover letter',
                url: '/writer/coverletterbykeyword',
                parentKey: 'long-form-writer',
                icon: `${images.longGroup20}`,
                text: 'Professional cover letters that leave a lasting impression and helps you get hired faster.',
            },
            {
                key: 'faqs',
                label: 'FAQs',
                url: '/writer/faqbykeyword',
                parentKey: 'long-form-writer',
                icon: `${images.longGroup24}`,
                text: 'Smartly written FAQs that never leave the visitors wondering.',
            },
            {
                key: 'text-expander',
                label: 'Text expander',
                url: '/writer/textexpanderbykeyword',
                parentKey: 'long-form-writer',
                icon: `${images.longGroup32}`,
                text: 'Up-level your ideas by turning short sentences into longer, more descriptive ones.',
            },
            {
                key: 'job-description',
                label: 'Job description',
                url: '/writer/jdbykeyword',
                parentKey: 'long-form-writer',
                icon: `${images.longGroup22}`,
                text: 'Write a suitable job description for any given role.',
            },
            {
                key: 'quora-answers',
                label: 'Quora answers',
                url: '/writer/quorabykeyword',
                parentKey: 'long-form-writer',
                icon: `${images.longGroup21}`,
                text: 'Build your authority with answers that are clear, descriptive, and research evident.',
            },
        ],
    },
    {
        key: 'hashtag-generator',
        label: 'Hashtag generator',
        icon: 'mail',
        children: [
            {
                key: 'hashtags-by-keyword',
                label: 'Hashtags by keyword',
                url: '/hashtag/hashtags-by-keyword',
                parentKey: 'hashtag-generator',
                icon: `${images.Group30}`,
                text: 'Generate relevant, contextual, and viral ready hashtags by any word.',
            },
            {
                key: 'hashtags-by-image',
                label: 'Hashtags by image',
                url: '/hashtag/hashtags-by-image',
                parentKey: 'hashtag-generator',
                icon: `${images.Group29}`,
                text: 'Pictures speak a thousand words; Well, in our case that\'s hashtags!',
            },
            {
                key: 'hashtags-by-text',
                label: 'Hashtags by text',
                url: '/hashtag/hashtags-by-text',
                parentKey: 'hashtag-generator',
                icon: `${images.Group28}`,
                text: 'Generate magical, reach boosting hashtags by any quote or caption.',
            },
        ],
    },
    {
        key: 'readymade-expressions',
        label: 'Curated Expressions',
        icon: 'target',
        children: [

            {
                key: 'search-expressions-by-Keyword',
                label: 'Search Expressions by Keyword',
                url: '/social/search-slogans/0/Search Slogans',
                parentKey: 'readymade-expressions',
                icon: `${images.business3}`,
                text: 'Get ready to post expressions with matching hashtags for any keyword.',
            },
            {
                key: 'business-ad-copy-hashtags',
                label: 'Business Ad Copy with Hashtags',
                url: '/social/category/5/Beauty',
                parentKey: 'readymade-expressions',
                icon: `${images.business2}`,
                text: 'Get industry specific ad copy with contextual hashtags for 20 industries including major e-commerce categories.',
            },
            {
                key: 'personal-captions-hashtags',
                label: 'Personal Captions with Hashtags',
                url: '/social/category/4/Attitude',
                parentKey: 'readymade-expressions',
                icon: `${images.business1}`,
                text: 'Get the most amazing captions with contextual hashtags for your social posts.',
            },
        ],
    },
];

const NavPills = () => {

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 6.5,
        slidesToScroll: 3.5,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1980,
                settings: {
                    slidesToShow: 5.5,
                    slidesToScroll: 3.5,
                },
            },
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 4.5,
                    slidesToScroll: 3.5,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3.5,
                    slidesToScroll: 3.5,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2.5,
                    slidesToScroll: 2.5,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1.5,
                    slidesToScroll: 1.5,
                },
            },
        ],
    };

    return (
        <Card>
            <Card.Body className="tabdash">


                <Tab.Container defaultActiveKey="automated-content">

                    <Nav as="ul" justify variant="pills" className="p-0">

                        {(tabContents || []).map((tab, index) => {
                            return (

                                <Nav.Item as="li" key={index}>
                                    <Nav.Link className="cursor-pointer" eventKey={tab.key} >
                                        <span className="d-block d-sm-none">
                                            {tab.icon && <FeatherIcon icon={tab.icon} />}

                                        </span>
                                        <span className="d-none d-sm-block">{tab.label}</span>
                                    </Nav.Link>
                                </Nav.Item>
                            );
                        })}
                    </Nav>



                    <Tab.Content className="text-muted">
                        {(tabContents || []).map((tab, index) => {
                            return (
                                <Tab.Pane eventKey={tab.key} id={String(tab.key)} key={index}>
                                    {/* <p>{tab.label}</p> */}
                                    <Row>
                                        {(tab.children || []).map((childtab, i) => {
                                            return (
                                                <Col md={4} xxl={3} key={i}>
                                                    <Link to={childtab.url!} >
                                                        <Card>
                                                            <Card.Body>
                                                                <div className="d-flex">
                                                                    <img src={`${childtab.icon ? childtab.icon : hashtagIcon}`} className="avatar-md rounded-circle me-2" alt="" />
                                                                    <div className="flex-grow-1">
                                                                        <h6>{childtab.label}</h6>
                                                                        {/* <h6 className="text-muted fw-normal mt-1 mb-4">New York, USA</h6> */}
                                                                    </div>
                                                                </div>
                                                                <div className="mt-1 text-start">
                                                                    <p className="text-muted mb-2">{childtab.text}</p>
                                                                </div>
                                                            </Card.Body>
                                                        </Card>
                                                    </Link>
                                                </Col>
                                            );
                                        })}
                                    </Row>
                                </Tab.Pane>
                            );
                        })}
                    </Tab.Content>
                </Tab.Container>
            </Card.Body>
        </Card>
    );
};


const AnalyticsDashboard = () => {
    return (
        <>
            {/* <PageTitle
                breadCrumbItems={[
                    { label: 'Dashboards', path: '/dashboard/analytics' },
                    { label: 'Tools', path: '/dashboard/analytics', active: true },
                ]}
                title={'Dashboards'}
            /> */}

            <Row>
                <Col xl={12}>
                    <NavPills />
                </Col>
            </Row>

            {/* <Row>
                <Col xl={8}>
                    <Overview />
                </Col>

                <Col xl={4}>
                    <NewUsers />
                </Col>
            </Row> */}

            {/* <Row>
                <Col xl={6}>
                    <SocialMediaChart />
                </Col>
                <Col xl={6}>
                    <Row>
                        <Col md={6}>
                            <Sources sources={sources} />
                        </Col>
                        <Col md={6}>
                            <EngagementOverviews engagementOverviews={engagementOverviews} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Platforms platforms={platforms} />
                        </Col>
                        <Col md={6}>
                            <Channels channels={channels} />
                        </Col>
                    </Row>
                </Col>
            </Row> */}

            {/* <Row>
                <Col xl={4}>
                    <ViewsDetails viewsDetails={viewsDetails} />
                </Col>
                <Col lg={6} xl={4}>
                    <SessionbyLocations />
                </Col>
                <Col lg={6} xl={4}>
                    <SessionbyBrowser />
                </Col>
            </Row> */}
        </>
    );
};

export default AnalyticsDashboard;