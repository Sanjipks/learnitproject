export const getUsers = async (loggedinUserRole, pagenumber) => {
  const getUsers = await fetch(
    `http://localhost:3000/${loggedinUserRole}/users/page=${pagenumber}`
  );
  const data = await getUsers.json();
  return data;
};

// const response = await fetch(
//   `http://localhost:3000/${loggedinUserRole}/users/page=${pagenumber}`,
//   {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   }
// );
