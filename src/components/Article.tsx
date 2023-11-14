"use effect";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { getImage } from "@/appwrite/blogs.actions";

const Article = ({ allArticles }: { allArticles: any }) => {
  const [articlesWithImages, setArticlesWithImages] = useState<any>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const articles = await Promise.all(
        allArticles.map(async (article: any) => {
          const imageSrc = await getImage(article.imageId);

          return { ...article, imageSrc };
        })
      );
      setArticlesWithImages(articles);
    };

    fetchImages();
  }, [allArticles]);

  return (
    <div>
      <div className="w-full pr-4">
        <h2 className="text-xl font-semibold mb-4 ">Latest Articles</h2>
        {articlesWithImages.map((article: any) => (
          <div
            key={article.$id}
            className="bg-white overflow-hidden shadow rounded-lg mb-4 p-4"
          >
            <h3 className="font-semibold text-lg text-black">
              {article.title}
            </h3>
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
    </div>
  );
};

export default Article;
