import React from 'react';
import { Route, RouteProps } from 'react-router-dom';


// components
import PrivateRoute from './PrivateRoute';
import Root from './Root';

// lazy load all the views

// auth
const Login = React.lazy(() => import('../pages/auth/Login'));
const Logout = React.lazy(() => import('../pages/auth/Logout'));
const Confirm = React.lazy(() => import('../pages/auth/Confirm'));
const ForgetPassword = React.lazy(() => import('../pages/auth/ForgetPassword'));
const Register = React.lazy(() => import('../pages/auth/Register'));
const LockScreen = React.lazy(() => import('../pages/auth/LockScreen'));

// landing
const Landing = React.lazy(() => import('../pages/landing/'));

// dashboard   
const EcommerceDashboard = React.lazy(() => import('../pages/dashboard/Ecommerce/'));
const AnalyticsDashboard = React.lazy(() => import('../pages/dashboard/Analytics/'));

// apps
const CalendarApp = React.lazy(() => import('../pages/apps/Calendar/'));
const Projects = React.lazy(() => import('../pages/apps/Projects/'));
const ProjectDetail = React.lazy(() => import('../pages/apps/Projects/Detail/'));
// - chat
const ChatApp = React.lazy(() => import('../pages/apps/Chat/'));
// - email
const Inbox = React.lazy(() => import('../pages/apps/Email/Inbox'));
const EmailDetail = React.lazy(() => import('../pages/apps/Email/Detail'));
const EmailCompose = React.lazy(() => import('../pages/apps/Email/Compose'));
// - tasks
const TaskList = React.lazy(() => import('../pages/apps/Tasks/List/'));
const Kanban = React.lazy(() => import('../pages/apps/Tasks/Board/'));
// - file
const FileManager = React.lazy(() => import('../pages/apps/FileManager'));

// extra pages
const Error404 = React.lazy(() => import('../pages/error/Error404'));
const Error500 = React.lazy(() => import('../pages/error/Error500'));
// -other
const Starter = React.lazy(() => import('../pages/other/Starter'));
const Profile = React.lazy(() => import('../pages/other/Profile'));
const Activity = React.lazy(() => import('../pages/other/Activity'));
const Invoice = React.lazy(() => import('../pages/other/Invoice'));
const Maintenance = React.lazy(() => import('../pages/other/Maintenance'));
const Pricing = React.lazy(() => import('../pages/other/Pricing'));
const Topup = React.lazy(() => import('../pages/other/Topup'));

// uikit
const UIElements = React.lazy(() => import('../pages/uikit'));

// widgets
const Widgets = React.lazy(() => import('../pages/widgets/'));

// icons
const Unicons = React.lazy(() => import('../pages/icons/Unicons'));
const FeatherIcons = React.lazy(() => import('../pages/icons/Feather/'));
const BootstrapIcon = React.lazy(() => import('../pages/icons/Bootstrap/'));

// forms
const BasicForms = React.lazy(() => import('../pages/forms/Basic'));
const FormAdvanced = React.lazy(() => import('../pages/forms/Advanced'));
const FormValidation = React.lazy(() => import('../pages/forms/Validation'));
const FormWizard = React.lazy(() => import('../pages/forms/Wizard'));
const FileUpload = React.lazy(() => import('../pages/forms/FileUpload'));
const Editors = React.lazy(() => import('../pages/forms/Editors'));

// charts
const Charts = React.lazy(() => import('../pages/charts/'));

// tables
const BasicTables = React.lazy(() => import('../pages/tables/Basic'));
const AdvancedTables = React.lazy(() => import('../pages/tables/Advanced'));

// maps
const GoogleMaps = React.lazy(() => import('../pages/maps/GoogleMaps'));
const VectorMaps = React.lazy(() => import('../pages/maps/VectorMaps'));

// hashtag

const Category = React.lazy(() => import('../pages/social/Category'));
const Bio = React.lazy(() => import('../pages/social/Bio'));
const Posts = React.lazy(() => import('../pages/social/Posts'));
const Adready = React.lazy(() => import('../pages/social/Adready'));
const Ecommerce = React.lazy(() => import('../pages/social/Ecommerce'));
const Writer = React.lazy(() => import('../pages/social/Writer'));
const ShortWriter = React.lazy(() => import('../pages/social/ShortWriter'));
const Hashtag = React.lazy(() => import('../pages/social/Hashtag'));
const ContentImage = React.lazy(() => import('../pages/social/ContentImage'));
const Search = React.lazy(() => import('../pages/social/expression-wizard'));
const SearchSlogans = React.lazy(() => import('../pages/social/search-slogans'));
const SearchCreative = React.lazy(() => import('../pages/social/search-creative'));
// my card
const MyCard = React.lazy(() => import('../pages/social/MyCard'));
const PhotoEditor = React.lazy(() => import('../pages/social/PhotoEditor'));
const Subscription = React.lazy(() => import('../pages/social/Subscription'));

