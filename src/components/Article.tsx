import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { getImage, deleteBlog } from "@/appwrite/blogs.actions";

import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const Article = ({
  allArticles,
  admin,
}: {
  allArticles: any[];
  admin: boolean;
}) => {
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    const fetchImagesAndSetArticles = async () => {
      try {
        const articlesWithImages = await Promise.all(
          allArticles.map(async (article) => {
            try {
              const imageSrc = await getImage(article.imageId);
              return { ...article, imageSrc };
            } catch (error) {
              console.error("Error fetching image:", error);
              return article; // Return the article without an image if fetching fails
            }
          })
        );
        setArticles(articlesWithImages);
      } catch (error) {
        toast.error("Failed to load articles");
        console.error("Error fetching articles:", error);
      }
    };

    if (allArticles.length) {
      fetchImagesAndSetArticles();
    }
  }, [allArticles]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await deleteBlog(id);
        setArticles((prevArticles) =>
          prevArticles.filter((article) => article.$id !== id)
        );
        toast.success("Deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete article");
      }
    }
  };

  return (
    <div className="w-full pr-4">
      <h2 className="text-xl font-semibold mb-4">All Articles</h2>
      <ToastContainer />
      {articles.map((article) => (
        <div
          key={article.$id}
          className="bg-white overflow-hidden shadow rounded-lg mb-4 p-4"
        >
          <div className="font-semibold text-lg text-black flex justify-between">
            <h3>{article.title}</h3>
            {admin && (
              <img
                onClick={() => handleDelete(article.$id)}
                src="/delete.svg"
                alt="delete"
                className="w-6 h-6 cursor-pointer"
              />
            )}
          </div>
          {article.imageSrc && (
            <img
              src={article.imageSrc}
              alt={article.title}
              className="w-full h-auto mb-4 mt-2"
            />
          )}
          <div className="text-gray-600 mt-2">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>
          <div className="flex mt-4 justify-between">
            <div className="text-blue-500">{article.author}</div>
            {article.tags.map((tag: any, index: string) => (
              <div
                key={index}
                className="text-blue-900 p-2 items-center border border-blue-500 rounded-2xl text-sm font-bold"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Article;
