import React, { useState, useEffect } from 'react'
import { Formik, ErrorMessage, Field, Form  } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from 'axios';

function CreatePost() {
const [imagePreview, setImagePreview] = useState(null);
    const initialValues = {
        title: "",
        description: "",
        ingredients: "",
        meal: "",
        image: "",
      };

      const navigate = useNavigate()

      useEffect(() => {
        if (!localStorage.getItem("token")) {
          navigate("/login");
        }
      }, []);
    
      const validationSchema = Yup.object().shape({
        title: Yup.string().required('required'),
        description: Yup.string().min(7, 'must be more than 7 characters').max(155, 'must be less than 155 characters').required('required'),
        ingredients: Yup.string().min(3, 'must be more than 3 characters').max(155, 'must be less than 155 characters').required('required'),
        meal: Yup.string().required('required - please choose a meal type'),
        image: Yup.mixed().required('required - please upload an image file')
      });
   

      const onSubmit = (data) => {
       const body = new FormData();
        body.append('image', data.image)
        axios
        .post("https://grubshare-api.herokuapp.com/api/post/create", data, {
          headers: { token: localStorage.getItem("token") },
        })
        .then((response) => {
          navigate('/')
        });
        }



    return (
        <div className="w-full max-w-xs mx-auto my-10 p-5">
        <div className="flex flex-col justify-center mb-10">
             <h1 className='italic break-words text-2xl mt-3 text-black flex-initial text-center mx-auto'><span className='text-red-400'>Share</span> Your Grub!</h1>
             <button className='mt-3 mx-auto py-1 px-3 rounded-full text-white bg-red-400 hover:bg-red-500' onClick={() => navigate(-1)}>Back</button>
              </div>
              <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  >
          {(formProps) => (
        <Form className="w-full max-w-sm flex flex-col">

<div className="flex flex-col border-b border-gray-500 py-2 mb-3">
<ErrorMessage name="title">
        { msg => <div className="ml-2 text-red-600 text-xs">{msg}</div> }
        </ErrorMessage>
<Field className="flex-auto appearance-none bg-transparent border-none w-full text-black mr-3 py-1 px-2 leading-tight focus:outline-none" 
type="text"
id="inputTitle"
name="title" 
placeholder="Enter title" />
</div>

<div className="flex flex-col border-b border-gray-500 py-2 mb-3">
<ErrorMessage name="description">
        { msg => <div className="ml-2 text-red-600 text-xs">{msg}</div> }
        </ErrorMessage>
<Field className="flex-auto appearance-none bg-transparent border-none w-full text-black mr-3 py-1 px-2 leading-tight focus:outline-none" 
type="text"
id="inputDescription"
name="description" 
placeholder="Enter description"/>
</div>

<div className="flex flex-col py-2">
<ErrorMessage name="meal">
        { msg => <div className="mb-2 text-red-600 text-xs">{msg}</div> }
        </ErrorMessage>
        <div id="inputMeal" role="group" aria-labelledby="meal-radio-group">
            <label>
              <Field type="radio" name="meal" value="homecooked" />
              homecooked
            </label>
            <label>
              <Field className="ml-3" type="radio" name="meal" value="takeout" />
              takeout
            </label>
          </div>
</div>

<div className="flex flex-col border-b border-gray-500 py-2 mb-3">
<ErrorMessage name="ingredients">
        { msg => <div className="ml-2 text-red-600 text-xs">{msg}</div> }
        </ErrorMessage>
<Field className="flex-auto appearance-none bg-transparent border-none w-full text-black mr-3 py-1 px-2 leading-tight focus:outline-none" 
type="text"
id="inputIngredients"
name="ingredients"
placeholder="Enter ingredients"
/>
</div>

<div className="flex flex-col border-b border-gray-500 py-2 mb-3">
<ErrorMessage name="image">
        { msg => <div className="ml-2 text-red-600 text-xs">{msg}</div> }
        </ErrorMessage>
<input className="flex-auto appearance-none bg-transparent border-none w-full text-black mr-3 py-1 px-2 leading-tight focus:outline-none" 
type="file"
accept='image/*'
id="inputImage"
name="image"
onChange={(e) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          if (fileReader.readyState === 2) {
            formProps.setFieldValue('image', fileReader.result);
            setImagePreview(fileReader.result)
          }
        };
        fileReader.readAsDataURL(e.target.files[0]);
      }}
/>
{imagePreview && <img size='md' src={imagePreview} alt="img-preview"/>}
</div>


<button disabled={!formProps.isValid || formProps.isSubmitting} className="my-5 flex-shrink-0 bg-red-400 hover:bg-red-500 text-sm text-white py-1 px-2 rounded" type="submit">
  Post
</button>
</Form>
)}
</Formik>
</div>
    )
}

export default CreatePost