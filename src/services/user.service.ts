import config from '../config';
import axios from 'axios';
import errorHandler from '../request/errorHandler';
import successHandler from '../request/successHandler';
import { APICore } from '../helpers/api/apiCore';

export const caiuserlogin = async ({postData}: any) => {
  try {
    const response = await fetch(config.API_URL + `caiuserlogin`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(postData),
    });
    const { status } = response;
    const data = await response.json();

    successHandler(
      { data, status },
      {
        notifyOnSuccess: false,
        notifyOnFailed: true,
      }
    );

    return data;
  } catch (error) {
    return errorHandler(error);
  }
};

export const caisubspayment = async ({postData}: any) => {
  try {
    const response = await fetch(config.API_URL + `caisubspayment`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(postData),
    });
    const { status } = response;
    const data = await response.json();

    successHandler(
      { data, status },
      {
        notifyOnSuccess: false,
        notifyOnFailed: true,
      }
    );

    return data;
  } catch (error) {
    return errorHandler(error);
  }
};

export const caisubscriptions = async () => {
  try {
    const api = new APICore();
    const loggedInUser = api.getLoggedInUser();
    const body = JSON.stringify({
      "userid": loggedInUser.id,
    });
    const response = await fetch(config.API_URL + `caisubscriptions`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
      body
    });
    const { status } = response;
    const data = await response.json();

    successHandler(
      { data, status },
      {
        notifyOnSuccess: false,
        notifyOnFailed: true,
      }
    );

    return data;
  } catch (error) {
    return errorHandler(error);
  }
};

export const postSubscription = async (planId:any, subsid:string) => {
  try {
    const api = new APICore();
    const loggedInUser = api.getLoggedInUser();
    const body = JSON.stringify({
      "user_id": loggedInUser.id,
      "category_id": subsid,
      "plan_id": planId,
      "total_count": 12,
      "key": process.env.REACT_APP_RAZOR_KEY,
      "secret_key": process.env.REACT_APP_RAZOR_SECRET
    });
    console.log("SUBSCRIPTIONDATA"+body);
    const response = await fetch('https://www.cretorial.ai/cretorial/api/createSub.php', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
      body
    });
    const { status } = response;
    const data = await response.json();

    successHandler(
      { data, status },
      {
        notifyOnSuccess: false,
        notifyOnFailed: true,
      }
    );

    return data;
  } catch (error) {
    return errorHandler(error);
  }
}

export const CaiShowSubsData = async () => {
  try {
    const api = new APICore();
    const loggedInUser = api.getLoggedInUser();
    const body = JSON.stringify({
      "userid": loggedInUser.id,
    });
    // console.log(body);
    const response = await fetch(config.API_URL + `caishowsubsdata`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
      body
    });
    const { status } = response;
    const data = await response.json();

    successHandler(
      { data, status },
      {
        notifyOnSuccess: false,
        notifyOnFailed: true,
      }
    );

    return data;
  } catch (error) {
    return errorHandler(error);
  }
}

export const CaiShowSubsUserData = async (userid:any) => {
  try {
    const body = JSON.stringify({
      "userid": userid,
    });
    // console.log(body);
    const response = await fetch(config.API_URL + `caishowsubsdata`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
      body
    });
    const { status } = response;
    const data = await response.json();

    successHandler(
      { data, status },
      {
        notifyOnSuccess: false,
        notifyOnFailed: true,
      }
    );
    return data;
  } catch (error) {
    return false;
    // return errorHandler(error);
  }
}

export const AaiShowSavedData = async () => {
  try {
    const api = new APICore();
    const loggedInUser = api.getLoggedInUser();
    const body = JSON.stringify({
      "userid": loggedInUser.id,
    });
    // console.log(body);
    const response = await fetch(config.API_URL + `caishowsaveddata`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
      body
    });
    const { status } = response;
    const data = await response.json();

    successHandler(
      { data, status },
      {
        notifyOnSuccess: false,
        notifyOnFailed: true,
      }
    );

    return data;
  } catch (error) {
    return errorHandler(error);
  }
}

export const caiShowSubsUsersData = async () => {
  try {
    const api = new APICore();
    const loggedInUser = api.getLoggedInUser();
    const body = JSON.stringify({
      "userid": loggedInUser.id,
    });
    console.log(body);
    const response = await fetch(config.API_URL + `caishowsubsusersdata`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
      body
    });
    const { status } = response;
    const data = await response.json();

    successHandler(
      { data, status },
      {
        notifyOnSuccess: false,
        notifyOnFailed: true,
      }
    );

    return data;
  } catch (error) {
    return errorHandler(error);
  }
}

export const updateSubscription = async (subid:string) => {
  try {
    // console.log(body);
    const response = await fetch(`https://www.cretorial.ai/cretorial/api/createSub.php?subid=${subid}`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
    });
    const { status } = response;
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    // return errorHandler(error);
  }
}

