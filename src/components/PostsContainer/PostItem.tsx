import { motion } from "framer-motion";
import { FC } from "react";
import "./Postitem.css";
import { Trash } from "../../assets/Trash";
import { useAppDispatch } from "../../store";
import { deletePost } from "../../store/slices/postsSlice";

interface PostItemProps {
  id: string;
  title: string;
  description: string;
  date: number;
}

export const PostItem: FC<PostItemProps> = (props) => {
  const dispatch = useAppDispatch();

  return (
    <motion.div whileHover={{ scale: 1.1 }} className="post__wrapper">
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
    </motion.div>
  );
};
