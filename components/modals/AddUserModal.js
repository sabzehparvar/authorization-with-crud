import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { avatar } from "@material-tailwind/react";
import axios from "@/api/axios";
import { Add } from "@/redux/features/usersSlice";

const ADD_USER_URL = "api/users";

export default function AddUserModal({ handleModalClose, showModal, handleModalConfirm }) {
  const dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  // const [newUser, setNewUser] = useState();

  const clearInput = ()=>{
    setEmail('')
    setPassword('')
    setFirst_name('')
    setLast_name('')
  }
  const usersList = useSelector((state) => state);
  
  // const [open, setOpen] = useState(false)
  const onCancel = () => {
    handleModalClose();
  };

  const onConfirm = () => {
    handleModalConfirm()
  }

  const cancelButtonRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(ADD_USER_URL, {
        first_name,
        last_name,
        email,
        password,
      });
      
      console.log(response);
      if(response.status === 201 && response){
        dispatch(Add(response?.data))
        onConfirm()
        clearInput()
        console.log('done');
      }
      
      
      
    } catch (error) {
      console.log(error);
    }

    
    // useEffect(() => {
    //   addUser().then((response) => {
    //     console.log(response);
    //     response ? setUsers(...users, data) : "";
    //   });
    // }, []);

    // try {
    //   const response = await axios.post(LOGIN_URL, {
    //     email,
    //     password,
    //   });
    //   const { token } = response.data;
    //   dispatch(LOGIN({ token, email }));
    //   setTimeout(() => {
    //     router.push("/dashboard");
    //   }, 3000);
    //   if (token && response.statusCode === 200) {
    //     setLoggedIn(true);
    //   }
    // } catch (err) {
    //   alert("Error: " + err.message);
    // }
  };

  // console.log(useSelector(state => state))

  // adding new users
  // const addUser = async () => {

  // };

  return (
    <Transition.Root show={showModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={onCancel}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    {/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div> */}
                    <div className=" w-full mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Add new member
                      </Dialog.Title>
                      <div className="mt-2 ">
                        <form onSubmit={handleSubmit} className="mt-6">
                          <div className="mb-4">
                            <label
                              htmlFor="first_name"
                              className="block text-sm font-semibold text-gray-800"
                            >
                              First Name
                            </label>
                            <input
                              id="first_name"
                              required={true}
                              value={first_name}
                              type="text"
                              onChange={(e) => setFirst_name(e.target.value)}
                              className="w-full block px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor="last_name"
                              className="block text-sm font-semibold text-gray-800"
                            >
                              Last Name
                            </label>
                            <input
                              id="last_name"
                              required={true}
                              value={last_name}
                              type="text"
                              onChange={(e) => setLast_name(e.target.value)}
                              className="w-full block px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor="email"
                              className="block text-sm font-semibold text-gray-800"
                            >
                              Email
                            </label>
                            <input
                              id="email"
                              required={true}
                              value={email}
                              type="email"
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full block px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                          </div>
                          <div className="mb-2">
                            <label
                              htmlFor="password"
                              className="block text-sm font-semibold text-gray-800"
                            >
                              Password
                            </label>
                            <input
                              id="password"
                              required={true}
                              value={password}
                              type="password"
                              onChange={(e) => setPassword(e.target.value)}
                              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                          </div>
                          <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                              type="submit"
                              className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                            >
                              Confirm
                            </button>
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                              onClick={() => onCancel()}
                              ref={cancelButtonRef}
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
