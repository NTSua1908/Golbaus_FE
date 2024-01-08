import { PostBlock } from "../../../model/postModel";
import PostBlockMedium from "../PostBlockMedium/PostBlockMedium";
import PostBlockSmall from "../PostBlockSmall/PostBlockSmall";
import "./featuredPost.scss";

interface FeaturedPostProps {
  postMedium: PostBlock;
  postSmall1: PostBlock;
  postSmall2: PostBlock;
  postSmall3: PostBlock;
}

function FeaturedPost({
  postMedium,
  postSmall1,
  postSmall2,
  postSmall3,
}: FeaturedPostProps) {
  return (
    <div className="featured-post">
      <div className="featured-post-left">
        <div className="featured-post-left-medium">
          <PostBlockMedium post={postMedium} />
        </div>
        <div className="featured-post-left-small">
          <PostBlockSmall post={postSmall1} />
        </div>
      </div>
      <div className="featured-post-right">
        <div className="featured-post-right-medium">
          <PostBlockMedium post={postSmall1} />
          <PostBlockMedium post={postSmall2} />
          <PostBlockMedium post={postSmall3} />
        </div>
        <div className="featured-post-right-small">
          <PostBlockSmall post={postSmall1} />
          <PostBlockSmall post={postSmall2} />
          <PostBlockSmall post={postSmall3} />
        </div>
      </div>
    </div>
  );
}

export default FeaturedPost;
