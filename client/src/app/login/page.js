"use client";
import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import styles from "../page.module.css";
import axios from "axios";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  const router = useRouter();

  const handleLogin = async (values) => {
    try {
      const { data, status } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/login`,
        values
      );
      if (status === 201) {
        toast.success(data.msg);
        router.push("/");
      } else {
        toast.error(data.msg);
      }
    } catch (err) {
      toast.error("Failed to login!");
    }
  };

  return (
    <div className={styles.signupContainer}>
      <h1>Login</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={(values, { resetForm }) => {
          handleLogin(values);
          resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form className={styles.form}>
            <Field name="email" type="email" />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <Field name="password" type="password" />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <button type="submit">Submit</button>
            <dir>
              Don't have an account? <Link href="/register">Create new.</Link>
            </dir>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