export const caiSubsCancel = async (subsid:any) => {
  try {
    const body = JSON.stringify({
      "subsid": subsid,
    });
    // console.log(body);
    const response = await fetch(config.API_URL + `caisubscancel`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
      body
    });
    const { status } = response;
    const data = await response.json();

    successHandler(
      { data, status },
      {
        notifyOnSuccess: false,
        notifyOnFailed: true,
      }
    );
    return data;
  } catch (error) {
    return false;
    // return errorHandler(error);
  }
}

export const CaiSubsTopUp = async () => {
  try {
    const api = new APICore();
    const loggedInUser = api.getLoggedInUser();
    const body = JSON.stringify({
      "userid": loggedInUser.id,
    });
    console.log(body);
    const response = await fetch(config.API_URL + `caisubstopup`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
      body
    });
    const { status } = response;
    const data = await response.json();

    successHandler(
      { data, status },
      {
        notifyOnSuccess: false,
        notifyOnFailed: true,
      }
    );

    return data;
  } catch (error) {
    return errorHandler(error);
  }
}

export const CaiSubsTopUpPayment = async ({postData}: any) => {
  try {
    const response = await fetch(config.API_URL + `caisubstopuppayment`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(postData),
    });
    const { status } = response;
    const data = await response.json();

    successHandler(
      { data, status },
      {
        notifyOnSuccess: false,
        notifyOnFailed: true,
      }
    );

    return data;
  } catch (error) {
    return errorHandler(error);
  }
};

export const updateSub = async (tag: any) => {   
  try {
    const response = await fetch(`https://www.cretorial.ai/cretorial/api/editor/template.php?search=${tag}`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
    });
    const { status } = response;
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    // return errorHandler(error);
  }
}

export const updateSub1 = async (tag: any) => {   
  try {
    const response = await fetch(`https://www.cretorial.ai/cretorial/api/editor/unsplash.php?search=${tag}`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
    });
    const { status } = response;
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    // return errorHandler(error);
  }
}

export const updateSub2 = async (tag: any) => {   
  try {
    const response = await fetch(`https://cretorial.ai/cretorial/api/editor/getpixabay.php?text=${tag}&per_page=100&type=search`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
    });
    const { status } = response;
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    // return errorHandler(error);
  }
}

export const updateSub3 = async (tag: any) => {   
  try {
    const response = await fetch(`https://cretorial.ai/cretorial/api/editor/pexels.php?text=${tag}&per_page=100&type=search`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
    });
    const { status } = response;
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    // return errorHandler(error);
  }
}

export const imageGallary = async (getKeywordImg: any) => {   
  try {
    const response = await fetch(`https://cretorial.ai/cretorial/api/editor/hashtag-gallery.php?search=${getKeywordImg}`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
    });
    const { status } = response;
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    // return errorHandler(error);
  }
}

export const createCloud = async (postName: any,{ searchData }: any) => {
  try {
    const api = new APICore();
    const loggedInUser = api.getLoggedInUser();
    // searchData.user_id = loggedInUser.id;

    const formData  = new FormData();

    for(const name in searchData) {
      formData.append(name, searchData[name]);
    }


    const response = await fetch(config.API_CLOUD_URL + `${postName}`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      body: formData,
    });
    const { status } = response;
    const data = await response.json();

    successHandler(
      { data, status },
      {
        notifyOnSuccess: false,
        notifyOnFailed: true,
      }
    );
    return data;
  } catch (error) {
    return errorHandler(error);
  }
};

export const shapeCloud = async ({ searchData }: any) => {
  try {
    const api = new APICore();
    const loggedInUser = api.getLoggedInUser();
    // searchData.user_id = loggedInUser.id;

    const formData  = new FormData();

    for(const name in searchData) {
      formData.append(name, searchData[name]);
    }

    const response = await fetch(config.API_CLOUD_URL + `btm-shape-cloud-api`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      body: formData,
    });
    const { status } = response;
    const data = await response.json();

    successHandler(
      { data, status },
      {
        notifyOnSuccess: false,
        notifyOnFailed: true,
      }
    );
    return data;
  } catch (error) {
    return errorHandler(error);
  }
};

export const searchimage = async (keyword:string) => {
  try {
    // console.log(body);
    const response = await fetch(`${config.API_CLOUD_URL}searchajax?search_image_box=${keyword}`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    // return errorHandler(error);
  }
}

export const searchCreativCloud = async (keyword:string) => {
  try {
    // console.log(body);
    const response = await fetch(`${config.API_CLOUD_URL}search-bar-auto-api?search_keyword=${keyword}`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    // return errorHandler(error);
  }
}

export const fontsApi = async () => {
  try {
    // console.log(body);
    const response = await fetch(`${config.API_CLOUD_URL}fonts-api`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    // return errorHandler(error);
  }
}