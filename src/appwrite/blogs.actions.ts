import { client } from "./auth.actions";
import { Databases, ID, Query, Storage } from "appwrite";

const database = new Databases(client);

type BlogType = {
  title: string;
  content: string;
  author: string;
  tags: [string];
  references: [string];
  imageId: string;
  author_id: string;
};
const storage = new Storage(client);

export const uploadImage = async (image: any) => {
  const resp = await storage.createFile(
    "65536ee7f3194d75946d",
    ID.unique(),
    image
  );
  return resp;
};

export const getImage = async (id: string) => {
  const resp = await storage.getFileView("65536ee7f3194d75946d", id);
  return resp;
};
export const createNewBlog = async (data: BlogType) => {
  try {
    const resp = await database.createDocument(
      "6551d923210e659fc4cf",
      "6551d95cb3023ff059cd",
      ID.unique(),
      data
    );
    return resp;
  } catch (error) {
    throw error;
  }
};

export const fetchMyBlogs = async (user: string) => {
  try {
    const resp = await database.listDocuments(
      "6551d923210e659fc4cf",
      "6551d95cb3023ff059cd",
      [Query.equal("author_id", user)]
    );
    return resp;
  } catch (error) {
    throw error;
  }
};
export const deleteBlog = async (document: string) => {
  try {
    const resp = await database.deleteDocument(
      "6551d923210e659fc4cf",
      "6551d95cb3023ff059cd",
      document
    );
    return resp;
  } catch (error) {
    throw error;
  }
};
