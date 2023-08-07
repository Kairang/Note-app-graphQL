import { graphQLRequest } from "./request";

export const FoldersLoader = async () => {
  const query = `query folders {
    folders {
      id
      name
      createdAt
    }
  }`;

  const data = await graphQLRequest({ query });
  return data;
};

export const AddNewFolder = async (newFolder) => {
  const query = `mutation AddFolder($name: String!) {
    addFolder(name: $name) {
      name
      author {
        name
      }
    }
  }`;

  const data = await graphQLRequest({
    query,
    variables: { name: newFolder.name }
  });
  return data;
};