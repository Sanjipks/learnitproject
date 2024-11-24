const GET_USERS = import.meta.env.VITE_GET_USERS;
const REGISTER_USER = import.meta.env.VITE_REGISTER_USER;
const SIGNIN_USER = import.meta.env.VITE_SIGNIN_USER;
const SIGNIN_USERINFO = import.meta.env.VITE_SIGNEDIN_USERINFO;
const VERIFY_ACCOUNT = import.meta.env.VITE_VERIFY_ACCOUNT;
const AUTH_LOGIN = import.meta.env.VITE_AUTH_LOGIN;
const AUTH_RESENDCODE = import.meta.env.VITE_AUTH_CODE_RESEND;
const FORGOT_PASSWORD = import.meta.env.VITE_FORGOT_PASSWORD;
const RESET_FORGOT_PASSWORD = import.meta.env.VITE_RESET_FORGOT_PASSWORD;
const GET_SERVICES = import.meta.env.VITE_GET_SERVICES;
const ADD_SERVICE = import.meta.env.VITE_ADD_SERVICE;
const SEND_CONTACTUS_MESSAGE = import.meta.env.VITE_CONTACT_US_MSG;
const VIEW_CONTACTUS_MESSAGES = import.meta.env.VITE_CONTACT_US_VIEW_MSG;
const CHANGE_PIMAGE = import.meta.env.VITE_CHANGE_PROFILEIMAGE;
const SEND_CONNECTION_REQ = import.meta.env.VITE_REQ_USERCONNECTION;
const RCV_CONNECTION_REQ = import.meta.env.VITE_ACCEPT_USERCONNECTION;
const VIEW_CONNECTIONS_STATUS = import.meta.env.VITE_VIEW_ALLCONNECTIONS;

export const getUsers = async (
  loggedinUserRole,
  pagenumber,
  loggedInUserId
) => {
  const res = await fetch(
    `${GET_USERS}/${loggedinUserRole}/page=${pagenumber}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        loggedinuserid: loggedInUserId,
      },
    }
  );
  if (!res.ok) throw new Error("Network response was not ok.");
  const data = await res.json();
  return data;
};

//for user registration
export const registerUser = async (inputs) => {
  const res = await fetch(`${REGISTER_USER}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inputs),
  });

  if (!res.ok) throw new Error("Network response was not ok.");

  return res;
};

//user account(email) verification after user registration
export const verifyAccount = async (email, accountVerificationCode) => {
  const res = await fetch(`${VERIFY_ACCOUNT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, accountVerificationCode }),
  });
  if (!res.ok) throw new Error("Network response was not ok.");

  return res;
};

//for user login
export const loginUser = async (inputs) => {
  const res = await fetch(`${SIGNIN_USER}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inputs),
  });

  if (!res.ok) throw new Error("Network response was not ok.");

  return res;
};

//authenticate user during signin process
export const authLogin = async (email, authCode) => {
  const res = await fetch(`${AUTH_LOGIN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, authCode }),
  });
  if (!res.ok) throw new Error("Network response was not ok.");

  return res;
};

//to resend authcode
export const authCodeResend = async (email, token) => {
  const res = await fetch(`${AUTH_RESENDCODE}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, token }),
  });
  if (!res.ok) throw new Error("Network response was not ok.");

  return res;
};

//to request new password
export const forgotPassword = async (email) => {
  const res = await fetch(`${FORGOT_PASSWORD}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  return res;
};

//set new password
export const resetForgotPassword = async (password, email) => {
  const res = await fetch(`${RESET_FORGOT_PASSWORD}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return res;
};

// delete user adminonly
export const deleteUser = async (id, loggedinUserRole) => {
  const res = await fetch(`${GET_USERS}/${id}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ loggedinUserRole }),
  });
  return res;
};

//get individual user info
export const getUserInfo = async (email) => {
  const res = await fetch(`${SIGNIN_USERINFO}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  return res;
};

//to get list of services
export const getServices = async (pagenumber) => {
  const res = await fetch(`${GET_SERVICES}/page=${pagenumber}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Network response was not ok.");
  const data = await res.json();
  return data;
};

//to add new services
export const addServices = async (bodyData) => {
  const res = await fetch(`${ADD_SERVICE}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });
  return res;
};

// delete service adminonly
export const deleteService = async (id, loggedinUserRole) => {
  const res = await fetch(`${GET_SERVICES}/${id}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ loggedinUserRole }),
  });
  return res;
};

//send message
export const sendContactUsMessages = async (useremail, username, message) => {
  const res = await fetch(`${SEND_CONTACTUS_MESSAGE}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ useremail, username, message }),
  });

  return res;
};

//view messageInfo
export const viewMessageInfo = async (loggedinUserRole) => {
  const res = await fetch(`${VIEW_CONTACTUS_MESSAGES}/${loggedinUserRole}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Network response was not ok.");
  const data = await res.json();
  return data;
};

// delete message adminonly
export const deleteMessageInfo = async (id, loggedinUserRole) => {
  const res = await fetch(`${VIEW_CONTACTUS_MESSAGES}/${id}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ loggedinUserRole }),
  });
  return res;
};

//to change profile image
export const changeProfileImage = async (bodyData) => {
  const res = await fetch(`${CHANGE_PIMAGE}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });
  return res;
};

//send connection request
export const sendConnectionReq = async (requester, targetuser) => {
  const res = await fetch(`${SEND_CONNECTION_REQ}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ requester, targetuser }),
  });

  return res;
};

//send connection request
export const rcvConnectionReq = async (requester, targetuser) => {
  const res = await fetch(`${RCV_CONNECTION_REQ}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ requester, targetuser }),
  });

  return res;
};

//to get list of services
export const getAllconnections = async (loggedInUserId) => {
  const res = await fetch(`${VIEW_CONNECTIONS_STATUS}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      loggedinuserid: loggedInUserId,
    },
  });
  if (!res.ok) throw new Error("Network response was not ok.");
  const data = await res.json();
  return data;
};

//to create a group chat

export const createGroupChat = async (creater, groupChatName) => {
  const res = await fetch(`${RCV_CONNECTION_REQ}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ creater, groupChatName }),
  });

  return res;
};

export const constSubmitPayment = async (userinfo, cardinfo) => {
  const res = await fetch(`${SUBMIT_PAYMENT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userinfo, cardinfo }),
  });

  return res;
};
