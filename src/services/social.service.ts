import config from '../config';
import axios from 'axios';
import errorHandler from '../request/errorHandler';
import successHandler from '../request/successHandler';
import { APICore } from '../helpers/api/apiCore';

export const contentPost = async (postName: any, { searchData }: any) => {
  try {

    const api = new APICore();
    const loggedInUser = api.getLoggedInUser();
    searchData.userid = loggedInUser.id;

    console.log(JSON.stringify(searchData));
    // console.log(config.API_URL + `${postName}`);
   // alert(config.API_URL + `${postName}`);
    const response = await fetch(config.API_URL + `${postName}`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(searchData),
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

export const savePost = async (source: any, value: any) => {
  try {
    const api = new APICore();
    const loggedInUser = api.getLoggedInUser();
    const body = JSON.stringify({
      userid: loggedInUser.id,
      source,
      value
    });
    const response = await fetch(config.API_URL + `savepost`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
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

export const saveCategoryPost = async (source: any, value: any) => {
  try {
    const api = new APICore();
    const loggedInUser = api.getLoggedInUser();
    const body = JSON.stringify({
      userid: loggedInUser.id,
      source,
      value
    });
    const response = await fetch('https://casaahaanahotels.com/savepost', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
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
export const wordCountPost = async (source: any, word: any) => {
  try {
    const api = new APICore();
    const loggedInUser = api.getLoggedInUser();
    const body = JSON.stringify({
      userid: loggedInUser.id,
      section: source,
      words: word
    });

    const response = await fetch('https://casaahaanahotels.com/caiwordscount', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
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
export const fetchMyCard = async () => {
  try {
    const api = new APICore();
    const loggedInUser = api.getLoggedInUser();
    const body = JSON.stringify({
      userid: loggedInUser.id
    });
    const response = await fetch('https://casaahaanahotels.com/caishowsaveddata', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
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

export const aiCategory = async () => {
  try {
    const response = await fetch('https://www.cretorial.ai/api/aiCategory', {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
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

export const getCategoryKeywordResult = async (category: any, categoryid: any, exactMatch: boolean, subCategory: string) => {
  try {
    const id = localStorage.getItem("id");
    const body = JSON.stringify({
      "terms": parseInt(categoryid) > 0 ? "" : category,
      "cats": subCategory,
      "catsid":
        parseInt(categoryid) > 0 && subCategory == "" ? categoryid : "",
      "tones": "",
      "langs": "English",
      "nwords": "1-150",
      "limit": 100,
      "contexual": exactMatch ? false : true,
      "paid": true,
      "user": "934706d5fbc54e4789088e2b4a9a8742",
      "user_id": id
    });
    console.log(body);
    const response = await fetch('https://www.cretorial.ai/cretorial/api/pccardsearch.php', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
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

export const getCategoryResultFromFrank = async (category: any, categoryid: any, exactMatch: boolean, subCategory: string, tonality: any, word: any, categoryChecked: any) => {
  const token = "ac241c06c1c1460eb57f93e34270391d";

  try {

    const body = JSON.stringify({
      "terms": parseInt(categoryid) > 0 ? "" : category,
      "cats": categoryChecked,
      "catsid":
        parseInt(categoryid) > 0 && subCategory == "" ? categoryid : "",
      "tones": tonality,
      "langs": "English",
      "nwords": word != "" ? word : "1-150",
      "limit": 100,
      "contexual": exactMatch ? false : true,
      "paid": true,
      "user": "934706d5fbc54e4789088e2b4a9a8742"
    });
    console.log(body);
    const response = await fetch('https://captiongenie.in/runner/run/pccardsearch', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
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
    console.log(error);
    return errorHandler(error);
  }
};


export const getCreativeResults = async (category: any, categoryid: any, exactMatch: boolean, subCategory: string, tonality: any, word: any, categoryChecked: any) => {
  const token = "ac241c06c1c1460eb57f93e34270391d";

  try {

    const body = JSON.stringify({
      "terms": parseInt(categoryid) > 0 ? "" : category,
      "cats": categoryChecked,
      "catsid":
        parseInt(categoryid) > 0 && subCategory == "" ? categoryid : "",
      "tones": tonality,
      "langs": "English",
      "nwords": word != "" ? word : "1-150",
      "limit": 100
    });
    console.log(body);
    const response = await fetch('https://casaahaanahotels.com/caisearchquote', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
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
    console.log(error);
    return errorHandler(error);
  }
};

export const getCategoryResultFromCategory = async (category: any, categoryid: any, exactMatch: boolean, subCategory: string, tonality: any, word: any, categoryChecked: any) => {
  const token = "ac241c06c1c1460eb57f93e34270391d";

  try {

    const body = JSON.stringify({
      "terms": parseInt(categoryid) > 0 ? "" : category,
      "cats": subCategory,
      "catsid":
        parseInt(categoryid) > 0 ? categoryid : "",
      "tones": tonality,
      "langs": "English",
      "nwords": word != "" ? word : "1-150",
      "limit": 100,
      "contexual": true,
      "paid": true,
      "user": "934706d5fbc54e4789088e2b4a9a8742"
    });
    console.log(body);
    const response = await fetch('https://captiongenie.in/runner/run/pccardsearch', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
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
    console.log(error);
    return errorHandler(error);
  }
};

export const clarifyPost = async (file: any) => {
  try {
    let body = new FormData();
    body.append('upload_img', file);

    const response = await fetch('https://cretorial.ai/cretorial/api/clarify.php', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
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

export const feelConcepts = async (see: any) => {
  try {
    const id = localStorage.getItem("id");
    const body = JSON.stringify({
      "see": see
    });
    console.log(body);
    const response = await fetch('https://www.cretorial.ai/api/get_feel_concepts', {
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

export const findMyExpression = async (see: any, feel: any, concept: any) => {
  try {

    const body = JSON.stringify({
      "user_id": 0,
      "image": "",
      "see": see,
      "feel": feel,
      "concept": concept,
      "count": 200
    });
    console.log(body);
    const response = await fetch('https://cretorial.ai/api/get_feel_concepts_cards1', {
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


export const getWizardLogic = async () => {
  try {
    const response = await fetch('https://www.cretorial.ai/api/get_wizard_logic', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}
export const businessSubCategory = async (categoryid: any) => {
  try {


    const body = JSON.stringify({ "category_id": categoryid, "language": "English" });
    console.log(body);
    const response = await fetch('https://captiongenie.in/runner/run/pcsubcatsforcat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ac241c06c1c1460eb57f93e34270391d',
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

export const tonality = async () => {
  try {
    const body = JSON.stringify({ "language": "English" });
    console.log(body);
    const response = await fetch('https://www.cretorial.ai/cretorial/api/tonality.php', {
      method: 'POST',
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

export const searchSlogans = async (keyword: any) => {
  try {
    const body = JSON.stringify({ "EID": "4a38a59a-dea1-4a01-bf5c-3511219e83a3", "q": keyword });
    // console.log(body);
    const response = await fetch('https://captiongenie.in/executor/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ac241c06c1c1460eb57f93e34270391d',
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

export const searchCreativ = async (keyword: any) => {
  try {
    // console.log(keyword);
    const body = JSON.stringify({ "search": keyword });
    // console.log(body);
    const response = await fetch('https://casaahaanahotels.com/autosearchcreative', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ac241c06c1c1460eb57f93e34270391d',
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

export const filterCategory = async () => {
  try {

    const response = await fetch('https://caption.cretorial.com/api/categoryall', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "languagecode": "English"
      }
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
  //https://caption.cretorial.com/api