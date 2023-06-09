import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { Modal } from "../components/Modal/Modal";
import { PostForm } from "../components/Forms/PostForm";
import { fetchingPosts } from "../store/slices/postsSlice";
import { PostsContainer } from "../components/PostsContainer/PostsContainer";
import TextField from "../ui-kit/TextField";
import { Select } from "../ui-kit/Select";
import { FullScreenLoader } from "../components/FullScreenLoader/FullScreenLoader";
import "./Posts.css";

export const Posts = () => {
  const { id } = useAppSelector((state) => state.auth);
  const { posts, isLoading } = useAppSelector((state) => state.posts);
  const [isOpen, setIsOpen] = useState(false);
  const [option, setOption] = useState<string>("default");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleChange = (value: string) => {
    setOption(value);
  };

  useEffect(() => {
    fetchingPosts(dispatch, id);
  }, []);

  const sortedPosts = useMemo(() => {
    if (option === "by_date") {
      return [...posts].sort((acc, cur) => acc.date - cur.date);
    }
    if (option === "alphabet") {
      return [...posts].sort((acc, cur) => acc.title.localeCompare(cur.title));
    }
    return posts;
  }, [option, posts]);

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) => post.title.includes(searchQuery));
  }, [searchQuery, sortedPosts]);

  if (isLoading) return <FullScreenLoader />;
  return (
    <div className="posts__wrapper">
      <div className="posts__controlls">
        <button className="btn" onClick={() => setIsOpen(true)}>
          Create post
        </button>
        <div>
          <TextField
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select
          onChange={handleChange}
          defaultValue={"Default"}
          options={[
            { value: "default", text: "Default" },
            { value: "by_date", text: "By date added" },
            { value: "alphabet", text: "A-z" },
          ]}
        />
      </div>
      <PostsContainer posts={sortedAndSearchedPosts} />
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <PostForm onClose={() => setIsOpen(false)} />
      </Modal>
      {!posts.length && <h1 className="posts__title">Empty...</h1>}
    </div>
  );
};
