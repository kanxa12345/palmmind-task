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

const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Required")
    .matches(/[A-Z]/, "Must Contain One Uppercase character"),
  rePassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password")], "Passwords does not match"),
});

const Register = () => {
  const router = useRouter();

  const handleRegister = async (values) => {
    try {
      const { data, status } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/register`,
        values
      );
      if (status === 201) {
        toast.success(data.msg);
        //   router.push("/login");
      } else {
        toast.error(data.msg);
      }
    } catch (err) {
      toast.error("Failed to register!");
    }
  };

  return (
    <div className={styles.signupContainer}>
      <h1>Signup</h1>
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          password: "",
          rePassword: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { resetForm }) => {
          handleRegister(values);
          resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form className={styles.form}>
            <Field name="fullName" />
            {errors.fullName && touched.fullName ? (
              <div>{errors.fullName}</div>
            ) : null}
            <Field name="email" type="email" />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <Field name="password" type="password" />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <Field name="rePassword" type="password" />
            {errors.rePassword && touched.rePassword ? (
              <div>{errors.rePassword}</div>
            ) : null}
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
