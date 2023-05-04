import { FC } from "react";
import { Trash } from "../../assets/Trash";
import { useAppDispatch } from "../../store";
import { deletePost } from "../../store/slices/postsSlice";
import "./Postitem.css";

interface PostItemProps {
  id: string;
  title: string;
  description: string;
  date: number;
}

export const PostItem: FC<PostItemProps> = (props) => {
  const dispatch = useAppDispatch();

  return (
    <div className="post__wrapper">
      <div className="post__content">
        <div style={{ display: "flex", alignItems: "center", columnGap: "15px" }}>
          <span className="post__date">{new Date(props.date).toLocaleDateString()}</span>
          <span className="post__title">{props.title}</span>
        </div>
        <p className="post__description">{props.description}</p>
      </div>
      <div>
        <Trash onClick={() => dispatch(deletePost(props.id))} />
      </div>
    </div>
  );
};
