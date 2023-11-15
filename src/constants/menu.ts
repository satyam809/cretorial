export interface MenuItemTypes {
    key: string;
    label: string;
    isTitle?: boolean;
    icon?: string;
    url?: string;
    badge?: {
        variant: string;
        text: string;
    };
    parentKey?: string;
    target?: string;
    children?: MenuItemTypes[];
}

const MENU_ITEMS: MenuItemTypes[] = [
    // {
    //     key: 'dashboards',
    //     label: 'Dashboards',
    //     isTitle: false,
    //     icon: 'home',
    //     // badge: { variant: 'success', text: '02' },
    //     children: [
    //         // {
    //         //     key: 'ds-ecommerce',
    //         //     label: 'Ecommerce',
    //         //     url: '/dashboard/ecommerce',
    //         //     parentKey: 'dashboards',
    //         // },
    //         {
    //             key: 'ds-analytics',
    //             label: 'Analytics',
    //             url: '/dashboard/analytics',
    //             parentKey: 'dashboards',
    //         },
    //     ],
    // },
    {
        key: 'dashboards',
        label: 'Dashboard',
        isTitle: false,
        icon: 'home',
        url: '/dashboard/analytics',
    },

    { key: 'apps', label: '', isTitle: true },
    {
        key: 'advanced-features',
        label: 'Advanced Features',
        isTitle: false,
        icon: 'cloud',
        children: [
            {
                key: 'search-creative',
                label: 'Search Creative',
                url: '/social/search-creative/0/Search Creative',
                parentKey: 'advanced-features',
                
            },
            {
                key: 'creative-cloud',
                label: 'Creative Cloud',
                url: '/social/creativecloud',
                parentKey: 'advanced-features',
            },
            {
                key: 'fullblog',
                label: 'Full Blog Wizard',
                url: '/blog/fullblog',
                parentKey: 'advanced-features',
            },
            {
                key: 'fullproduct',
                label: 'Full Product Wizard',
                url: '/social/fullproduct',
                parentKey: 'advanced-features',
            },
        ],
    },
    // {
    //     key: 'blogwizard',
    //     label: 'Blog Wizard',
    //     isTitle: false,
    //     icon: 'compass',
    //     url: '/social/blogwizard',
    // },
    {
        key: 'blogwizard',
        label: 'Advanced Writers Tool',
        isTitle: false,
        icon: 'compass',
        children: [
            {
                key: 'blogwizard-full',
                label: 'Writer Wizard',
                url: '/social/blogwizard',
                parentKey: 'blogwizard',
            },
            {
                key: 'blogwizard-edit',
                label: 'Edit',
                url: '/blogwizard/caitextrewrite',
                parentKey: 'blogwizard',
            },
            {
                key: 'blogwizard-paraphase',
                label: 'Paraphase',
                url: '/blogwizard/caitextimprove',
                parentKey: 'blogwizard',
            },
            {
                key: 'blogwizard-simplify',
                label: 'Simplify',
                url: '/blogwizard/caitextsimplify',
                parentKey: 'blogwizard',
            },
            {
                key: 'blogwizard-make',
                label: 'Make Creative',
                url: '/blogwizard/caimakecreative',
                parentKey: 'blogwizard',
            },
            {
                key: 'blogwizard-write',
                label: 'Write Formal',
                url: '/blogwizard/caiwriteformal',
                parentKey: 'blogwizard',
            },
            {
                key: 'blogwizard-expand',
                label: 'Expand',
                url: '/blogwizard/caitextexpanderbykeyword',
                parentKey: 'blogwizard',
            },
            {
                key: 'blogwizard-caitextshortner',
                label: 'Summaries',
                url: '/blogwizard/caitextshortner',
                parentKey: 'blogwizard',
            },
        ],
    },
    {
        key: 'automated-content',
        label: 'Image',
        isTitle: false,
        icon: 'briefcase',
        children: [
            {
                key: 'hashtags-from-image',
                label: 'Hashtags From Image',
                url: '/image/hashtagimgkeyword',
                parentKey: 'automated-content',
            },
            // {
            //     key: 'slogans-from-image',
            //     label: 'Slogans From Image',
            //     url: '/image/slogans',
            //     parentKey: 'automated-content',
            // },
            {
                key: 'facebook-from-image',
                label: 'Facebook Caption From Image',
                url: '/image/facebookimgkeyword',
                parentKey: 'automated-content',
            },
            {
                key: 'instagram-from-image',
                label: 'Instagram Caption From Image',
                url: '/image/instaimgkeyword',
               
                parentKey: 'automated-content',
            },
            {
                key: 'tweet-from-image',
                label: 'Tweet From Image',
                url: '/image/tweetimgkeyword',
                parentKey: 'automated-content',
            },
            {
                key: 'linkedin-from-image',
                label: 'LinkedIn Post From Image',
                url: '/image/linkedinimgkeyword',
                parentKey: 'automated-content',
            },
            // {
            //     key: 'keyword-files',
            //     label: 'Keyword from files and webpages',
            //     url: '/image/keywordfiles',
            //     parentKey: 'automated-content',
            // },
        ],
    },
    {
        key: 'content-cocial-media',
        label: 'Social Media',
        isTitle: false,
        icon: 'message-square',
        children: [
            {
                key: 'facebook-posts',
                label: 'Facebook posts',
                url: '/post/fbpost',
                parentKey: 'content-cocial-media',
            },
            {
                key: 'instagram-posts',
                label: 'Instagram captions',
                url: '/post/igpost',
                parentKey: 'content-cocial-media',
            },
            {
                key: 'linkedin-posts',
                label: 'LinkedIn posts',
                url: '/post/linkedinpost',
                parentKey: 'content-cocial-media',
            },
            {
                key: 'twitter-posts',
                label: 'Twitter Posts',
                url: '/post/tweetpost',
                parentKey: 'content-cocial-media',
            },
            {
                key: 'snapchat-captions',
                label: 'Snapchat captions',
                url: '/post/snapchatpost',
                parentKey: 'content-cocial-media',
            },
            {
                key: 'youtube-video-description',
                label: 'Youtube video title',
                url: '/post/ytdesc',
                parentKey: 'content-cocial-media',
            },
            {
                key: 'youtube-video-script',
                label: 'Youtube video script',
                url: '/post/ytscript',
                parentKey: 'content-cocial-media',
            },
            {
                key: 'youtube-video-ideas',
                label: 'Youtube video ideas',
                url: '/post/ytideas',
                parentKey: 'content-cocial-media',
            },
            {
                key: 'instagram-bio',
                label: 'Instagram bio',
                url: '/bio/instabio',
                parentKey: 'content-cocial-media',
            },
            {
                key: 'facebook-bio',
                label: 'Facebook bio',
                url: '/bio/facebookbio',
                parentKey: 'content-cocial-media',
            },
            {
                key: 'twitter-bio',
                label: 'Twitter bio',
                url: '/bio/twitterbio',
                parentKey: 'content-cocial-media',
            },
            {
                key: 'linkedin-bio',
                label: 'LinkedIn bio',
                url: '/bio/linkedinbio',
                parentKey: 'content-cocial-media',
            },
            {
                key: 'snapchat-bio',
                label: 'Snapchat bio',
                url: '/bio/snapchatbio',
                parentKey: 'content-cocial-media',
            },
        ],
    },
    {
        key: 'short-form-writer',
        label: 'Writer',
        isTitle: false,
        icon: 'clipboard',
        children: [
            {
                key: 'content-rephrase',
                label: 'Content rephrase',
                url: '/shortwriter/textshortnerbykeyword',
                parentKey: 'short-form-writer',
            },
            {
                key: 'quote-generator',
                label: 'Quote generator',
                url: '/shortwriter/quotesbykeywords',
                parentKey: 'short-form-writer',
            },
            // {
            //     key: 'festival-wishes',
            //     label: 'Festival wishes',
            //     url: '/shortwriter/greetingbybrand',
            //     parentKey: 'short-form-writer',
            // },
            {
                key: 'content-summarizer',
                label: 'Content summarizer',
                url: '/shortwriter/textrewritebykeyword',
                parentKey: 'short-form-writer',
            },
            {
                key: 'call-to-action',
                label: 'Call to action',
                url: '/shortwriter/calltoactionbykeywords',
                parentKey: 'short-form-writer',
            },
            {
                key: 'smart-notifications',
                label: 'Smart notifications',
                url: '/shortwriter/notificationsbykeywords',
                parentKey: 'short-form-writer',
            },
            {
                key: 'slogans',
                label: 'Slogans',
                url: '/shortwriter/sloganskykeywords',
                parentKey: 'short-form-writer',
            },
            {
                key: 'email-subject',
                label: 'Email subject',
                url: '/shortwriter/emailsubjectbykeyword',
                parentKey: 'short-form-writer',
            },
        ],
    },
    {
        key: 'e-commerce-content',
        label: 'E-Commerce',
        isTitle: false,
        icon: 'grid',
        children: [
            {
                key: 'product-descriptions',
                label: 'Product descriptions',
                url: '/ecommerce/productdescbykeyword',
                parentKey: 'e-commerce-content',
            },
            {
                key: 'product-features',
                label: 'Product features',
                url: '/ecommerce/productfeaturecbykeyword',
                parentKey: 'e-commerce-content',
            },
            {
                key: 'product-titles',
                label: 'Product titles',
                url: '/ecommerce/producttitlebykeyword',
                parentKey: 'e-commerce-content',
            },
            {
                key: 'product-name-generator',
                label: 'Product name generator',
                url: '/ecommerce/productnamebykeyword',
                parentKey: 'e-commerce-content',
            },
            {
                key: 'review-responder',
                label: 'Review responder',
                url: '/ecommerce/reviewreplybykeyword',
                parentKey: 'e-commerce-content',
            },
            {
                key: 'seo-keywords',
                label: 'SEO keywords',
                url: '/ecommerce/seokeywordbykeyword',
                parentKey: 'e-commerce-content',
            },
        ],
    },
    {
        key: 'ad-ready',
        label: 'Advertisers',
        isTitle: false,
        icon: 'cpu',
        children: [
            {
                key: 'google-ad-title',
                label: 'Google ad title',
                url: '/adready/googleadtitlepost',
                parentKey: 'ad-ready',
            },
            {
                key: 'google-ad-description',
                label: 'Google ad description',
                url: '/adready/googleaddescpost',
                parentKey: 'ad-ready',
            },
            {
                key: 'facebook-ads',
                label: 'Facebook ads',
                url: '/adready/fbadtitlepost',
                parentKey: 'ad-ready',
            },
            {
                key: 'instagram-ads',
                label: 'Instagram ads',
                url: '/adready/instaadtitlepost',
                parentKey: 'ad-ready',
            },
            {
                key: 'Linkedin-ads',
                label: 'LinkedIn ads',
                url: '/adready/linkedinadtitlepost',
                parentKey: 'ad-ready',
            },
        ],
    },
    {
        key: 'long-form-writer',
        label: 'Long form writer',
        isTitle: false,
        icon: 'bookmark',
        children: [
            {
                key: 'blog',
                label: 'Blog',
                url: '/writer/blogbykeyword',
                parentKey: 'long-form-writer',
            },
            {
                key: 'article',
                label: 'Article',
                url: '/writer/articlebykeyword',
                parentKey: 'long-form-writer',
            },
            {
                key: 'pr-article',
                label: 'PR Article',
                url: '/writer/prarticlebykeyword',
                parentKey: 'long-form-writer',
            },
            {
                key: 'essay',
                label: 'Essay',
                url: '/writer/essaybykeyword',
                parentKey: 'long-form-writer',
            },
            {
                key: 'email',
                label: 'Email',
                url: '/writer/emailbykeyword',
                parentKey: 'long-form-writer',
            },
            {
                key: 'cover-letter',
                label: 'Cover letter',
                url: '/writer/coverletterbykeyword',
                parentKey: 'long-form-writer',
            },
            {
                key: 'faqs',
                label: 'FAQs',
                url: '/writer/faqbykeyword',
                parentKey: 'long-form-writer',
            },
            {
                key: 'text-expander',
                label: 'Text expander',
                url: '/writer/textexpanderbykeyword',
                parentKey: 'long-form-writer',
            },
            {
                key: 'job-description',
                label: 'Job description',
                url: '/writer/jdbykeyword',
                parentKey: 'long-form-writer',
            },
            {
                key: 'quora-answers',
                label: 'Quora answers',
                url: '/writer/quorabykeyword',
                parentKey: 'long-form-writer',
            },
        ],
    },
    {
        key: 'hashtag-generator',
        label: 'Hashtag generator',
        isTitle: false,
        icon: 'mail',
        children: [
            {
                key: 'hashtags-by-keyword',
                label: 'Hashtags by keyword',
                url: '/hashtag/hashtags-by-keyword',
                parentKey: 'hashtag-generator',
            },
            {
                key: 'hashtags-by-image',
                label: 'Hashtags by image',
                url: '/hashtag/hashtags-by-image',
                parentKey: 'hashtag-generator',
            },
            {
                key: 'hashtags-by-text',
                label: 'Hashtags by text',
                url: '/hashtag/hashtags-by-text',
                parentKey: 'hashtag-generator',
            },
        ],
    },

    { key: 'photowizard', label: '', isTitle: true },
    // {
    //     key: 'hashtag-finder',
    //     label: 'Hashtag Finder',
    //     isTitle: false,
    //     icon: 'hash',
    //     url: '/social/hashtag-finder',
    // },
    {
        key: 'expression-wizard',
        label: 'Expression Wizard',
        isTitle: false,
        icon: 'feather',
        url: '/social/expression-wizard',
    },
    {
        key: 'search-slogans',
        label: 'Search Slogans',
        isTitle: false,
        icon: 'search',
        url: '/social/search-slogans/0/Search Slogans',
    },
    {
        "icon": "book-open",
        "key": "personal-category",
        "label": "Personal Slogans",
        "children": [
            {
                "key": "Attitude",
                "label": "Attitude",
                "parentKey": "personal-category",
                "url": "/social/category/4/Attitude"
            },
            {
                "key": "Advice",
                "label": "Advice",
                "parentKey": "personal-category",
                "url": "/social/category/1/Advice"
            },
            {
                "key": "Art",
                "label": "Art",
                "parentKey": "personal-category",
                "url": "/social/category/3/Art"
            },
            {
                "key": "Animals",
                "label": "Animals",
                "parentKey": "personal-category",
                "url": "/social/category/2/Animals"
            },
            {
                "key": "New Normal",
                "label": "New Normal",
                "parentKey": "personal-category",
                "url": "/social/category/39/New Normal"
            },
            {
                "key": "Birthday",
                "label": "Birthday",
                "parentKey": "personal-category",
                "url": "/social/category/6/Birthday"
            },
            {
                "key": "Business",
                "label": "Business",
                "parentKey": "personal-category",
                "url": "/social/category/7/Business"
            },
            {
                "key": "Career",
                "label": "Career",
                "parentKey": "personal-category",
                "url": "/social/category/8/Career"
            },
            {
                "key": "Celebrity",
                "label": "Celebrity",
                "parentKey": "personal-category",
                "url": "/social/category/9/Celebrity"
            },
            {
                "key": "Days",
                "label": "Days",
                "parentKey": "personal-category",
                "url": "/social/category/10/Days"
            },
            {
                "key": "Family",
                "label": "Family",
                "parentKey": "personal-category",
                "url": "/social/category/11/Family"
            },
            {
                "key": "Fashion",
                "label": "Fashion",
                "parentKey": "personal-category",
                "url": "/social/category/12/Fashion"
            },
            {
                "key": "Feelings",
                "label": "Feelings",
                "parentKey": "personal-category",
                "url": "/social/category/13/Feelings"
            },
            {
                "key": "Festivals",
                "label": "Festivals",
                "parentKey": "personal-category",
                "url": "/social/category/14/Festivals"
            },
            {
                "key": "Fitness",
                "label": "Fitness",
                "parentKey": "personal-category",
                "url": "/social/category/15/Fitness"
            },
            {
                "key": "Food",
                "label": "Food",
                "parentKey": "personal-category",
                "url": "/social/category/16/Food"
            },
            {
                "key": "Friendship",
                "label": "Friendship",
                "parentKey": "personal-category",
                "url": "/social/category/17/Friendship"
            },
            {
                "key": "Happiness",
                "label": "Happiness",
                "parentKey": "personal-category",
                "url": "/social/category/18/Happiness"
            },
            {
                "key": "Life",
                "label": "Life",
                "parentKey": "personal-category",
                "url": "/social/category/19/Life"
            },
            {
                "key": "Love",
                "label": "Love",
                "parentKey": "personal-category",
                "url": "/social/category/20/Love"
            },
            {
                "key": "Motivation",
                "label": "Motivation",
                "parentKey": "personal-category",
                "url": "/social/category/21/Motivation"
            },
            {
                "key": "Nature",
                "label": "Nature",
                "parentKey": "personal-category",
                "url": "/social/category/22/Nature"
            },
            {
                "key": "Spiritualism",
                "label": "Spiritualism",
                "parentKey": "personal-category",
                "url": "/social/category/26/Spiritualism"
            },
            {
                "key": "Philosophy",
                "label": "Philosophy",
                "parentKey": "personal-category",
                "url": "/social/category/23/Philosophy"
            },
            {
                "key": "Startup",
                "label": "Startup",
                "parentKey": "personal-category",
                "url": "/social/category/27/Startup"
            },
            {
                "key": "Time",
                "label": "Time",
                "parentKey": "personal-category",
                "url": "/social/category/28/Time"
            },
            {
                "key": "Wishes",
                "label": "Wishes",
                "parentKey": "personal-category",
                "url": "/social/category/30/Wishes"
            },
            {
                "key": "Travel",
                "label": "Travel",
                "parentKey": "personal-category",
                "url": "/social/category/29/Travel"
            },
            {
                "key": "Witty",
                "label": "Witty",
                "parentKey": "personal-category",
                "url": "/social/category/31/Witty"
            },
            {
                "key": "Books",
                "label": "Books",
                "parentKey": "personal-category",
                "url": "/social/category/40/Books"
            },
            {
                "key": "TV Series",
                "label": "TV Series",
                "parentKey": "personal-category",
                "url": "/social/category/41/TV Series"
            }
        ],
        "isTitle": false
    },
    {
        "icon": "book",
        "key": "business-category",
        "label": "Business Slogans",
        "children": [
            {
                "key": "Beauty",
                "label": "Beauty",
                "parentKey": "business-category",
                "url": "/social/category/5/Beauty"
            },
            {
                "key": "Home Appliances",
                "label": "Home Appliances",
                "parentKey": "business-category",
                "url": "/social/category/33/Home Appliances"
            },
            
            // {
            //     "key": "Bags and Luggage",
            //     "label": "Bags and Luggage",
            //     "parentKey": "business-category",
            //     "url": "/social/category/37/Bags and Luggage"
            // },
            {
                "key": "Home Decor",
                "label": "Home Decor",
                "parentKey": "business-category",
                "url": "/social/category/34/Home Decor"
            },
            {
                "key": "Kitchen Appliances",
                "label": "Kitchen Appliances",
                "parentKey": "business-category",
                "url": "/social/category/36/Kitchen Appliances"
            },
            {
                "key": "Kitchenware",
                "label": "Kitchenware",
                "parentKey": "business-category",
                "url": "/social/category/35/Kitchenware"
            },
            {
                "key": "Restaurant",
                "label": "Restaurant",
                "parentKey": "business-category",
                "url": "/social/category/25/Restaurant"
            },
            {
                "key": "Women's Apparel",
                "label": "Women's Apparel",
                "parentKey": "business-category",
                "url": "/social/category/43/Women's Apparel"
            },
            {
                "key": "Men's Apparel",
                "label": "Men's Apparel",
                "parentKey": "business-category",
                "url": "/social/category/42/Men's Apparel"
            },
            {
                "key": "Kids Wear",
                "label": "Kids Wear",
                "parentKey": "business-category",
                "url": "/social/category/44/Kids Wear"
            },
            {
                "key": "Tour and Travel",
                "label": "Tour and Travel",
                "parentKey": "business-category",
                "url": "/social/category/45/Tour and Travel"
            },
            {
                "key": "Two Wheeler",
                "label": "Two Wheeler",
                "parentKey": "business-category",
                "url": "/social/category/47/Two Wheeler"
            },
            {
                "key": "Four Wheeler",
                "label": "Four Wheeler",
                "parentKey": "business-category",
                "url": "/social/category/48/Four Wheeler"
            },
            {
                "key": "Electronics",
                "label": "Electronics",
                "parentKey": "business-category",
                "url": "/social/category/49/Electronics"
            },
            {
                "key": "Financial Products",
                "label": "Financial Products",
                "parentKey": "business-category",
                "url": "/social/category/50/Financial Products"
            },
            {
                "key": "Technology",
                "label": "Technology",
                "parentKey": "business-category",
                "url": "/social/category/51/Technology"
            },
            {
                "key": "Education",
                "label": "Education",
                "parentKey": "business-category",
                "url": "/social/category/53/Education"
            },
            {
                "key": "Health and Fitness",
                "label": "Health and Fitness",
                "parentKey": "business-category",
                "url": "/social/category/54/Health and Fitness"
            },
            {
                "key": "Jewellery",
                "label": "Jewellery",
                "parentKey": "business-category",
                "url": "/social/category/56/Jewellery"
            },
            {
                "key": "Hotel",
                "label": "Hotel",
                "parentKey": "business-category",
                "url": "/social/category/55/Hotel"
            },
            {
                "key": "Battery",
                "label": "Battery",
                "parentKey": "business-category",
                "url": "/social/category/52/Battery"
            }
        ],
        "isTitle": false
    },
    
    // {
    //     key: 'apps-chat',
    //     label: 'Chat',
    //     isTitle: false,
    //     icon: 'message-square',
    //     url: '/apps/chat',
    // },
    // {
    //     key: 'apps-email',
    //     label: 'Email',
    //     isTitle: false,
    //     icon: 'mail',
    //     children: [
    //         {
    //             key: 'email-inbox',
    //             label: 'Inbox',
    //             url: '/apps/email/inbox',
    //             parentKey: 'apps-email',
    //         },
    //         {
    //             key: 'email-read-email',
    //             label: 'Read Email',
    //             url: '/apps/email/details',
    //             parentKey: 'apps-email',
    //         },
    //         {
    //             key: 'email-compose-email',
    //             label: 'Compose Email',
    //             url: '/apps/email/compose',
    //             parentKey: 'apps-email',
    //         },
    //     ],
    // },
    // {
    //     key: 'apps-projects',
    //     label: 'Projects',
    //     isTitle: false,
    //     icon: 'briefcase',
    //     children: [
    //         {
    //             key: 'project-list',
    //             label: 'List',
    //             url: '/apps/projects/list',
    //             parentKey: 'apps-projects',
    //         },
    //         {
    //             key: 'project-details',
    //             label: 'Details',
    //             url: '/apps/projects/details',
    //             parentKey: 'apps-projects',
    //         },
    //     ],
    // },
    // {
    //     key: 'apps-tasks',
    //     label: 'Tasks',
    //     isTitle: false,
    //     icon: 'clipboard',
    //     children: [
    //         {
    //             key: 'task-list',
    //             label: 'List',
    //             url: '/apps/tasks/list',
    //             parentKey: 'apps-tasks',
    //         },
    //         {
    //             key: 'task-kanban',
    //             label: 'Kanban Board',
    //             url: '/apps/tasks/kanban',
    //             parentKey: 'apps-tasks',
    //         },
    //     ],
    // },
    // {
    //     key: 'apps-file-manager',
    //     label: 'File Manager',
    //     isTitle: false,
    //     icon: 'file-plus',
    //     url: '/apps/file-manager',
    // },
    // { key: 'custom', label: 'Custom', isTitle: true },
    // {
    //     key: 'extra-pages',
    //     label: 'Pages',
    //     isTitle: false,
    //     icon: 'file-text',
    //     children: [
    //         {
    //             key: 'page-starter',
    //             label: 'Starter',
    //             url: '/pages/starter',
    //             parentKey: 'extra-pages',
    //         },
    //         {
    //             key: 'page-profile',
    //             label: 'Profile',
    //             url: '/pages/profile',
    //             parentKey: 'extra-pages',
    //         },
    //         {
    //             key: 'page-activity',
    //             label: 'Activity',
    //             url: '/pages/activity',
    //             parentKey: 'extra-pages',
    //         },
    //         {
    //             key: 'page-invoice',
    //             label: 'Invoice',
    //             url: '/pages/invoice',
    //             parentKey: 'extra-pages',
    //         },
    //         {
    //             key: 'page-pricing',
    //             label: 'Pricing',
    //             url: '/pages/pricing',
    //             parentKey: 'extra-pages',
    //         },
    //         {
    //             key: 'page-maintenance',
    //             label: 'Maintenance',
    //             url: '/maintenance',
    //             target: '_blank',
    //             parentKey: 'extra-pages',
    //         },
    //         {
    //             key: 'page-error-404',
    //             label: 'Error - 404',
    //             url: '/error-404',
    //             parentKey: 'extra-pages',
    //         },
    //         {
    //             key: 'page-error-500',
    //             label: 'Error - 500',
    //             url: '/error-500',
    //             parentKey: 'extra-pages',
    //         },
    //     ],
    // },
    // { key: 'components', label: 'Components', isTitle: true },
    // {
    //     key: 'ui-elements',
    //     label: 'UI Elements',
    //     isTitle: false,
    //     icon: 'package',
    //     url: '/components/ui-elements',
    // },
    // {
    //     key: 'widgets',
    //     label: 'Widgets',
    //     isTitle: false,
    //     icon: 'gift',
    //     url: '/components/widgets',
    // },
    // {
    //     key: 'icons',
    //     label: 'Icons',
    //     isTitle: false,
    //     icon: 'cpu',
    //     children: [
    //         {
    //             key: 'icon-unicons',
    //             label: 'Unicons',
    //             url: '/icons/unicons',
    //             parentKey: 'icons',
    //         },
    //         {
    //             key: 'icon-feather',
    //             label: 'Feather',
    //             url: '/icons/feather',
    //             parentKey: 'icons',
    //         },
    //         {
    //             key: 'icon-bootstrap',
    //             label: 'Bootstrap',
    //             url: '/icons/bootstrap',
    //             parentKey: 'icons',
    //         },
    //     ],
    // },
    // {
    //     key: 'forms',
    //     label: 'Forms',
    //     isTitle: false,
    //     icon: 'bookmark',
    //     children: [
    //         {
    //             key: 'form-basic',
    //             label: 'Basic Elements',
    //             url: '/forms/basic',
    //             parentKey: 'forms',
    //         },
    //         {
    //             key: 'form-advanced',
    //             label: 'Advanced',
    //             url: '/forms/advanced',
    //             parentKey: 'forms',
    //         },
    //         {
    //             key: 'form-validation',
    //             label: 'Validation',
    //             url: '/forms/validation',
    //             parentKey: 'forms',
    //         },
    //         {
    //             key: 'form-wizard',
    //             label: 'Wizard',
    //             url: '/forms/wizard',
    //             parentKey: 'forms',
    //         },
    //         {
    //             key: 'form-editors',
    //             label: 'Editors',
    //             url: '/forms/editors',
    //             parentKey: 'forms',
    //         },
    //         {
    //             key: 'form-upload',
    //             label: 'File Uploads',
    //             url: '/forms/upload',
    //             parentKey: 'forms',
    //         },
    //     ],
    // },
    // {
    //     key: 'charts',
    //     label: 'Charts',
    //     isTitle: false,
    //     icon: 'bar-chart-2',
    //     url: '/components/charts',
    // },
    // {
    //     key: 'tables',
    //     label: 'Tables',
    //     isTitle: false,
    //     icon: 'grid',
    //     children: [
    //         {
    //             key: 'table-basic',
    //             label: 'Basic Tables',
    //             url: '/tables/basic',
    //             parentKey: 'tables',
    //         },
    //         {
    //             key: 'table-advanced',
    //             label: 'Advanced Tables',
    //             url: '/tables/advanced',
    //             parentKey: 'tables',
    //         },
    //     ],
    // },
    // {
    //     key: 'maps',
    //     label: 'Maps',
    //     isTitle: false,
    //     icon: 'map',
    //     children: [
    //         {
    //             key: 'maps-googlemaps',
    //             label: 'Google Maps',
    //             url: '/maps/googlemaps',
    //             parentKey: 'maps',
    //         },
    //         {
    //             key: 'maps-vectormaps',
    //             label: 'Vector Maps',
    //             url: '/maps/vectormaps',
    //             parentKey: 'maps',
    //         },
    //     ],
    // },
    // {
    //     key: 'menu-levels',
    //     label: 'Menu Levels',
    //     isTitle: false,
    //     icon: 'share-2',
    //     children: [
    //         {
    //             key: 'menu-levels-1-1',
    //             label: 'Level 1.1',
    //             url: '/',
    //             parentKey: 'menu-levels',
    //             children: [
    //                 {
    //                     key: 'menu-levels-2-1',
    //                     label: 'Level 2.1',
    //                     url: '/',
    //                     parentKey: 'menu-levels-1-1',
    //                     children: [
    //                         {
    //                             key: 'menu-levels-3-1',
    //                             label: 'Level 3.1',
    //                             url: '/',
    //                             parentKey: 'menu-levels-2-1',
    //                         },
    //                         {
    //                             key: 'menu-levels-3-2',
    //                             label: 'Level 3.2',
    //                             url: '/',
    //                             parentKey: 'menu-levels-2-1',
    //                         },
    //                     ],
    //                 },
    //                 {
    //                     key: 'menu-levels-2-2',
    //                     label: 'Level 2.2',
    //                     url: '/',
    //                     parentKey: 'menu-levels-1-1',
    //                 },
    //             ],
    //         },
    //         {
    //             key: 'menu-levels-1-2',
    //             label: 'Level 1.2',
    //             url: '/',
    //             parentKey: 'menu-levels',
    //         },
    //     ],
    // },
];

