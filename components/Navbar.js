import Link from "next/link";
import { useSelector } from "react-redux";

function Navbar() {
  const token = useSelector(state => state?.authPersistReducer?.user?.auth?.token)
  const email = useSelector(state => state?.authPersistReducer?.user?.email)

  const name = email?.split("@")[0]
  
  return (
    <>
      <nav className=" px-40 py-10 flex justify-between">
        <ul className="flex items-center">
          <li className="mr-8">
            {
              token ? (<h3>Hi {name}</h3>):''
            }
          </li>

          <li className=" mr-8 ">
            <Link href="dashboard">
              <span>Dashboard</span>
            </Link>
          </li>

          <li >
            {token? (<Link href="/">Log out</Link>):(<Link href="/">Login</Link>)}
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
