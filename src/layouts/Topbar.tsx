import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import FeatherIcon from 'feather-icons-react';
import designYourCreative from '../assets/images/designYourCreative.svg';
// actions
import { showRightSidebar, changeSidebarType } from '../redux/actions';

// store
import { RootState, AppDispatch } from '../redux/store';

//constants
import { LayoutTypes, SideBarTypes } from '../constants/layout';

// components
import TopbarSearch from '../components/TopbarSearch';
import MaximizeScreen from '../components/MaximizeScreen';
import AppsDropdown from '../components/AppsDropdown/';
import SearchDropdown from '../components/SearchDropdown';
import LanguageDropdown from '../components/LanguageDropdown';
import NotificationDropdown from '../components/NotificationDropdown';
import ProfileDropdown from '../components/ProfileDropdown';
import CreateNew from '../components/CreateNew';

// images
import profilePic from '../assets/images/users/avatar-1.jpg';
import avatar4 from '../assets/images/users/avatar-4.jpg';
import logo from '../assets/images/logo.png';
import logoSm from '../assets/images/logo-sm.png';
import logoDark from '../assets/images/logo-dark.png';
import logoLight from '../assets/images/logo-light.png';

import { APICore } from '../helpers/api/apiCore';
import * as apiService from '../services';
import { ButtonGroup, Button } from 'react-bootstrap';


export interface NotificationItem {
    id: number;
    text: string;
    subText: string;
    icon?: string;
    avatar?: string;
    bgColor?: string;
}

// get the notifications
const Notifications: NotificationItem[] = [
    {
        id: 1,
        text: 'Cristina Pride',
        subText: 'Hi, How are you? What about our next meeting',
        avatar: profilePic,
    },
    {
        id: 2,
        text: 'Caleb Flakelar commented on Admin',
        subText: '1 min ago',
        icon: 'uil uil-comment-message',
        bgColor: 'primary',
    },
    {
        id: 3,
        text: 'Karen Robinson',
        subText: 'Wow ! this admin looks good and awesome design',
        avatar: avatar4,
    },
    {
        id: 4,
        text: 'New user registered.',
        subText: '5 hours ago',
        icon: 'uil uil-user-plus',
        bgColor: 'warning',
    },
    {
        id: 5,
        text: 'Caleb Flakelar commented on Admin',
        subText: '1 min ago',
        icon: 'uil uil-comment-message',
        bgColor: 'info',
    },
    {
        id: 6,
        text: 'Carlos Crouch liked Admin',
        subText: '13 days ago',
        icon: 'uil uil-heart',
        bgColor: 'secondary',
    },
];

// get the profilemenu
const ProfileMenus = [
    {
        label: 'My Favourite',
        icon: 'heart',
        redirectTo: '/social/mycard',
    },
    {
        label: 'My Subscription',
        icon: 'user',
        redirectTo: '/social/subscription',
    },
    // {
    //     label: 'Lock Screen',
    //     icon: 'lock',
    //     redirectTo: '/auth/lock-screen',
    // },
    {
        label: 'Logout',
        icon: 'log-out',
        redirectTo: '/auth/logout',
    },
];

// dummy search results
const SearchResults = [
    {
        id: 1,
        title: 'Analytics Report',
        icon: 'uil-notes',
        redirectTo: '/',
    },
    {
        id: 2,
        title: 'How can I help you?',
        icon: 'uil-life-ring',
        redirectTo: '/',
    },
    {
        id: 3,
        icon: 'uil-cog',
        title: 'User profile settings',
        redirectTo: '/',
    },
];

const otherOptions = [
    {
        id: 1,
        label: 'New Projects',
        icon: 'uil uil-bag',
    },
    {
        id: 2,
        label: 'Create Users',
        icon: 'uil uil-user-plus',
    },
    {
        id: 3,
        label: 'Revenue Report',
        icon: 'uil uil-chart-pie',
    },
    {
        id: 4,
        label: 'Settings',
        icon: 'uil uil-cog',
    },
    {
        id: 4,
        label: 'Help & Support',
        icon: 'uil uil-question-circle',
    },
];

interface TopbarProps {
    hideLogo?: boolean;
    navCssClasses?: string;
    openLeftMenuCallBack?: () => void;
    topbarDark?: boolean;
}

