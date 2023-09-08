"use client";

// const axios = require("axios");
import { useEffect, useState } from "react";

// const users = [
//   {
//     id: 7,
//     email: "michael.lawson@reqres.in",
//     first_name: "Michael",
//     last_name: "Lawson",
//     avatar: "https://reqres.in/img/faces/7-image.jpg",
//   },
//   {
//     id: 8,
//     email: "lindsay.ferguson@reqres.in",
//     first_name: "Lindsay",
//     last_name: "Ferguson",
//     avatar: "https://reqres.in/img/faces/8-image.jpg",
//   },
//   {
//     id: 9,
//     email: "tobias.funke@reqres.in",
//     first_name: "Tobias",
//     last_name: "Funke",
//     avatar: "https://reqres.in/img/faces/9-image.jpg",
//   },
//   {
//     id: 10,
//     email: "byron.fields@reqres.in",
//     first_name: "Byron",
//     last_name: "Fields",
//     avatar: "https://reqres.in/img/faces/10-image.jpg",
//   },
//   {
//     id: 11,
//     email: "george.edwards@reqres.in",
//     first_name: "George",
//     last_name: "Edwards",
//     avatar: "https://reqres.in/img/faces/11-image.jpg",
//   },
//   {
//     id: 12,
//     email: "rachel.howell@reqres.in",
//     first_name: "Rachel",
//     last_name: "Howell",
//     avatar: "https://reqres.in/img/faces/12-image.jpg",
//   },
// ];

const Users = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  const fetchData = async () => {
    
    try {
      const response = await axios.get("https://reqres.in/api/users");
      const data = await response.data.data
      return data
    } catch (error) {
      console.log(error.message);
    }

    
  }

  useEffect(() => {
    fetchData().then((response) =>{
      console.log(response);
      setData(response);
      setLoading(false);
      
    })
    
  },[])
  
  return (
    <section className="grid grid-cols-3 mt-10	">
      {loading ? (
        <h2>Loading</h2>
      ):(
        data.map((user) => {
          return (
            <div className=" text-center h-52 " key={user.id}>
              <img
                className=" mx-auto w-24 h-24"
                src={user.avatar}
                alt={user.email}
              />
              <h3>
                {user.first_name} {user.last_name}
              </h3>
              <p>{user.email}</p>
              
            </div>
            
          );
        })
      )}
     
     
    </section>
  );
};

export default Users;

///////////////
import axios from "@/api/axios";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { headers } from "next/dist/client/components/headers";
import { useSelector } from "react-redux";
 
// const TABS = [
//   {
//     label: "All",
//     value: "all",
//   },
//   {
//     label: "Monitored",
//     value: "monitored",
//   },
//   {
//     label: "Unmonitored",
//     value: "unmonitored",
//   },
// ];
 
const TABLE_HEAD = ["Member", "Id", "Status", "Employed", ""];
 
const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "John Michael",
    email: "john@creative-tim.com",
    job: "Manager",
    org: "Organization",
    online: true,
    date: "23/04/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    name: "Alexa Liras",
    email: "alexa@creative-tim.com",
    job: "Programator",
    org: "Developer",
    online: false,
    date: "23/04/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    name: "Laurent Perrier",
    email: "laurent@creative-tim.com",
    job: "Executive",
    org: "Projects",
    online: false,
    date: "19/09/17",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    name: "Michael Levi",
    email: "michael@creative-tim.com",
    job: "Programator",
    org: "Developer",
    online: true,
    date: "24/12/08",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    name: "Richard Gran",
    email: "richard@creative-tim.com",
    job: "Manager",
    org: "Executive",
    online: false,
    date: "04/10/21",
  },
];
 
export function MembersTable() {

  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [newUser, setNewUser] = useState({
    first_name: "mojtaba",
    last_name: "sav",
    email: "mojtaba@gmail.com",
    avatar: "https://reqres.in/img/faces/1-image.jpg",
  
})

  const USERS_LIST_URL = "/api/users?page=";
  
  console.log(users);
  const headersConfig = {
    token: useSelector(state => state?.user?.auth?.token)
  }

  const fetchData = async () => {
    
    try {
      const response = await axios.get( USERS_LIST_URL + page,headersConfig);
      const data = await response?.data;
      return data
    } catch (error) {
      console.log(error.message);
    }

    
  }

  
  const addUser = async () => {
    try {
      const response = await axios.post(`https://reqres.in/api/users`,
       newUser);
       const data = await response?.data?.data;
       
    console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData().then((response) =>{
      
      setUsers(response?.data);
      setTotalPages(response?.total_pages);
      setLoading(false);
      
      
    })
    
  },[page])


  useEffect(()=>{
    addUser().then((response) =>{
      console.log(response);
      response? setUsers(...users, data) : ''
    })
  },[])

  const nextPage = () => {
    if (page < totalPages) {
    setPage(page + 1)}
  }

  const prevPage = () => {
    if (page > 0) {
    setPage(page - 1)}
  }

  console.log(totalPages);
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-2 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Members list
            </Typography>
            {/* <Typography color="gray" className="mt-1 font-normal">
              See information about all members
            </Typography> */}
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm">
              Delete
            </Button>
            <Button id="add" onClick={()=> addUser()} className="flex items-center gap-3" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
            </Button>
          </div>
        </div>
        {/* <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div> */}
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users?.map(
              ({ avatar, first_name , last_name , email, job = 'id', org = 'id', online = 'updated', date = 'id', id }, index) => {
                const name = first_name + " " + last_name;
                const isLast = index === users.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={avatar} alt={name} size="sm" />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {name}
                          </Typography>
                          {/* <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {email}
                          </Typography> */}
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {id}
                        </Typography>
                        {/* <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {org}
                        </Typography> */}
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={online ? "Updated" : "offline"}
                          color={online ? "green" : "blue-gray"}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {email}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Edit User">
                        <IconButton variant="text">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
         {` Page ${page} of ${totalPages}`}
        </Typography>
        <div className="flex gap-2">
          <Button disabled={page == 1} onClick={()=> prevPage()} variant="outlined" size="sm">
            Previous
          </Button>
          <Button disabled={page == totalPages} onClick={()=> nextPage()} variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}


