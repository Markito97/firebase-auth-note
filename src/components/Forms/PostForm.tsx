import { Controller, useForm } from "react-hook-form";
import TextField from "../../ui-kit/TextField";
import { useAppDispatch, useAppSelector } from "../../store";
import { createPost, fetchingPosts, handleCreate } from "../../store/slices/postsSlice";
import "./PostForm.css";
import { FC } from "react";
import { getDoc } from "firebase/firestore";

export const PostForm: FC<{ onClose: () => void }> = (props) => {
  const dispatch = useAppDispatch();
  const { id } = useAppSelector((state) => state.auth);
  const { posts } = useAppSelector((state) => state.posts);

  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = (data: any): void => {
    if (posts.length >= 5) return;
    props.onClose();
    createPost({ ...data, userId: id, date: new Date().getTime() });
    void dispatch(handleCreate({ ...data, userId: id, date: new Date().getTime() }));
    fetchingPosts(dispatch, id);
  };

  return (
    <div className="postform__wrapper">
      <div className="fields__wrapper">
        <Controller
          name="title"
          control={control}
          render={({ field }) => <TextField {...field} type="text" placeholder="Title" />}
        />
        <textarea
          {...register("description")}
          className="description"
          placeholder="Description"
        ></textarea>
      </div>

      <button className="btn" onClick={handleSubmit(onSubmit)}>
        Create post
      </button>
    </div>
  );
};
