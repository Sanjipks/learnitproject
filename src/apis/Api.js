// export const getUsers = async (loggedinUserRole, pagenumber) => {
//   const getUsers = await fetch(
//     `http://localhost:3000/${loggedinUserRole}/users/page=${pagenumber}`
//   );
//   const data = await getUsers.json();
//   return data;
// };

// to get userlist

const GET_SERVICES = import.meta.env.VITE_GET_SERVICES;
const GET_USERS = import.meta.env.VITE_GET_USERS;
const REGISTER_USER = import.meta.env.VITE_REGISTER_USER;
const SIGNIN_USER = import.meta.env.VITE_SIGNIN_USER;
const VERIFY_ACCOUNT = import.meta.env.VITE_VERIFY_ACCOUNT;

export const getUsers = async (loggedinUserRole, pagenumber) => {
  const res = await fetch(
    `${GET_USERS}/${loggedinUserRole}/page=${pagenumber}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) throw new Error("Network response was not ok.");
  const data = await res.json();
  return data;
};

//to get list of services
export const getServices = async (pagenumber) => {
  const res = await fetch(`${GET_SERVICES}${pagenumber}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
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
