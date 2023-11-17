// "use client";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import Link from "next/link";
// import { FaYahoo, FaMicrosoft, FaGoogle } from "react-icons/fa";
// import "react-toastify/dist/ReactToastify.css";
// import { toast } from "react-toastify";
// import { signup } from "@/appwrite/auth.actions";
// import { useRouter } from "next/navigation";
// import { NextPage } from "next";
// import Image from "next/image";

// interface SignUpFormData {
//   name: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
// }

// export  const Page: NextPage = () => {
//   const [showOptions, setShowOptions] = useState<boolean>(true);
//   const [showForm, setShowForm] = useState<boolean>(false);
//   const [error, setError] = useState<string>("");
//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors, isSubmitting },
//     reset,
//   } = useForm<SignUpFormData>();

//   const onSubmit = async (data: SignUpFormData) => {
//     // Handle form submission, like making an API call
//     // ...
//     try {
//       await signup(data);
//       toast.success("User created successfully");
//       router.push("/login");
//     } catch (error: any) {
//       toast.error(error.message);
//     }

//     reset();
//   };

//   return (
//     <div className="md:flex justify-center items-center sm:h-screen">
//       <div className="clip-path w-full md:w-[50%] h-[15%] md:h-full bg-slate-900 flex items-center justify-center">
//         <Image
//           className="h-[6rem] md:h-auto"
//           src="/se.png"
//           alt=""
//           width={200}
//           height={200}
//         />
//       </div>
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="flex flex-col sm:items-center sm:justify-center md:w-[50%] h-full p-4"
//       >
//         <div className="w-full md:w-[50%]">
//           {error && <p className="text-red-500">{error}</p>}
//           {showOptions && (
//             <>
//               <div className="flex flex-col gap-4">
//                 <button
//                   className="flex items-center justify-center gap-3 w-full border-2 rounded h-[2.5rem]"
//                   type="button"
//                 >
//                   <FaMicrosoft />
//                   Continue with Microsoft
//                 </button>
//                 <button
//                   className="flex items-center justify-center gap-3 border-2 rounded w-full h-[2.5rem]"
//                   type="button"
//                 >
//                   <FaGoogle />
//                   Continue with Google
//                 </button>
//                 <button className="flex items-center justify-center gap-2 border-2 rounded  h-[2.5rem]">
//                   <FaYahoo /> Continue with Yahoo
//                 </button>
//                 <h2 className="line-aside border-b flex justify-center">
//                   <span className="mb-2">OR</span>
//                 </h2>
//               </div>
//             </>
//           )}

//           <div>
//             <button
//               className="border-2 rounded w-full h-[2.5rem] mt-[1rem] mb-[1.3rem]"
//               type="button"
//               onClick={() => {
//                 setShowForm(!showForm);
//                 setShowOptions(!showOptions);
//               }}
//             >
//               {showOptions ? "Continue with Email" : "Other Options"}
//             </button>
//           </div>

//           {showForm && (
//             <>
//               {/* Name Input */}
//               <div className="group mb-[1.5rem] ">
//                 <input
//                   {...register("name", { required: "Name is required" })}
//                   type="text"
//                   className="input w-full"
//                   placeholder="name"
//                 />
//                 {errors.name && (
//                   <p className="text-red-500">{errors.name.message}</p>
//                 )}
//               </div>

//               {/* Email Input */}
//               <div className="group mb-[1.5rem] ">
//                 <input
//                   {...register("email", {
//                     required: "Email is required",
//                     pattern: {
//                       value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                       message: "Invalid email address",
//                     },
//                   })}
//                   type="email"
//                   placeholder="email"
//                   className="input w-full"
//                 />
//                 {errors.email && (
//                   <p className="text-red-500">{errors.email.message}</p>
//                 )}
//               </div>

//               {/* Password Input */}
//               <div className="group mb-[1.5rem] ">
//                 <input
//                   {...register("password", {
//                     required: "Password is required",
//                     minLength: {
//                       value: 8,
//                       message: "Password must be at least 8 characters",
//                     },
//                   })}
//                   type="password"
//                   placeholder="password"
//                   className="input w-full"
//                 />
//                 {errors.password && (
//                   <p className="text-red-500">{errors.password.message}</p>
//                 )}
//               </div>

//               {/* Confirm Password Input */}
//               <div className="group mb-[1.5rem] ">
//                 <input
//                   {...register("confirmPassword", {
//                     validate: (value) =>
//                       value === watch("password") ||
//                       "The passwords do not match",
//                   })}
//                   type="password"
//                   placeholder="confirm password"
//                   className="input w-full"
//                 />
//                 {errors.confirmPassword && (
//                   <p className="text-red-500">
//                     {errors.confirmPassword.message}
//                   </p>
//                 )}
//               </div>

//               <button
//                 className="auth-btn flex items-center justify-center border-none text-white h-[2.55rem] w-full mb-2 rounded"
//                 disabled={isSubmitting}
//               >
//                 Sign up
//               </button>
//               <div>
//                 <Link href="/login" passHref>
//                   <p className="text-blue-500">Or Login here</p>
//                 </Link>
//               </div>
//             </>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Page

import React from "react";

const page = () => {
  return <div>page</div>;
};

export default page;