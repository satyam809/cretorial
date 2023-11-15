import { toast } from 'react-toastify';

import codeMessage from './codeMessage';

const errorHandler = (error:any) => {
  const { response } = error;

  if (response) {
    const message = response.data && response.data.message;

    const errorText = message || codeMessage[response.status];
    const { status } = response;
    toast.error(`${errorText}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    // if (response.data && response.data.jwtExpired) {
    //   history.push('/logout');
    // }
    return response.data;
  } else {
    toast.error(`An error occurred in the server, please check the server.`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return {
      success: false,
      result: null,
      message: 'Cannot connect to the server, Check your internet network',
    };
  }
};

export default errorHandler;
