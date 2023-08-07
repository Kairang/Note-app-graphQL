import { graphQLRequest } from "./request";

export const NotesLoader = async ({ params: { folderId } }) => {
  const query = `query Folder($folderId: String!) {
      folder(folderId: $folderId) {
        id
        name
        notes {
          id
          content
          updatedAt
        }
      }
    }`;

  const data = await graphQLRequest({
    query,
    variables: {
      folderId,
    },
  });

  return data;
};

export const NoteLoader = async ({ params: { noteId } }) => {
  const query = `query Note($noteId: String!) {
        note(noteId: $noteId) {
          id
          content
        }
    }`;

  const data = await graphQLRequest({
    query,
    variables: {
      noteId,
    },
  });

  return data;
};

// eslint-disable-next-line no-unused-vars
export const AddNewNote = async ({ params, request }) => {
  const newNote = await request.formData();
  const formDataObj = {};

  newNote.forEach((value, key) => formDataObj[key] = value);

  const query = `mutation AddNote($content: String!, $folderId: ID!) {
    addNote(content: $content, folderId: $folderId) {
      id
      content
    }
  }`;

  const data = await graphQLRequest({
    query,
    variables: formDataObj,
  });
  return data;
};

// eslint-disable-next-line no-unused-vars
export const UpdateNote = async ({ params, request }) => {
  const updateNote = await request.formData();
  const formDataObj = {};

  updateNote.forEach((value, key) => formDataObj[key] = value);

  const query = `mutation UpdateNote($id: String!, $content: String!) {
    updateNote(id: $id, content: $content) {
      id
      content
    }
  }`;

  const data = await graphQLRequest({
    query,
    variables: formDataObj,
  });
  return data;
}