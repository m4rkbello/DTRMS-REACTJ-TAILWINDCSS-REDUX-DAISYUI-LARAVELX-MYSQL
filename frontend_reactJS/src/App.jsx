/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { connect } from 'react-redux';
import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import ForgotPassword from './components/Auth/admin/ForgotPassword';
import PersonalDetails from './components/Auth/employee/EmployeePersonalDetails';
import Content from './components/layouts/Content';
import Footer from './components/layouts/Footer';
import EmployeeRegister from './components/Auth/employee/EmployeeRegister';

//ADMIN
import UserDetails from './components/Auth/admin/user/UserDetails';
import Login from './components/Auth/admin/Login';
import Register from './components/Auth/admin/Register';

//redux-actions
import { fetchUsers } from './components/redux/actions/userAction';
import { fetchEmployees } from './components/redux/actions/employeeAction';
import { fetchAttendances } from './components/redux/actions/attendanceAction';

function App(props) {
  //FOR AUTHENTICATION-PURPOSES
  const [localStorageHasUserIdData, setLocalStorageHasUserId] = useState('');
  const [sessionStorageHasUserIdData, setSessionStorageHasUserId] = useState('');
  const [localStorageHasToken, setLocalStorageHasToken] = useState('');
  const [sessionStorageToken, setSessionStorageToken] = useState('');
  const [cookiesData, setCookiesData] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    //kuhaon ang data sa localStorage/Session Storage/Cookie 
    const localStorageHasUserId = localStorage.getItem('DTRMS_BY_M4RKBELLO_USER_ID');
    const sessionStorageHasUserId = sessionStorage.getItem('DTRMS_BY_M4RKBELLO_USER_ID');
    const localStorageHasTokenData = localStorage.getItem('DTRMS_BY_M4RKBELLO');
    const sessionStorageHasTokenData = sessionStorage.getItem('DTRMS_BY_M4RKBELLO');
    const cookiesData = document.cookie;

    setLocalStorageHasUserId(localStorageHasUserId);
    setSessionStorageHasUserId(sessionStorageHasUserId);
    setLocalStorageHasToken(localStorageHasTokenData);
    setSessionStorageToken(sessionStorageHasTokenData);
    setCookiesData(cookiesData);

    console.log("ID SA LOCALSTORAGE", localStorageHasUserId);
    console.log("ID SA SESSION STORAGE", sessionStorageHasUserId);
    console.log("ID SA COOKIE", cookiesData);

    props.fetchUsers();
    props.fetchEmployees();
    props.fetchAttendances();
  }, []);

  const destroyAuthentications = () => {
    //para sa localStorage
    localStorage.clear();
    //para sa sessionStorage
    sessionStorage.clear();
    //para sa cookies
    document.cookie.split(';').forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, '')
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });
    window.location.reload();
    navigate("/http://localhost:5173/");
  }

  
  // const usersCollection = props && props.users && props.users.data;
  
  const usersCollection = props?.users; // Accessing users array from props

//  console.log("data sa user", usersCollection);

  
  // console.log("ID CHOI", usersCollection);
  function getUserAuthenticated(usersCollection) {
    let item = [];
  
    // Check if usersCollection is defined and not null
    if (usersCollection && usersCollection.length) {
      for (let ez = 0; ez < usersCollection.length; ez++) {
        if (usersCollection[ez].id == sessionStorageHasUserIdData && usersCollection[ez].id == localStorageHasUserIdData) {
          item.push(usersCollection[ez]);
        }
      }
    }
  
    return item;
  }

  const isAuthenticatedUser = getUserAuthenticated(usersCollection);
  console.log("FINAL DATA", isAuthenticatedUser);

  return (
    <div className="flex flex-col h-screen">
      <div className="navbar bg-amber-100 px-4 py-2 md:px-8 md:py-4">
        {(localStorageHasToken?.length ?? 0) > 0 && (sessionStorageToken?.length ?? 0) !== 0 && (cookiesData?.length ?? 0) > 0 ? (
          <>
            <div className="flex-none">
              <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-5 h-5 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-1">
              <span className="btn btn-ghost text-2xl text-black">Welcome!
              {isAuthenticatedUser && isAuthenticatedUser.map((user, index) => (
                <span className='text-2xl' key={index}>
                  {user.user_email}
                </span>
              ))}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="flex-1">
              <span className="btn btn-ghost text-2xl text-black">DTRMS BY M4RKBELLO</span>
            </div>
          </>
        )}

        {(localStorageHasToken?.length ?? 0) > 0 && (sessionStorageToken?.length ?? 0) !== 0 && (cookiesData?.length ?? 0) > 0 ? (
          <>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-amber-100 rounded-box w-52">
                <li>
                  <span className="justify-between text-black">
                    Profile <span className="badge bg-black"><span className='text-white'>
                    <Link to="/admin/user/profile-details">
                    Open
                    </Link>
                    </span></span>
                  </span>
                </li>
                <li className='text-black'>
                  Settings
                </li>
                <li className='text-black' onClick={destroyAuthentications}>
                  Logout
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <div>
              <ul className="menu menu-horizontal px-1 text-amber-100 bg-black">
                <li className='shadow-2xl'>
                  <Link to="/qrc">Scan QR</Link>
                </li>
                <li className='shadow-2xl'>
                  <Link to="/admin/login">Login</Link>
                </li>
                <li className='shadow-2xl'>
                  <Link to="/admin/register">Register</Link>
                </li>
                <li className='shadow-2xl'>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>

      <div className="drawer lg:drawer-open flex-1">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center px-4 py-8 md:px-8 md:py-12">
          {(localStorageHasToken?.length ?? 0) > 0 && (sessionStorageToken?.length ?? 0) !== 0 && (cookiesData?.length ?? 0) > 0 ?
            (
              <>
                <Routes>
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/content" element={<Content />} />
                  <Route path="/register" element={<EmployeeRegister />} />
                  <Route path="/admin/user/profile-details" element={<UserDetails />} />

                  
                  </Routes>
                  </>
                ) : (
                  <Routes>
                  <Route path="/admin/login" element={<Login />} />
                  <Route path="/admin/register" element={<Register />} />
                  <Route path="/details" element={<PersonalDetails />} />
              </Routes>
            )}

        </div>

        {(localStorageHasToken?.length ?? 0) > 0 && (sessionStorageToken?.length ?? 0) !== 0 && (cookiesData?.length ?? 0) > 0 ? (
          <>
            <div className="drawer-side">
              <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
              <ul className="menu pt-4 pl-4 pr-4 pb-4 w-80 min-h-full bg-black text-amber-100">
                <li>
                  <Link to="/register" className='text-2xl'>
                    Employee
                  </Link>
                </li>
                <li>
                  <Link to="/content" className='text-2xl'>
                    Content Test
                  </Link>
                </li>
                <li>
                  <Link to="/details" className='text-2xl'>
                    Details Test
                  </Link>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>

          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log("DATA SA MAPTOSTATETOPROPS users", state.userState);
  console.log("DATA SA MAPTOSTATETOPROPS employees", state.employeeState);
  console.log("DATA SA MAPTOSTATETOPROPS attendances", state.attendanceState);
  return {
    users: state.userState.users.data,
    employees: state.employees,
    attendances: state.attendances
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    fetchEmployees: () => dispatch(fetchEmployees()),
    fetchAttendances: () => dispatch(fetchAttendances()),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