const HORIZONTAL_MENU_ITEMS: MenuItemTypes[] = [
    {
        key: 'dashboards',
        icon: 'home',
        label: 'Dashboards',
        isTitle: true,
        children: [
            {
                key: 'ds-ecommerce',
                label: 'Ecommerce',
                url: '/dashboard/ecommerce',
                parentKey: 'dashboards',
            },
            {
                key: 'ds-analytics',
                label: 'Analytics',
                url: '/dashboard/analytics',
                parentKey: 'dashboards',
            },
        ],
    },
    {
        key: 'apps',
        icon: 'layers',
        label: 'Apps',
        isTitle: true,
        children: [
            {
                key: 'apps-calendar',
                label: 'Calendar',
                isTitle: false,
                url: '/apps/calendar',
                parentKey: 'apps',
            },
            {
                key: 'apps-chat',
                label: 'Chat',
                isTitle: false,
                url: '/apps/chat',
                parentKey: 'apps',
            },
            {
                key: 'apps-email',
                label: 'Email',
                isTitle: false,
                parentKey: 'apps',
                children: [
                    {
                        key: 'email-inbox',
                        label: 'Inbox',
                        url: '/apps/email/inbox',
                        parentKey: 'apps-email',
                    },
                    {
                        key: 'email-read-email',
                        label: 'Read Email',
                        url: '/apps/email/details',
                        parentKey: 'apps-email',
                    },
                    {
                        key: 'email-compose-email',
                        label: 'Compose Email',
                        url: '/apps/email/compose',
                        parentKey: 'apps-email',
                    },
                ],
            },
            {
                key: 'apps-projects',
                label: 'Projects',
                isTitle: false,
                parentKey: 'apps',
                children: [
                    {
                        key: 'project-list',
                        label: 'List',
                        url: '/apps/projects/list',
                        parentKey: 'apps-projects',
                    },
                    {
                        key: 'project-details',
                        label: 'Details',
                        url: '/apps/projects/details',
                        parentKey: 'apps-projects',
                    },
                ],
            },
            {
                key: 'apps-tasks',
                label: 'Tasks',
                isTitle: false,
                parentKey: 'apps',
                children: [
                    {
                        key: 'task-list',
                        label: 'List',
                        url: '/apps/tasks/list',
                        parentKey: 'apps-tasks',
                    },
                    {
                        key: 'task-kanban',
                        label: 'Kanban Board',
                        url: '/apps/tasks/kanban',
                        parentKey: 'apps-tasks',
                    },
                ],
            },
            {
                key: 'apps-file-manager',
                label: 'File Manager',
                isTitle: false,
                url: '/apps/file-manager',
                parentKey: 'apps',
            },
        ],
    },
    {
        key: 'components',
        icon: 'briefcase',
        label: 'Components',
        isTitle: true,
        children: [
            {
                key: 'ui-elements',
                label: 'UI Elements',
                isTitle: false,
                url: '/components/ui-elements',
                parentKey: 'components',
            },
            {
                key: 'widgets',
                label: 'Widgets',
                isTitle: false,
                url: '/components/widgets',
                parentKey: 'components',
            },
            {
                key: 'forms',
                label: 'Forms',
                isTitle: false,
                parentKey: 'components',
                children: [
                    {
                        key: 'form-basic',
                        label: 'Basic Elements',
                        url: '/forms/basic',
                        parentKey: 'forms',
                    },
                    {
                        key: 'form-advanced',
                        label: 'Advanced',
                        url: '/forms/advanced',
                        parentKey: 'forms',
                    },
                    {
                        key: 'form-validation',
                        label: 'Validation',
                        url: '/forms/validation',
                        parentKey: 'forms',
                    },
                    {
                        key: 'form-wizard',
                        label: 'Wizard',
                        url: '/forms/wizard',
                        parentKey: 'forms',
                    },
                    {
                        key: 'form-editors',
                        label: 'Editors',
                        url: '/forms/editors',
                        parentKey: 'forms',
                    },
                    {
                        key: 'form-upload',
                        label: 'File Uploads',
                        url: '/forms/upload',
                        parentKey: 'forms',
                    },
                ],
            },
            {
                key: 'charts',
                label: 'Charts',
                isTitle: false,
                url: '/components/charts',
                parentKey: 'components',
            },
            {
                key: 'tables',
                label: 'Tables',
                isTitle: false,
                parentKey: 'components',
                children: [
                    {
                        key: 'table-basic',
                        label: 'Basic Tables',
                        url: '/tables/basic',
                        parentKey: 'tables',
                    },
                    {
                        key: 'table-advanced',
                        label: 'Advanced Tables',
                        url: '/tables/advanced',
                        parentKey: 'tables',
                    },
                ],
            },
            {
                key: 'icons',
                label: 'Icons',
                isTitle: false,
                parentKey: 'components',
                children: [
                    {
                        key: 'icon-unicons',
                        label: 'Unicons',
                        url: '/icons/unicons',
                        parentKey: 'icons',
                    },
                    {
                        key: 'icon-feather',
                        label: 'Feather',
                        url: '/icons/feather',
                        parentKey: 'icons',
                    },
                    {
                        key: 'icon-bootstrap',
                        label: 'Bootstrap',
                        url: '/icons/bootstrap',
                        parentKey: 'icons',
                    },
                ],
            },
            {
                key: 'maps',
                label: 'Maps',
                isTitle: false,
                parentKey: 'components',
                children: [
                    {
                        key: 'maps-googlemaps',
                        label: 'Google Maps',
                        url: '/maps/googlemaps',
                        parentKey: 'maps',
                    },
                    {
                        key: 'maps-vectormaps',
                        label: 'Vector Maps',
                        url: '/maps/vectormaps',
                        parentKey: 'maps',
                    },
                ],
            },
        ],
    },
    {
        key: 'extra-pages',
        label: 'Pages',
        isTitle: false,
        icon: 'file-text',
        children: [
            {
                key: 'page-starter',
                label: 'Starter',
                url: '/pages/starter',
                parentKey: 'extra-pages',
            },
            {
                key: 'page-profile',
                label: 'Profile',
                url: '/pages/profile',
                parentKey: 'extra-pages',
            },
            {
                key: 'page-activity',
                label: 'Activity',
                url: '/pages/activity',
                parentKey: 'extra-pages',
            },
            {
                key: 'page-invoice',
                label: 'Invoice',
                url: '/pages/invoice',
                parentKey: 'extra-pages',
            },
            {
                key: 'page-pricing',
                label: 'Pricing',
                url: '/pages/pricing',
                parentKey: 'extra-pages',
            },
            {
                key: 'page-maintenance',
                label: 'Maintenance',
                url: '/maintenance',
                target: '_blank',
                parentKey: 'extra-pages',
            },
            {
                key: 'page-error-404',
                label: 'Error - 404',
                url: '/error-404',
                parentKey: 'extra-pages',
            },
            {
                key: 'page-error-500',
                label: 'Error - 500',
                url: '/error-500',
                parentKey: 'extra-pages',
            },
        ],
    },
];

