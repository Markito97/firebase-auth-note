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
}

const initialState: PostStore = {
  posts: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    handleCreate(state, action) {
      createPost(action.payload);
    },
    getPosts(state, action) {
      state.posts = action.payload;
    },
    deletePost(state, action) {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
      handleDeletePost(action.payload);
    },
  },
});

export const { handleCreate, getPosts, deletePost } = postsSlice.actions;

export default postsSlice.reducer;

export const fetchingPosts = async (dispatch: AppDispatch, id: string | null) => {
  try {
    const q = query(_collection, where("userId", "==", id));
    const querySnapshot = await getDocs(q);
    dispatch(getPosts(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))));
  } catch (error) {}
};

const createPost = async (post: Post): Promise<void> => {
  void (await addDoc(_collection, {
    ...post,
  }));
};

const handleDeletePost = async (id: string) => {
  try {
    await deleteDoc(doc(db, "posts", id));
  } catch (error) {}
};
