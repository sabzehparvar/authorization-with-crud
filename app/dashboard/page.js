// "use client";

// const axios = require("axios");
// import { useEffect, useState } from "react";

// // const users = [
// //   {
// //     id: 7,
// //     email: "michael.lawson@reqres.in",
// //     first_name: "Michael",
// //     last_name: "Lawson",
// //     avatar: "https://reqres.in/img/faces/7-image.jpg",
// //   },
// //   {
// //     id: 8,
// //     email: "lindsay.ferguson@reqres.in",
// //     first_name: "Lindsay",
// //     last_name: "Ferguson",
// //     avatar: "https://reqres.in/img/faces/8-image.jpg",
// //   },
// //   {
// //     id: 9,
// //     email: "tobias.funke@reqres.in",
// //     first_name: "Tobias",
// //     last_name: "Funke",
// //     avatar: "https://reqres.in/img/faces/9-image.jpg",
// //   },
// //   {
// //     id: 10,
// //     email: "byron.fields@reqres.in",
// //     first_name: "Byron",
// //     last_name: "Fields",
// //     avatar: "https://reqres.in/img/faces/10-image.jpg",
// //   },
// //   {
// //     id: 11,
// //     email: "george.edwards@reqres.in",
// //     first_name: "George",
// //     last_name: "Edwards",
// //     avatar: "https://reqres.in/img/faces/11-image.jpg",
// //   },
// //   {
// //     id: 12,
// //     email: "rachel.howell@reqres.in",
// //     first_name: "Rachel",
// //     last_name: "Howell",
// //     avatar: "https://reqres.in/img/faces/12-image.jpg",
// //   },
// // ];

// const Dashboard = () => {
//   const [loading, setLoading] = useState(true)
//   const [data, setData] = useState(null)

//   const fetchData = async () => {

//     try {
//       const response = await axios.get("https://reqres.in/api/users");
//       const data = await response.data.data
//       return data
//     } catch (error) {
//       console.log(error.message);
//     }

//   }

//   useEffect(() => {
//     fetchData().then((response) =>{
//       console.log(response);
//       setData(response);
//       setLoading(false);

//     })

//   },[])

//   return (
//     <section className="grid grid-cols-3 mt-10	">
//       {loading ? (
//         <h2>Loading</h2>
//       ):(
//         data.map((user) => {
//           return (
//             <div className=" text-center h-52 " key={user.id}>
//               <img
//                 className=" mx-auto w-24 h-24"
//                 src={user.avatar}
//                 alt={user.email}
//               />
//               <h3>
//                 {user.first_name} {user.last_name}
//               </h3>
//               <p>{user.email}</p>
//             </div>
//           );
//         })
//       )}

//     </section>
//   );
// };

// export default Dashboard;

import Users, { MembersTable } from "../../components/Users";

const Dashboard = () => {
  return (
    <>
      {/* <Users /> */}
      <MembersTable/>
    </>
  );
};

export default Dashboard;