const TWO_COl_MENU_ITEMS: MenuItemTypes[] = [
    {
        key: 'dashboards',
        label: 'Dashboards',
        isTitle: true,
        icon: 'home',
        children: [
            {
                key: 'ds-ecommerce',
                label: 'Ecommerce',
                url: '/dashboard/ecommerce',
                parentKey: 'dashboards',
            },
            {
                key: 'ds-analytics',
                label: 'Analytics',
                url: '/dashboard/analytics',
                parentKey: 'dashboards',
            },
        ],
    },
    {
        key: 'apps',
        icon: 'grid',
        label: 'Apps',
        isTitle: true,
        children: [
            {
                key: 'apps-calendar',
                label: 'Calendar',
                isTitle: false,
                icon: 'calendar',
                url: '/apps/calendar',
                parentKey: 'apps',
            },
            {
                key: 'apps-chat',
                label: 'Chat',
                isTitle: false,
                icon: 'message-square',
                url: '/apps/chat',
                parentKey: 'apps',
            },
            {
                key: 'apps-email',
                label: 'Email',
                isTitle: false,
                icon: 'mail',
                parentKey: 'apps',
                children: [
                    {
                        key: 'email-inbox',
                        label: 'Inbox',
                        url: '/apps/email/inbox',
                        parentKey: 'apps-email',
                    },
                    {
                        key: 'email-read-email',
                        label: 'Read Email',
                        url: '/apps/email/details',
                        parentKey: 'apps-email',
                    },
                    {
                        key: 'email-compose-email',
                        label: 'Compose Email',
                        url: '/apps/email/compose',
                        parentKey: 'apps-email',
                    },
                ],
            },
            {
                key: 'apps-projects',
                label: 'Projects',
                isTitle: false,
                icon: 'briefcase',
                parentKey: 'apps',
                children: [
                    {
                        key: 'project-list',
                        label: 'List',
                        url: '/apps/projects/list',
                        parentKey: 'apps-projects',
                    },
                    {
                        key: 'project-details',
                        label: 'Details',
                        url: '/apps/projects/details',
                        parentKey: 'apps-projects',
                    },
                ],
            },
            {
                key: 'apps-tasks',
                label: 'Tasks',
                isTitle: false,
                icon: 'clipboard',
                parentKey: 'apps',
                children: [
                    {
                        key: 'task-list',
                        label: 'List',
                        url: '/apps/tasks/list',
                        parentKey: 'apps-tasks',
                    },
                    {
                        key: 'task-kanban',
                        label: 'Kanban Board',
                        url: '/apps/tasks/kanban',
                        parentKey: 'apps-tasks',
                    },
                ],
            },
            {
                key: 'apps-file-manager',
                label: 'File Manager',
                isTitle: false,
                icon: 'file-plus',
                url: '/apps/file-manager',
                parentKey: 'apps',
            },
        ],
    },
    {
        key: 'extra-pages',
        icon: 'file-text',
        label: 'Pages',
        isTitle: true,
        children: [
            {
                key: 'page-starter',
                label: 'Starter',
                url: '/pages/starter',
                parentKey: 'extra-pages',
            },
            {
                key: 'page-profile',
                label: 'Profile',
                url: '/pages/profile',
                parentKey: 'extra-pages',
            },
            {
                key: 'page-activity',
                label: 'Activity',
                url: '/pages/activity',
                parentKey: 'extra-pages',
            },
            {
                key: 'page-invoice',
                label: 'Invoice',
                url: '/pages/invoice',
                parentKey: 'extra-pages',
            },
            {
                key: 'page-pricing',
                label: 'Pricing',
                url: '/pages/pricing',
                parentKey: 'extra-pages',
            },
            {
                key: 'page-maintenance',
                label: 'Maintenance',
                url: '/maintenance',
                target: '_blank',
                parentKey: 'extra-pages',
            },
            {
                key: 'page-error-404',
                label: 'Error - 404',
                url: '/error-404',
                parentKey: 'extra-pages',
            },
            {
                key: 'page-error-500',
                label: 'Error - 500',
                url: '/error-500',
                parentKey: 'extra-pages',
            },
        ],
    },
    {
        key: 'components',
        icon: 'package',
        label: 'Components',
        isTitle: true,
        children: [
            {
                key: 'base-ui',
                label: 'UI Elements',
                isTitle: false,
                icon: 'package',
                url: '/components/ui-elements',
                parentKey: 'components',
            },
            {
                key: 'icons',
                label: 'Icons',
                isTitle: false,
                icon: 'cpu',
                parentKey: 'components',
                children: [
                    {
                        key: 'icon-unicons',
                        label: 'Unicons',
                        url: '/icons/unicons',
                        parentKey: 'icons',
                    },
                    {
                        key: 'icon-feather',
                        label: 'Feather',
                        url: '/icons/feather',
                        parentKey: 'icons',
                    },
                    {
                        key: 'icon-bootstrap',
                        label: 'Bootstrap',
                        url: '/icons/bootstrap',
                        parentKey: 'icons',
                    },
                ],
            },
            {
                key: 'charts',
                label: 'Charts',
                isTitle: false,
                icon: 'bar-chart-2',
                url: '/components/charts',
                parentKey: 'components',
            },
            {
                key: 'forms',
                label: 'Forms',
                isTitle: false,
                icon: 'bookmark',
                parentKey: 'components',
                children: [
                    {
                        key: 'form-basic',
                        label: 'Basic Elements',
                        url: '/forms/basic',
                        parentKey: 'forms',
                    },
                    {
                        key: 'form-advanced',
                        label: 'Advanced',
                        url: '/forms/advanced',
                        parentKey: 'forms',
                    },
                    {
                        key: 'form-validation',
                        label: 'Validation',
                        url: '/forms/validation',
                        parentKey: 'forms',
                    },
                    {
                        key: 'form-wizard',
                        label: 'Wizard',
                        url: '/forms/wizard',
                        parentKey: 'forms',
                    },
                    {
                        key: 'form-editors',
                        label: 'Editors',
                        url: '/forms/editors',
                        parentKey: 'forms',
                    },
                    {
                        key: 'form-upload',
                        label: 'File Uploads',
                        url: '/forms/upload',
                        parentKey: 'forms',
                    },
                ],
            },
            {
                key: 'tables',
                label: 'Tables',
                isTitle: false,
                icon: 'grid',
                parentKey: 'components',
                children: [
                    {
                        key: 'table-basic',
                        label: 'Basic Tables',
                        url: '/tables/basic',
                        parentKey: 'tables',
                    },
                    {
                        key: 'table-advanced',
                        label: 'Advanced Tables',
                        url: '/tables/advanced',
                        parentKey: 'tables',
                    },
                ],
            },
            {
                key: 'maps',
                label: 'Maps',
                isTitle: false,
                icon: 'map',
                parentKey: 'components',
                children: [
                    {
                        key: 'maps-googlemaps',
                        label: 'Google Maps',
                        url: '/maps/googlemaps',
                        parentKey: 'maps',
                    },
                    {
                        key: 'maps-vectormaps',
                        label: 'Vector Maps',
                        url: '/maps/vectormaps',
                        parentKey: 'maps',
                    },
                ],
            },
            {
                key: 'menu-levels',
                label: 'Menu Levels',
                isTitle: false,
                icon: 'share-2',
                parentKey: 'components',
                children: [
                    {
                        key: 'menu-levels-1-1',
                        label: 'Level 1.1',
                        url: '/',
                        parentKey: 'menu-levels',
                        children: [
                            {
                                key: 'menu-levels-2-1',
                                label: 'Level 2.1',
                                url: '/',
                                parentKey: 'menu-levels-1-1',
                                children: [
                                    {
                                        key: 'menu-levels-3-1',
                                        label: 'Level 3.1',
                                        url: '/',
                                        parentKey: 'menu-levels-2-1',
                                    },
                                    {
                                        key: 'menu-levels-3-2',
                                        label: 'Level 3.2',
                                        url: '/',
                                        parentKey: 'menu-levels-2-1',
                                    },
                                ],
                            },
                            {
                                key: 'menu-levels-2-2',
                                label: 'Level 2.2',
                                url: '/',
                                parentKey: 'menu-levels-1-1',
                            },
                        ],
                    },
                    {
                        key: 'menu-levels-1-2',
                        label: 'Level 1.2',
                        url: '/',
                        parentKey: 'menu-levels',
                    },
                ],
            },
        ],
    },
    {
        key: 'widgets',
        label: 'Widgets',
        isTitle: false,
        icon: 'gift',
        url: '/components/widgets',
    },
];

export { MENU_ITEMS, TWO_COl_MENU_ITEMS, HORIZONTAL_MENU_ITEMS };