const FullBlog = React.lazy(() => import('../pages/social/FullBlog'));
const FullEditior = React.lazy(() => import('../pages/social/FullEditior'));
const FullProduct = React.lazy(() => import('../pages/social/FullProduct'));
const BlogWizard = React.lazy(() => import('../pages/social/BlogWizard'));
const MoveToNext = React.lazy(() => import('../pages/social/MoveToNext'));
const Blog = React.lazy(() => import('../pages/social/Blog'));

const BlogW = React.lazy(() => import('../pages/social/BlogW'));
const CreativeCloud = React.lazy(() => import('../pages/social/CreativeCloud'));

export interface RoutesProps {
    path: RouteProps['path'];
    name?: string;
    component?: RouteProps['component'];
    route?: any;
    exact?: RouteProps['exact'];
    icon?: string;
    header?: string;
    roles?: string[];
    children?: RoutesProps[];
}

// root routes
const rootRoute: RoutesProps = {
    path: '/',
    exact: true,
    component: () => <Root />,
    route: Route,
};

// my card
const myCardRoute: RoutesProps = {
    path: '/social/mycard',
    exact: true,
    component: () => <MyCard />,
    route: Route,
};

// photo editor
const photoEditorRoute: RoutesProps = {
    path: '/social/PhotoEditor',
    exact: true,
    component: () => <PhotoEditor />,
    route: Route,
};

const mySubscriptionRoute: RoutesProps = {
    path: '/social/subscription',
    exact: true,
    component: () => <Subscription />,
    route: Route,
};

// dashboards
const dashboardRoutes: RoutesProps = {
    path: '/dashboard',
    name: 'Dashboards',
    icon: 'airplay',
    header: 'Navigation',
    children: [
        {
            path: '/dashboard/ecommerce',
            name: 'Ecommerce',
            component: EcommerceDashboard,
            route: PrivateRoute,
        },
        {
            path: '/dashboard/analytics',
            name: 'Analytics',
            component: AnalyticsDashboard,
            route: PrivateRoute,
        },
    ],
};

const calendarAppRoutes: RoutesProps = {
    path: '/apps/calendar',
    name: 'Calendar',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'calendar',
    component: CalendarApp,
    header: 'Apps',
};

const chatAppRoutes: RoutesProps = {
    path: '/apps/chat',
    name: 'Chat',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'message-square',
    component: ChatApp,
};

const emailAppRoutes: RoutesProps = {
    path: '/apps/email',
    name: 'Email',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'mail',
    children: [
        {
            path: '/apps/email/inbox',
            name: 'Inbox',
            component: Inbox,
            route: PrivateRoute,
        },
        {
            path: '/apps/email/details',
            name: 'Email Details',
            component: EmailDetail,
            route: PrivateRoute,
        },
        {
            path: '/apps/email/compose',
            name: 'Compose Email',
            component: EmailCompose,
            route: PrivateRoute,
        },
    ],
};

const projectAppRoutes: RoutesProps = {
    path: '/apps/projects',
    name: 'Projects',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'uil-briefcase',

    children: [
        {
            path: '/apps/projects/list',
            name: 'List',
            component: Projects,
            route: PrivateRoute,
        },
        {
            path: '/apps/projects/details',
            name: 'Detail',
            component: ProjectDetail,
            route: PrivateRoute,
        },
    ],
};

const taskAppRoutes: RoutesProps = {
    path: '/apps/tasks',
    name: 'Tasks',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'clipboard',
    children: [
        {
            path: '/apps/tasks/list',
            name: 'Task List',
            component: TaskList,
            route: PrivateRoute,
        },
        {
            path: '/apps/tasks/kanban',
            name: 'Kanban',
            component: Kanban,
            route: PrivateRoute,
        },
    ],
};

const fileAppRoutes: RoutesProps = {
    path: '/apps/file-manager',
    name: 'File Manager',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'folder-plus',
    component: FileManager,
};

const categoryAppRoutes: RoutesProps = {
    path: '/social/category/:id/:name',
    name: 'Category',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'folder-plus',
    component: Category,
};

const bioAppRoutes: RoutesProps = {
    path: '/bio/:name',
    name: 'Bio',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'folder-plus',
    component: Bio,
};

const postAppRoutes: RoutesProps = {
    path: '/post/:name',
    name: 'Posts',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'folder-plus',
    component: Posts,
};

const adreadyAppRoutes: RoutesProps = {
    path: '/adready/:name',
    name: 'Advertisers',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'folder-plus',
    component: Adready,
};

