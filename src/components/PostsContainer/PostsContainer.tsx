import { PostItem } from "./PostItem";
import { FC } from "react";

interface PostItemProps {
  id: string;
  title: string;
  description: string;
  date: number;
}

export const PostsContainer: FC<{ posts: PostItemProps[] }> = (props) => {
  return (
    <div className="posts">
      {props.posts.map((post) => (
        <PostItem key={post.id} {...post} />
      ))}
    </div>
  );
};
