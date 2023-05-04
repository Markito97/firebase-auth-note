import { createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { AppDispatch } from "..";

const _collection = collection(db, "posts");

interface Post {
  id: string;
  date: number;
  title: string;
  description: string;
}

interface PostStore {
  posts: Post[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: string;
}

const initialState: PostStore = {
  posts: [],
  isLoading: false,
  isSuccess: false,
  isError: "",
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    handleCreate(state, action) {
      // createPost(action.payload);
      state.posts.push(action.payload);
    },
    getPostsLoading(state) {
      state.isLoading = true;
    },
    getPostsSuccess(state, action) {
      state.isLoading = false;
      state.isSuccess = true;
      state.posts = action.payload;
    },
    getPostsError(state, action) {
      state.isLoading = false;
      state.isError = action.payload;
    },
    deletePost(state, action) {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
      handleDeletePost(action.payload);
    },
  },
});

export const { handleCreate, getPostsLoading, getPostsSuccess, getPostsError, deletePost } =
  postsSlice.actions;

export default postsSlice.reducer;

export const fetchingPosts = async (dispatch: AppDispatch, id: string | null) => {
  try {
    dispatch(getPostsLoading());
    const q = query(_collection, where("userId", "==", id));
    const querySnapshot = await getDocs(q);
    dispatch(getPostsSuccess(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))));
  } catch (error) {
    dispatch(getPostsError(error.message));
  }
};

export const createPost = async (post: Post): Promise<any> => {
  return await addDoc(_collection, {
    ...post,
  });
};

const handleDeletePost = async (id: string) => {
  try {
    await deleteDoc(doc(db, "posts", id));
  } catch (error) {}
};