const Topbar = ({ hideLogo, navCssClasses, openLeftMenuCallBack, topbarDark }: TopbarProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const api = new APICore();
    const loggedInUser = api.getLoggedInUser();

    const [isopen, setIsopen] = useState<boolean>(false);

    const [subStatus, setSubStatus] = useState({
        status: "",
        planname: "",
        totalwords: "",
        wordsleft: ""
    });


    const navbarCssClasses: string = navCssClasses || '';
    const containerCssClasses: string = !hideLogo ? 'container-fluid' : '';

    const { layoutType, leftSideBarType } = useSelector((state: RootState) => ({
        layoutType: state.Layout.layoutType,
        leftSideBarType: state.Layout.leftSideBarType,
    }));



    /**
     * Toggle the leftmenu when having mobile screen
     */
    const handleLeftMenuCallBack = () => {
        setIsopen(!isopen);
        if (openLeftMenuCallBack) openLeftMenuCallBack();
    };

    /**
     * Toggles the right sidebar
     */
    const handleRightSideBar = () => {
        dispatch(showRightSidebar());
    };

    /**
     * Toggles the left sidebar width
     */
    const toggleLeftSidebarWidth = () => {
        if (leftSideBarType === 'default' || leftSideBarType === 'compact')
            dispatch(changeSidebarType(SideBarTypes.LEFT_SIDEBAR_TYPE_CONDENSED));
        if (leftSideBarType === 'condensed') dispatch(changeSidebarType(SideBarTypes.LEFT_SIDEBAR_TYPE_DEFAULT));
    };

    useEffect(() => {
        getSubStatus();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            getSubStatus();
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    const getSubStatus = async () => {
        // console.log(loggedInUser);
        if (loggedInUser) {
            const data = await apiService.CaiShowSubsUserData(loggedInUser.id);
            // console.log(data);
            setSubStatus({
                status: data.Status,
                planname: data.planname,
                totalwords: data.totalwords,
                wordsleft: data.wordsleft
            });
        }
    }

    return (
        <React.Fragment>
            <div className={`navbar-custom ${navbarCssClasses}`}>
                <div className={containerCssClasses}>
                    {!hideLogo && (
                        <div className="logo-box">
                            <Link to="/" className="logo logo-dark">
                                <span className="logo-sm">
                                    <img src={logo} alt="" height="30" />
                                </span>
                                <span className="logo-lg">
                                    <img src={logo} alt="" height="50" />
                                </span>
                            </Link>
                            <Link to="/" className="logo logo-light">
                                <span className="logo-sm">
                                    <img src={logo} alt="" height="30" />
                                </span>
                                <span className="logo-lg">
                                    <img src={logo} alt="" height="50" />
                                </span>
                            </Link>
                        </div>
                    )}

                    <ul className="list-unstyled topnav-menu float-end mb-0">
                        {/* <li className="d-none d-lg-block">
                            <TopbarSearch items={SearchResults} />
                        </li> */ }


                        <li className="drodropdown d-none d-lg-inline-block">

                            <div className='nav-link right-bar-toggle arrow-none btn btn-link shadow-none'>
                                <ButtonGroup
                                    className="ms-2 me-1"
                                    onClick={(e) => {
                                        window.open('https://app.cretorial.ai/editor/', '_blank');
                                    }}
                                >
                                    <Button className="btn btn-sm" style={{ background: "linear-gradient(90deg, #6d53ef 0%, #5b00dd 100%)", fontSize: "15px" }}>
                                        <img src={designYourCreative} alt="" className="img-fluid" /> &nbsp; Design your creative
                                    </Button>
                                </ButtonGroup>


                            </div>


                        </li>

                        {subStatus.status &&
                            <li className="drodropdown d-none d-lg-inline-block">
                                <div className='nav-link right-bar-toggle arrow-none btn btn-link shadow-none'>
                                    Status: <b>{subStatus.planname}</b>
                                </div>
                            </li>
                        }

                        <li className="dropdown d-none d-lg-inline-block">
                            {/* <button
                                className="nav-link right-bar-toggle arrow-none btn btn-link shadow-none"
                                onClick={handleChange}>
                                <FeatherIcon icon="plus" /> Upgrade
                            </button> */}
                            {subStatus.status === 'Active' ?
                                <div className='nav-link right-bar-toggle arrow-none btn btn-link shadow-none'>
                                    Words Limit: <b>{subStatus.wordsleft}</b>/{subStatus.totalwords}

                                </div>
                                :
                                <Link to="/pages/pricing" className='nav-link right-bar-toggle arrow-none btn btn-link shadow-none'>
                                    <FeatherIcon icon="plus" /> Upgrade
                                </Link>
                            }

                        </li>

                        <li className="dropdown d-none d-lg-inline-block">
                            <MaximizeScreen />
                        </li>
                        <li className="dropdown d-none d-lg-inline-block topbar-dropdown">
                            {/* <AppsDropdown /> */}
                        </li>
                        <li className="dropdown d-none d-lg-inline-block topbar-dropdown">
                            {/* <LanguageDropdown /> */}
                        </li>
                        {/* <li className="dropdown notification-list topbar-dropdown">
                            <NotificationDropdown notifications={Notifications} />
                        </li> */}
                        <li className="dropdown notification-list topbar-dropdown">
                            <ProfileDropdown profilePic={loggedInUser != null ? loggedInUser.imageUrl : profilePic} menuItems={ProfileMenus} username={loggedInUser.username} />
                        </li>
                        {/* <li className="dropdown notification-list">
                            <button
                                className="nav-link right-bar-toggle arrow-none btn btn-link shadow-none"
                                onClick={handleRightSideBar}>
                                <FeatherIcon icon="settings" />
                            </button>
                        </li> */}
                    </ul>

                    <ul className="list-unstyled topnav-menu topnav-menu-left m-0">
                        {layoutType !== LayoutTypes.LAYOUT_HORIZONTAL && (
                            <li>
                                <button
                                    className="button-menu-mobile d-none d-lg-block"
                                    onClick={toggleLeftSidebarWidth}>
                                    <FeatherIcon icon="menu" />
                                    <i className="fe-menu"></i>
                                </button>
                            </li>
                        )}

                        <li>
                            <button className="button-menu-mobile d-lg-none d-bolck" onClick={handleLeftMenuCallBack}>
                                <FeatherIcon icon="menu" />
                            </button>
                        </li>

                        {/* Mobile menu toggle (Horizontal Layout) */}
                        <li>
                            <Link
                                to="#"
                                className={classNames('navbar-toggle nav-link', {
                                    open: isopen,
                                })}
                                onClick={handleLeftMenuCallBack}>
                                <div className="lines">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </Link>
                        </li>

                        {/* <li className="dropdown d-none d-xl-block">
                            <CreateNew otherOptions={otherOptions} />
                        </li> */}
                    </ul>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Topbar;
