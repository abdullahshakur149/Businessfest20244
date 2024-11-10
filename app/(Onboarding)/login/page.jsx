"use client"
import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import bflogo from "@/public/bflogo.png";
import { signIn } from "next-auth/react";

const Login = () => {
    // Validation schema using Yup
    const validationSchema = Yup.object({
        email: Yup.string().required('email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting,resetForm }) => {
            console.log(values);

            try {
          
                const { email, password } = values;
          
                const res = await signIn("credentials", {
                  email,
                  password,
                  redirect: false,
                });
          
                if (res.ok) {
                    setSubmitting(true)
                  toast({
                    variant: "default",
                    title: "Success",
                    description: "Login successful!",
                  });
          
                } else {
                    setSubmitting(false)
                  toast({
                    variant: "default",
                    title: "Failed",
                    description: res.error || "Login failed",
                  });
                }
              } catch (error) {
                toast({
                  variant: "default",
                  title: "Error",
                  description: "An unexpected error occurred.",
                });
              } finally {
                setSubmitting(false)
              }
            resetForm();
            // Simulate an API request
              // Simulate a 2-second API request
        },
    });

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-700 to-blue-300">
            {/* Centered Container */}
            <div className="flex items-center justify-center w-full max-w-6xl  p-8 rounded-lg ">
                {/* Left side: Login Form */}
                <div className="w-full lg:w-6/12">
                    
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 bg-gradient-to-r from-white via-purple-500 to-cyan-200 bg-clip-text text-transparent">
                        Login
                    </h1>

                    <div className="form w-full">
                        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
                            {/* email */}
                            <div className="relative mt-6">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder=" "
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    className={`peer w-full px-4 py-4 border bg-gradient-to-r from-white via-purple-500 to-cyan-100 rounded-lg text-gray-700 placeholder-transparent focus:outline-none transition-all ${
                                        formik.errors.email && formik.touched.email
                                            ? 'border-red-500'
                                            : 'border-gray-300 focus:border-purple-500'
                                    }`}
                                />
                                <label
                                    htmlFor="email"
                                    className="absolute left-4 -top-2.5 px-1 peer-focus:bg-white rounded-3xl text-black text-base transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-focus:-top-2.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                >
                                    email
                                </label>
                                {formik.errors.email && formik.touched.email && (
                                    <div className="text-orange-100 text-sm mt-1">{formik.errors.email}</div>
                                )}
                            </div>

                            {/* Password */}
                            <div className="relative mt-6">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder=" "
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    className={`peer w-full px-4 py-4 border bg-gradient-to-r from-white via-purple-500 to-cyan-100 rounded-lg text-gray-700 placeholder-transparent focus:outline-none transition-all ${
                                        formik.errors.password && formik.touched.password
                                            ? 'border-red-500'
                                            : 'border-gray-300 focus:border-purple-500'
                                    }`}
                                />
                                <label
                                    htmlFor="password"
                                    className="absolute left-4 -top-2.5 px-1 peer-focus:bg-white rounded-3xl text-black text-base transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-focus:-top-2.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                >
                                    Password
                                </label>
                                {formik.errors.password && formik.touched.password && (
                                    <div className="text-orange-100 text-sm mt-1">{formik.errors.password}</div>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full py-3 mt-6 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                disabled={formik.isSubmitting}
                            >
                                {formik.isSubmitting ? "Logging in..." : "Log In"}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right side: Image */}
                <div className="hidden lg:block lg:w-6/12 p-8">
                    {/* Right-side image */}
                    <div className="flex justify-center items-center">
                        <Image src={bflogo} alt="BF Logo" width={800} height={200} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
