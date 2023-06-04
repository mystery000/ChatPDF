const constants = {
  HOST_URL: process.env.REACT_APP_HOST_URL || 'http://46.175.146.14:5000/apis/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  multipartHeaders: {
    "Content-Type": "multipart/form-data",
    Accept: 'multipart/form-data',
  },
};

export default constants;
