import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
// import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
// import { Tooltip, avatar } from "@material-tailwind/react";
import axios from "@/api/axios";
import { Add } from "@/redux/features/usersSlice";

const ADD_USER_URL = "api/users";
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export default function AddUserModal({
  handleModalClose,
  showModal,
  handleModalConfirm,
}) {
  
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");


  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    setValidEmail(emailRegex.test(email));
  }, [email]);

  const clearInput = () => {
    setEmail("");
    setPassword("");
    setFirst_name("");
    setLast_name("");
  };
  // const usersList = useSelector((state) => state);


  const onCancel = () => {
    handleModalClose();
    clearInput()
  };

  const onConfirm = () => {
    handleModalConfirm();
  };

  const cancelButtonRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(ADD_USER_URL, {
        first_name,
        last_name,
        validEmail,
        validPwd,
      });

      console.log(response);
      if (response.status === 201 && response) {
        dispatch(Add(response?.data));
        onConfirm();
        clearInput();
        console.log("done");
      }
    } catch (error) {
      console.log(error);
    }

  };


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
                              <span>Email</span>
                              <span>
                                {validEmail
                                  ? ""
                                  : " (please enter a valid email)"}
                              </span>
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
                              <br />
                              <p>
                                {validPwd
                                  ? ""
                                  : "( please enter a valid password. 8 to 24 characters. Must include uppercase and lowercase letters, a number and a special character.)"}
                              </p>
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
                              disabled={!validPwd || !validEmail ? true : false}
                              type="submit"
                              className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto disabled:bg-gray-600"
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
