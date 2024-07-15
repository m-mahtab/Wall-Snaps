import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const DummyLogin = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  


  axios.defaults.withCredentials = true;

  const [loading, setLoading] = useState(false);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });


  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    axios
      .post("http://localhost:5000/users", values,)
      .then((res) => {
        if(res.data.login){
          setIsAuthenticated(true);

        }else{
          alert('No Record')
        }
        resetForm();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        setSubmitting(false);
      });
  };


  return (
    <div className="bg-white flex flex-wrap justify-center items-center min-h-screen">
      <div className="h-auto">
        <div className="flex justify-center items-center">
          <h1 className="font-semibold text-3xl mb-5">Wallsnaps.</h1>
        </div>
        <div className="shadow-slate-200 shadow-xl rounded-xl border-t-3 border-black">
          <div className="py-7 text-xl border-b-2 border-b-slate-100">
            <h2 className="black-bar relative px-8 font-semibold text-2xl ">
              Log In
            </h2>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="p-10 w-450">
                <div className="mb-4">
                  <label className="block mb-2">Username</label>
                  <Field
                    type="text"
                    name="username"
                    className="mt-1 py-4 px-5 rounded-full border bg-white border-slate-200 w-full"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Password</label>
                  <Field
                    type="password"
                    name="password"
                    className="mt-1 py-4 px-5 rounded-full border border-slate-200 w-full"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-cus-black mt-4 text-white px-9 py-3 rounded-full font-semibold btn-shadow"
                  disabled={loading || isSubmitting}
                >
                  {loading || isSubmitting ? "Logging in..." : "Log In"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default DummyLogin;
