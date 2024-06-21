import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React from "react";
import { useState } from "react";
import { BiSolidLockAlt } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
// import { Link } from 'react-router-dom';
// import "./login.css"

const Login = () => {
  let [name, setUsername] = useState(''); // State for username
  let [password, setPassword] = useState(''); // State for password
  // let [email, setEmail] = useState('');
  let [invalid, setInvalidCredentials] = useState("");

  let navigate = useNavigate();

  const uHandler = (e) => {
    setUsername(e.target.value);
  }

  const pwHandler = (e) => {
    setPassword(e.target.value);
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(name, password);
    try {
      let response = await axios.post(process.env.REACT_APP_BACKEND_URL + 'login', {
        name: name,
        password: password
      },
        {
          auth: {
            name: name,
            password: password
          }
        });

      console.log(response);

      if (response.status === 200 || response.status == 201 && response.data.length > 0) {
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("rname", response.data.name);
        localStorage.setItem("rphone", response.data.phone);
        console.log("Login successful");
        navigate('/');
        // res.send(user);
        // Redirect to the home page or desired route upon successful login
      } else {
        console.log("Invalid credentials");
        setInvalidCredentials("Incorrect username or password!!");
      }
    } catch (error) {
      console.log("Error occurred during login:", error);
      setInvalidCredentials("Incorrect username or password!!");
    }

  }


  return (
        <div className="b1">
          <div className='box'>
            <form>
              <h1>Login!</h1>
              <div className='input'>
                <input type="text" placeholder='Username' onChange={uHandler} />
                <FaUser className="icon" />
              </div>

              <div className='input'>
                <input type="password" placeholder='Password' onChange={pwHandler} />
                <BiSolidLockAlt className="icon" />
              </div>
              <div className='remember'>
                <label><input type="checkbox" />Remember me</label>
                <a href="#">Forgot password</a>
              </div>
              <button type="submit" onClick={submitHandler}>Login</button>
              {/* <Link to="/verify-otp" className="continueButton" onClick={submitHandler}>
            Login
            </Link> */}

              <div className='register'>
                <p>Don't have an account? <a href="/signUp">Register</a></p>
              </div>
              {invalid && <div className="error-message">{invalid}</div>}
            </form>

          </div>
        </div>
    // <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-blue-500">
    //   <div className="bg-sky-300 p-8 rounded-lg shadow-lg w-full max-w-md">
    //     <form>
    //       <h1 className="text-3xl font-bold mb-6 text-center">Login!</h1>
    //       <div className="mb-4 relative">
    //         <input
    //           type="text"
    //           placeholder="Username"
    //           onChange={uHandler}
    //           className="w-full p-2 border rounded"
    //         />
    //         <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
    //       </div>
    //       <div className="mb-4 relative">
    //         <input
    //           type="password"
    //           placeholder="Password"
    //           onChange={pwHandler}
    //           className="w-full p-2 border rounded"
    //         />
    //         <BiSolidLockAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
    //       </div>
    //       <div className="flex justify-between items-center mb-4">
    //         <label className="flex items-center">
    //           <input type="checkbox" className="mr-2" />
    //           Remember me
    //         </label>
    //         <a href="#" className="text-blue-600">Forgot password</a>
    //       </div>
    //       <button
    //         type="submit"
    //         onClick={submitHandler}
    //         className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
    //       >
    //         Login
    //       </button>
    //       <div className="mt-4 text-center">
    //         <p>Don't have an account? <a href="/signUp" className="text-blue-600">Register</a></p>
    //       </div>
    //       {invalid && <div className="mt-4 text-red-600 text-center">{invalid}</div>}
    //     </form>
    //   </div>
    // </div>
  );
}

export default Login;
