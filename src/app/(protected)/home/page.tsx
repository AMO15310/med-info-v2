"use client";
import React from "react";
import { getArticles } from "@/appwrite/articles.actions";
import { isLogged } from "@/appwrite/auth.actions";
import { useRouter } from "next/navigation";
import Loading from "./loading";

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

  const fetchData = async () => {
    const resp = await getArticles();
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
            <div className="flex">
              {/* Articles Section */}
              <div className="w-3/4 pr-4">
                <h2 className="text-xl font-semibold mb-4 ">Latest Articles</h2>
                {/* Replace with dynamic article cards */}
                {allArticles.map((article: any) => (
                  <div
                    key={article.$id}
                    className="bg-white overflow-hidden shadow rounded-lg mb-4  p-4"
                  >
                    <h3 className="font-semibold text-lg text-black">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mt-2">{article.content}</p>
                    <div className="flex mt-4 gap-2 justify-between">
                      <div className="text-blue-500">{article.author}</div>
                      {article.tags.map((tag: any, index: string) => (
                        <div
                          key={index}
                          className="text-blue-900 flex p-2 justify-center items-center  border border-blue-500 rounded-2xl text-sm font-bold  "
                        >
                          {tag}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Repeat for other articles */}
              </div>
              {/* Sidebar for Links */}
              <div className="w-1/4 pl-4">
                <div className="bg-white overflow-hidden shadow rounded-lg p-4">
                  <h3 className=" text-sm text-black"></h3>
                  <ul className=" space-y-2">
                    <li>
                      <p className="text-blue-600 hover:text-blue-800">
                        {name}
                      </p>
                    </li>
                    <li>
                      <p
                        // onClick={() => logoutUser()}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {email}
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
