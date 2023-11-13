import { Client, Databases, Query } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("655129254787cb88f723");

const databases = new Databases(client);

export const getArticles = async () => {
  const resp = await databases.listDocuments(
    "6551d923210e659fc4cf",
    "6551d95cb3023ff059cd",
    [
      //   Query.equal("title", "Hamlet"),
    ]
  );
  return resp;
};
