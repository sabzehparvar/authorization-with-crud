"use client";

import { useEffect, useState } from "react";
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
import { stringify } from "postcss";
import AddUserModal from "./AddUserModal";

const TABLE_HEAD = ["Member", "Id", "Status", "Employed", ""];
const USERS_LIST_URL = "/api/users?page=";
const ADD_USER_URL = "api/users";



export default function Users() {

  const token = useSelector((state) => state?.user?.auth?.token);

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [newUser, setNewUser] = useState({
    first_name: "mojtaba",
    last_name: "sav",
    email: "mojtaba@gmail.com",
    avatar: "https://reqres.in/img/faces/1-image.jpg",
  });
  const [showModal, setShowModal] = useState(false);

  function handleModalOpen() {
    setShowModal(true);
  }

  function handleModalClose() {
    setShowModal(false);
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

      setUsers(response?.data);
      setTotalPages(response?.total_pages);
      setLoading(false);
    });
  }, [page]);

  // adding new users 
  const addUser = async () => {
    try {
      const response = await axios.post(ADD_USER_URL, newUser);
      const data = await response?.data?.data;

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    addUser().then((response) => {
      console.log(response);
      response ? setUsers(...users, data) : "";
    });
  }, []);

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

  console.log(totalPages);
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
            <Button variant="outlined" size="sm">
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
            { loading ? (<div>
            <Typography className=" text-center p-20" variant="h5" color="blue-gray">
              Loading...
            </Typography>
          </div>) : (users?.map(
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
    handleModalClose ={handleModalClose} />
    </>
  );
}
