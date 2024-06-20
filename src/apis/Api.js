// export const getUsers = async (loggedinUserRole, pagenumber) => {
//   const getUsers = await fetch(
//     `http://localhost:3000/${loggedinUserRole}/users/page=${pagenumber}`
//   );
//   const data = await getUsers.json();
//   return data;
// };

export const getUsers = async (loggedinUserRole, pagenumber) => {
  const getUsers = await fetch(
    `http://localhost:3000/${loggedinUserRole}/users/page=${pagenumber}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await getUsers.json();
  return data;
};

export const getServices = async (pagenumber) => {
  const res = await fetch(`http://localhost:3000/services/page=${pagenumber}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};
