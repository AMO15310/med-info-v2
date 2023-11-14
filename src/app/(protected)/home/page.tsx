"use client";
import React from "react";
import { getArticles } from "@/appwrite/articles.actions";
import { isLogged, logout } from "@/appwrite/auth.actions";
import { useRouter } from "next/navigation";
import Loading from "./loading";
import Article from "@/components/Article";

const Home = () => {
  const [allArticles, setAllArticles] = React.useState<any>([]);
  const [name, setName] = React.useState<string>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [email, setEmail] = React.useState<string>();

  const router = useRouter();
  const getUser = async () => {
    const isLoggedIn = await isLogged();
    try {
      const { name, status, email } = isLoggedIn!;
      setName(name);
      setEmail(email);
      if (!status) {
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const logoutUser = async () => {
    await logout();
    router.push("/login");
  };

  const fetchData = async () => {
    const resp = await getArticles();
    // const image = await getImage(resp.documents.imageId)
    console.log(resp.documents);

    setAllArticles(resp.documents);

    setLoading(false);
  };
  React.useEffect(() => {
    fetchData();
    getUser();
  }, []);
  if (loading) {
    return (
      <div className=" flex justify-center items-center  mt-[50%] ">
        <Loading />
      </div>
    );
  }
  if (!loading && allArticles.length === 0) {
    return (
      <>
        <header className="bg-slate-800 shadow rounded-md m-2">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-white">
              Medical Articles
            </h1>
          </div>
        </header>
        <div className=" flex justify-center items-center mt-[3rem]">
          <img src="/empty.svg" alt="nothing here" />
        </div>
        <div className="text-white text-center mt-[2rem] text-xl">
          There is nothing here!
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-850">
      <header className="bg-slate-800 shadow rounded-md m-2">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-white">
            Medical Articles
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex w-full">
              {/* Articles Section */}
              {/* ////////////// */}
              <div className="w-full">
                <Article allArticles={allArticles} />
              </div>
              {/* Sidebar for Links */}
              <div className="w-1/4 pl-4">
                <div className="bg-white overflow-hidden shadow rounded-lg p-4">
                  <h3 className=" text-sm text-black"></h3>
                  <ul className=" space-y-2">
                    <li>
                      <p className="text-black hover:text-blue-800">@{name}</p>
                    </li>
                    <li>
                      <p
                        // onClick={() => logoutUser()}
                        className="text-black hover:text-blue-800"
                      >
                        {email}
                      </p>
                    </li>
                    <li>
                      <p
                        // onClick={() => logoutUser()}
                        className="text-black hover:text-blue-800"
                      >
                        my blogs
                      </p>
                    </li>
                    <li>
                      <p
                        // onClick={() => logoutUser()}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        my account
                      </p>
                    </li>
                    <li>
                      <p
                        onClick={() => logoutUser()}
                        className="text-red-600 hover:text-red-800"
                      >
                        Logout
                      </p>
                    </li>
                    {/* Add more links */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;