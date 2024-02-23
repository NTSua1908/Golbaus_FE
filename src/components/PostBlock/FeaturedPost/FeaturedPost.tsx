import { PostBlock } from "../../../model/postModel";
import PostBlockMedium from "../PostBlockMedium/PostBlockMedium";
import PostBlockSmall from "../PostBlockSmall/PostBlockSmall";
import "./featuredPost.scss";

interface FeaturedPostProps {
  postMedium: PostBlock | undefined;
  postSmall1: PostBlock | undefined;
  postSmall2: PostBlock | undefined;
  postSmall3: PostBlock | undefined;
}

function FeaturedPost({
  postMedium,
  postSmall1,
  postSmall2,
  postSmall3,
}: FeaturedPostProps) {
  return (
    <div className='featured-post'>
      <div className='featured-post-left'>
        {postMedium && (
          <>
            <div className='featured-post-left-medium'>
              <PostBlockMedium post={postMedium} />
            </div>
            <div className='featured-post-left-small'>
              <PostBlockSmall post={postMedium} />
            </div>
          </>
        )}
      </div>
      <div className='featured-post-right'>
        <div className='featured-post-right-medium'>
          {postSmall1 && <PostBlockMedium post={postSmall1} />}
          {postSmall2 && <PostBlockMedium post={postSmall2} />}
          {postSmall3 && <PostBlockMedium post={postSmall3} />}
        </div>
        <div className='featured-post-right-small'>
          {postSmall1 && <PostBlockSmall post={postSmall1} />}
          {postSmall2 && <PostBlockSmall post={postSmall2} />}
          {postSmall3 && <PostBlockSmall post={postSmall3} />}
        </div>
      </div>
    </div>
  );
}

export default FeaturedPost;