const ecommerceAppRoutes: RoutesProps = {
    path: '/ecommerce/:name',
    name: 'Ecommerce',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'folder-plus',
    component: Ecommerce,
};

const writerAppRoutes: RoutesProps = {
    path: '/writer/:name',
    name: 'Writer',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'folder-plus',
    component: Writer,
};

const shortWriterAppRoutes: RoutesProps = {
    path: '/shortwriter/:name',
    name: 'Short Writer',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'folder-plus',
    component: ShortWriter,
};

const hashtagAppRoutes: RoutesProps = {
    path: '/hashtag/:name',
    name: 'Hashtag',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'folder-plus',
    component: Hashtag,
};

const contentImageAppRoutes: RoutesProps = {
    path: '/image/:name',
    name: 'Content Image',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'folder-plus',
    component: ContentImage,
};

const fullBlogAppRoutes: RoutesProps = {
    path: '/blog/fullblog',
    name: 'Full Blog',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'folder-plus',
    component: FullBlog,
};

const fullEditiorAppRoutes: RoutesProps = {
    path: '/social/fulleditior',
    name: 'Full Editior',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'folder-plus',
    component: FullEditior,
};

const fullProductAppRoutes: RoutesProps = {
    path: '/social/fullproduct',
    name: 'Full Product',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'folder-plus',
    component: FullProduct,
};

const blogWizardAppRoutes: RoutesProps = {
    path: '/social/blogwizard',
    name: 'Blog Wizard',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'folder-plus',
    component: BlogWizard,
};

const MoveToNextAppRoutes: RoutesProps = {
    path: '/social/move-to-next',
    name: 'Move To Next',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'folder-plus',
    component: MoveToNext,
};
const BlogAppRoutes: RoutesProps = {
    path: '/social/blog',
    name: 'Blog',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'folder-plus',
    component: Blog,
};

const blogWAppRoutes: RoutesProps = {
    path: '/blogwizard/:name',
    name: 'Blog Wizard',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'folder-plus',
    component: BlogW,
};



const cCloudAppRoutes: RoutesProps = {
    path: '/social/creativecloud',
    name: 'Creative Cloud',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'folder-plus',
    component: CreativeCloud,
};

// asss
const appRoutes = [calendarAppRoutes, chatAppRoutes, emailAppRoutes, projectAppRoutes, taskAppRoutes, fileAppRoutes, categoryAppRoutes, bioAppRoutes, postAppRoutes, adreadyAppRoutes, ecommerceAppRoutes, writerAppRoutes, hashtagAppRoutes, shortWriterAppRoutes, contentImageAppRoutes, myCardRoute, photoEditorRoute, mySubscriptionRoute, fullBlogAppRoutes, fullEditiorAppRoutes, fullProductAppRoutes, blogWizardAppRoutes, blogWAppRoutes, MoveToNextAppRoutes, BlogAppRoutes, cCloudAppRoutes];

// pages
const extrapagesRoutes: RoutesProps = {
    path: '/pages',
    name: 'Pages',
    icon: 'package',
    header: 'Custom',
    children: [
        {
            path: '/pages/starter',
            name: 'Starter',
            component: Starter,
            route: PrivateRoute,
        },
        {
            path: '/pages/profile',
            name: 'Profile',
            component: Profile,
            route: PrivateRoute,
        },
        {
            path: '/pages/activity',
            name: 'Activity',
            component: Activity,
            route: PrivateRoute,
        },
        {
            path: '/pages/invoice',
            name: 'Invoice',
            component: Invoice,
            route: PrivateRoute,
        },
        {
            path: '/pages/pricing',
            name: 'Pricing',
            component: Pricing,
            route: PrivateRoute,
        },
        {
            path: '/pages/topup',
            name: 'Topup',
            component: Topup,
            route: PrivateRoute,
        },
    ],
};

const searchAppRoutes: RoutesProps = {
    path: '/social/expression-wizard',
    name: 'Search',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'folder-plus',
    component: Search,
};

const searchSloganAppRoutes: RoutesProps = {
    path: '/social/search-slogans/:id/:name',
    name: 'SearchSlogans',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'folder-plus',
    component: SearchSlogans,
};

const searchCreativeAppRoutes: RoutesProps = {
    path: '/social/search-creative/:id/:name',
    name: 'SearchCreative',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'folder-plus',
    component: SearchCreative,
};



// const searchSloganCardsAppRoutes: RoutesProps = {
//     path: '/social/search-slogans/:name',
//     name: 'Search Slogans',
//     route: PrivateRoute,
//     roles: ['Admin'],
//     icon: 'folder-plus',
//     component: SearchSlogans,
// };


