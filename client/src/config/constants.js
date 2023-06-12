const constants = {
  // HOST_URL: process.env.REACT_APP_HOST_URL || 'http://localhost:5000/api/',
  HOST_URL: process.env.REACT_APP_HOST_URL || '/api/',
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
