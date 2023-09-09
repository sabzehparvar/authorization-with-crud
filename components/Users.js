"use client";

import { useEffect, useState } from "react";
import axios from "@/api/axios";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import AddUserModal from "./modals/AddUserModal";
import DeleteUserModal from "./modals/DeleteUserModal";


const TABLE_HEAD = ["Name", "Id", "Status", "Email", "Edit"];
const USERS_LIST_URL = "/api/users?page=";


export default function Users() {
  
  // states
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showDeletModal, setShowDeletModal] = useState(false);


  // accessing token 
  const token = useSelector((state) => state?.user?.auth?.token);


  // modal handlers 
  function handleModalOpen() {
    setShowModal(true);
  }
  function handleDeleteModalOpen() {
    setShowDeletModal(true);
  }
  function handleModalClose() {
    setShowModal(false);
  }

  function handleDeleteModalClose() {
    setShowDeletModal(false);
  }


  // fetching users data from server
  const fetchData = async () => {
    try {
      const response = await axios.get(USERS_LIST_URL + page, {
        headers: { Authorization: `${token}` },
      });

      const data = await response?.data;
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData().then((response) => {
      const membersList = response?.data
      setUsers(membersList);

      setTotalPages(response?.total_pages);
      setLoading(false);
    });
  }, [page]);

  

  
// pagination buttons
  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };


  // add new user to the list
  const newUsers = useSelector((state) => state?.usersPersistReducer.users);
 
  function handleModalConfirm() {
    setShowModal(false);
    
  }

  useEffect(()=> {

    setUsers([...users, ...newUsers]);
  },[newUsers])

  const uniqueState = [...new Set(users.map(item => item))];
console.log(uniqueState);
  return (<>
    
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-2 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Members list
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button onClick={handleDeleteModalOpen} variant="outlined" size="sm">
              Delete
            </Button>
            <Button
              id="add"
              onClick={handleModalOpen}
              className="flex items-center gap-3"
              size="sm"
            >
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
            </Button>
          </div>
        </div>
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
            { loading ? (
              
            <tr>
            <td className=" text-center p-20" >
              Loading...
            </td>
          </tr>) : (uniqueState?.map(
              (
                {
                  avatar,
                  first_name,
                  last_name,
                  email,
                  job = "id",
                  org = "id",
                  online = "updated",
                  date = "id",
                  id,
                },
                index
              ) => {
                const name = first_name + " " + last_name;
                const isLast = index === users.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={avatar? avatar: 'https://www.pngkey.com/png/detail/114-1149847_avatar-unknown-dp.png'} alt={name} size="sm" />
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
              }
            ))}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {` Page ${page} of ${totalPages}`}
        </Typography>
        <div className="flex gap-2">
          <Button
            disabled={page == 1}
            onClick={() => prevPage()}
            variant="outlined"
            size="sm"
          >
            Previous
          </Button>
          <Button
            disabled={page == totalPages}
            onClick={() => nextPage()}
            variant="outlined"
            size="sm"
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
    <AddUserModal showModal={showModal}
    handleModalClose ={handleModalClose}
    handleModalConfirm = {handleModalConfirm} />
    <DeleteUserModal showDeletModal={showDeletModal}
    handleDeleteModalClose ={handleDeleteModalClose}
     />
    </>
  );
}
