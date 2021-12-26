import { Link } from 'react-router-dom';
import { Formik, ErrorMessage, Field, Form } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from 'axios';

function Signup() {
    const initialValues = {
        username: "",
        email: "",
        password: "",
      };

      const validationSchema = Yup.object().shape({
        username: Yup.string().min(3, 'must be more than 3 characters').max(20, 'must be less than 20 characters').required('required'),
        email: Yup.string().email('invalid email').required('required'),
        password: Yup.string().min(7, 'must be more than 7 characters').required('required'),
      });

        const navigate = useNavigate()

      const onSubmit = async (data) => {
        await axios
        .post('https://grubshare-api.herokuapp.com/api/auth/signup', data)
        .catch(function (error) {
          if (error.response.data) {
            alert(JSON.stringify(error.response.data));
          }
        })
        navigate('/login')
      }

    return (
        <div className="w-full max-w-xs mx-auto my-10 p-5">
            <div className="flex flex-col justify-center mb-10">
                 <h1 className='italic break-words text-2xl mt-3 text-black flex-initial text-center mx-auto'>Sign up to see photos of good eats from your friends.</h1>
                  </div>
                  <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
            <Form className="w-full max-w-sm flex flex-col">

  <div className="flex flex-col border-b border-gray-500 py-2 mb-3">
  <ErrorMessage name="username">
            { msg => <div className="ml-2 text-red-600 text-xs">{msg}</div> }
            </ErrorMessage>
    <Field className="flex-auto appearance-none bg-transparent border-none w-full text-black mr-3 py-1 px-2 leading-tight focus:outline-none" 
    type="text"
    id="inputUsername"
    name="username" 
    placeholder="Please enter username" />
  </div>

  <div className="flex flex-col border-b border-gray-500 py-2 mb-3">
  <ErrorMessage name="email">
            { msg => <div className="ml-2 text-red-600 text-xs">{msg}</div> }
            </ErrorMessage>
    <Field className="flex-auto appearance-none bg-transparent border-none w-full text-black mr-3 py-1 px-2 leading-tight focus:outline-none" 
    type="email"
    id="inputEmail"
    name="email" 
    placeholder="Please enter email"/>
  </div>

  <div className="flex flex-col border-b border-gray-500 py-2 mb-3">
  <ErrorMessage name="password">
            { msg => <div className="ml-2 text-red-600 text-xs">{msg}</div> }
            </ErrorMessage>
    <Field className="flex-auto appearance-none bg-transparent border-none w-full text-black mr-3 py-1 px-2 leading-tight focus:outline-none" 
    type="password"
    id="inputPassword"
    name="password"
    autoComplete="off" 
    placeholder="Please enter password"/>
  </div>

  <button className="my-5 flex-shrink-0 bg-red-400 hover:bg-red-500 text-sm text-white py-1 px-2 rounded" type="submit">
      Sign Up
    </button>

    <div className="sm:flex sm:flex-wrap sm:mb-4 text-sm text-center">
                    <p>Already have an account?<Link to="/login" className="flex-2 no-underline pl-2 hover:underline text-red-400">
                        login
                    </Link></p>
                </div>
</Form>
</Formik>
</div>
    )
}

export default Signup