// ui
const uiRoutes: RoutesProps = {
    path: '/components',
    name: 'Components',
    icon: 'package',
    header: 'UI Elements',
    children: [
        {
            path: '/components/ui-elements',
            name: 'UIElements',
            component: UIElements,
            route: PrivateRoute,
        },
        {
            path: '/components/widgets',
            name: 'Widgets',
            component: Widgets,
            route: PrivateRoute,
        },
        {
            path: '/icons',
            name: 'Icons',
            children: [
                {
                    path: '/icons/unicons',
                    name: 'Unicons',
                    component: Unicons,
                    route: PrivateRoute,
                },
                {
                    path: '/icons/feather',
                    name: 'Feather',
                    component: FeatherIcons,
                    route: PrivateRoute,
                },
                {
                    path: '/icons/bootstrap',
                    name: 'Bootstrap Icon',
                    component: BootstrapIcon,
                    route: PrivateRoute,
                },
            ],
        },
        {
            path: '/forms',
            name: 'Forms',
            children: [
                {
                    path: '/forms/basic',
                    name: 'Basic Elements',
                    component: BasicForms,
                    route: PrivateRoute,
                },
                {
                    path: '/forms/advanced',
                    name: 'Form Advanced',
                    component: FormAdvanced,
                    route: PrivateRoute,
                },
                {
                    path: '/forms/validation',
                    name: 'Form Validation',
                    component: FormValidation,
                    route: PrivateRoute,
                },
                {
                    path: '/forms/wizard',
                    name: 'Form Wizard',
                    component: FormWizard,
                    route: PrivateRoute,
                },
                {
                    path: '/forms/upload',
                    name: 'File Upload',
                    component: FileUpload,
                    route: PrivateRoute,
                },
                {
                    path: '/forms/editors',
                    name: 'Editors',
                    component: Editors,
                    route: PrivateRoute,
                },
            ],
        },
        {
            path: '/components/charts',
            name: 'Charts',
            component: Charts,
            route: PrivateRoute,
        },
        {
            path: '/tables',
            name: 'Tables',
            children: [
                {
                    path: '/tables/basic',
                    name: 'Basic',
                    component: BasicTables,
                    route: PrivateRoute,
                },
                {
                    path: '/tables/advanced',
                    name: 'Advanced',
                    component: AdvancedTables,
                    route: PrivateRoute,
                },
            ],
        },
        {
            path: '/maps',
            name: 'Maps',
            children: [
                {
                    path: '/maps/googlemaps',
                    name: 'Google Maps',
                    component: GoogleMaps,
                    route: PrivateRoute,
                },
                {
                    path: '/maps/vectorMaps',
                    name: 'Google Maps',
                    component: VectorMaps,
                    route: PrivateRoute,
                },
            ],
        },
    ],
};

// auth
const authRoutes: RoutesProps[] = [
    {
        path: '/auth/login',
        name: 'Login',
        component: Login,
        route: Route,
    },
    {
        path: '/auth/register',
        name: 'Register',
        component: Register,
        route: Route,
    },
    {
        path: '/auth/confirm',
        name: 'Confirm',
        component: Confirm,
        route: Route,
    },
    {
        path: '/auth/forget-password',
        name: 'Forget Password',
        component: ForgetPassword,
        route: Route,
    },
    {
        path: '/auth/lock-screen',
        name: 'Lock Screen',
        component: LockScreen,
        route: Route,
    },
    {
        path: '/auth/logout',
        name: 'Logout',
        component: Logout,
        route: Route,
    },
];

// public routes
const otherPublicRoutes: RoutesProps[] = [
    // {
    //     path: '/landing',
    //     name: 'landing',
    //     component: Landing,
    //     route: Route,
    // },
    {
        path: '/maintenance',
        name: 'Maintenance',
        component: Maintenance,
        route: Route,
    },
    {
        path: '/error-404',
        name: 'Error - 404',
        component: Error404,
        route: Route,
    },
    {
        path: '/error-500',
        name: 'Error - 500',
        component: Error500,
        route: Route,
    },
];

// flatten the list of all nested routes
const flattenRoutes = (routes: RoutesProps[]) => {
    let flatRoutes: RoutesProps[] = [];

    routes = routes || [];
    routes.forEach((item: RoutesProps) => {
        flatRoutes.push(item);

        if (typeof item.children !== 'undefined') {
            flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
        }
    });
    return flatRoutes;
};

// All routes
const authProtectedRoutes = [rootRoute, dashboardRoutes, ...appRoutes, extrapagesRoutes, uiRoutes, searchAppRoutes, searchSloganAppRoutes, searchCreativeAppRoutes];
const publicRoutes = [...authRoutes, ...otherPublicRoutes];

const authProtectedFlattenRoutes = flattenRoutes([...authProtectedRoutes]);
const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes]);
export { publicRoutes, authProtectedRoutes, authProtectedFlattenRoutes, publicProtectedFlattenRoutes };
