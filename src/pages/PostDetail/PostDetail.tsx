import React, { useState } from "react";
import PostContent from "../../components/PostContent/PostContent";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import VoteType from "../../enums/VoteType";
import CommentsTree from "../../components/CommentTree/CommentTree";
import {
  Comment,
  CommentTreeProps,
} from "../../components/CommentTree/CommentTree";
import "./postDetail.scss";
import SwipperContent, {
  SwiperCardContent,
  SwiperContentProps,
} from "../../components/SwiperContent/SwiperContent";
import { useLocation } from "react-router-dom";
import PostGrid from "../../components/PostGrid/PostGrid";

const value = `# Ahoy there, mates! Willy's Fish Shop Welcomes You!

Ahoy, Pelican Town dwellers! I'm Willy, your friendly neighborhood fisherman, and I run the finest Fish Shop right here on the beach. Let me tell you a bit about myself and the fantastic products we have to offer:

## Meet Willy

![Willy](https://example.com/willy_image.jpg)

I've spent me whole life sailin' the seas and castin' me line into the great blue. Now, I've dropped anchor in Pelican Town to share me passion for fishin' with all of you!

## Quality Fishing Supplies

### Fishing Rods

- **Bamboo Pole:** A trusty pole for beginners.
- **Fiberglass Rod:** Upgrade for a more professional fishing experience.
- **Iridium Rod:** The pinnacle of fishing technology.

### Lures and Bait

- **Spinner:** Increases bite rate when fishing.
- **Trap Bobber:** Reduces the escape rate of fish.
- **Magnet:** Increases the chance of finding treasures.

### Fishing Tackle

- **Dressed Spinner:** A colorful spinner that excites the fish, causing them to bite faster.
- **Barbed Hook:** Makes your catch more secure, causing the "fishing bar" to cling to your catch.
- **Lead Bobber:** Adds weight to your fishing bar, preventing it from bouncing along the bottom.

### Crab Pots

- **Crab Pot:** A trap used to catch a variety of sea creatures.
- **Lobster Trap:** An improved version of the Crab Pot, offering a chance to catch higher-quality items.

## Sell Your Catch

![Fish](https://example.com/fish_image.jpg)

Caught a big one, did ya? Bring your haul to Willy's Fish Shop, and I'll give you a fair price for your catch. From the smallest minnow to the legendary angler's delight, we buy 'em all!

## Upgrade Your Tools

![Tools](https://example.com/tools_image.jpg)

Feelin' like your rod needs a boost? I offer upgrades to make your fishing experience even better. Visit me shop, and we'll get that rod of yours shipshape in no time!

## Quests and Events

![Quests](https://example.com/quests_image.jpg)

Join me on various fishing adventures and quests. Catch a legendary fish, participate in fishing derbies, and experience the thrill of the open sea right here in Pelican Town!

## Visit Willy's Fish Shop Today!

![Fish Shop](https://example.com/fish_shop_image.jpg)

So, me hearties, whether you're a seasoned sailor or a landlubber lookin' to try your hand at fishin', make your way to Willy's Fish Shop. We've got all the gear you need for a reel good time on the water!

Fair winds and following seas,
Willy

`;

const contents: SwiperCardContent[] = [
  {
    thumbnail:
      "https://tintuc-divineshop.cdn.vccloud.vn/wp-content/uploads/2020/08/782784.jpg",
    title: "Stardev Valley",
    upvote: 10,
    downvote: 1,
    viewCount: 432,
    authorName: "Lewis",
    authorAvatar:
      "https://stardewvalleywiki.com/mediawiki/images/2/2b/Lewis.png",
    commentCount: 3,
    date: new Date(2023, 12, 23, 15, 22),
    excerpt:
      "How Stardew Valley Sets The Blueprint for Indie and Farming Simulator Games",
  },
  {
    thumbnail: "https://pbs.twimg.com/media/E1veJHUWEAMrLrm.jpg:large",
    title: "New mod for Stardev Valley",
    upvote: 10,
    downvote: 1,
    viewCount: 432,
    authorName: "Lewis",
    authorAvatar:
      "https://stardewvalleywiki.com/mediawiki/images/2/2b/Lewis.png",
    commentCount: 3,
    date: new Date(2023, 12, 23, 15, 22),
    excerpt:
      "How Stardew Valley Sets The Blueprint for Indie and Farming Simulator Games",
  },
  {
    thumbnail: "https://pbs.twimg.com/media/E1veJHUWEAMrLrm.jpg:large",
    title: "New mod for Stardev Valley",
    upvote: 10,
    downvote: 1,
    viewCount: 432,
    authorName: "Lewis",
    authorAvatar:
      "https://stardewvalleywiki.com/mediawiki/images/2/2b/Lewis.png",
    commentCount: 3,
    date: new Date(2023, 12, 23, 15, 22),
    excerpt:
      "How Stardew Valley Sets The Blueprint for Indie and Farming Simulator Games",
  },
  {
    thumbnail: "https://pbs.twimg.com/media/E1veJHUWEAMrLrm.jpg:large",
    title: "New mod for Stardev Valley",
    upvote: 10,
    downvote: 1,
    viewCount: 432,
    authorName: "Lewis",
    authorAvatar:
      "https://stardewvalleywiki.com/mediawiki/images/2/2b/Lewis.png",
    commentCount: 3,
    date: new Date(2023, 12, 23, 15, 22),
    excerpt:
      "How Stardew Valley Sets The Blueprint for Indie and Farming Simulator Games",
  },
  {
    thumbnail: "https://pbs.twimg.com/media/E1veJHUWEAMrLrm.jpg:large",
    title: "New mod for Stardev Valley",
    upvote: 10,
    downvote: 1,
    viewCount: 432,
    authorName: "Lewis",
    authorAvatar:
      "https://stardewvalleywiki.com/mediawiki/images/2/2b/Lewis.png",
    commentCount: 3,
    date: new Date(2023, 12, 23, 15, 22),
    excerpt:
      "How Stardew Valley Sets The Blueprint for Indie and Farming Simulator Games",
  },
  {
    thumbnail: "https://pbs.twimg.com/media/E1veJHUWEAMrLrm.jpg:large",
    title: "New mod for Stardev Valley",
    upvote: 10,
    downvote: 1,
    viewCount: 432,
    authorName: "Lewis",
    authorAvatar:
      "https://stardewvalleywiki.com/mediawiki/images/2/2b/Lewis.png",
    commentCount: 3,
    date: new Date(2023, 12, 23, 15, 22),
    excerpt:
      "How Stardew Valley Sets The Blueprint for Indie and Farming Simulator Games",
  },
  {
    thumbnail: "https://pbs.twimg.com/media/E1veJHUWEAMrLrm.jpg:large",
    title: "New mod for Stardev Valley",
    upvote: 10,
    downvote: 1,
    viewCount: 432,
    authorName: "Lewis",
    authorAvatar:
      "https://stardewvalleywiki.com/mediawiki/images/2/2b/Lewis.png",
    commentCount: 3,
    date: new Date(2023, 12, 23, 15, 22),
    excerpt:
      "How Stardew Valley Sets The Blueprint for Indie and Farming Simulator Games",
  },
  {
    thumbnail: "https://pbs.twimg.com/media/E1veJHUWEAMrLrm.jpg:large",
    title: "New mod for Stardev Valley",
    upvote: 10,
    downvote: 1,
    viewCount: 432,
    authorName: "Lewis",
    authorAvatar:
      "https://stardewvalleywiki.com/mediawiki/images/2/2b/Lewis.png",
    commentCount: 3,
    date: new Date(2023, 12, 23, 15, 22),
    excerpt:
      "How Stardew Valley Sets The Blueprint for Indie and Farming Simulator Games",
  },
  {
    thumbnail: "https://pbs.twimg.com/media/E1veJHUWEAMrLrm.jpg:large",
    title:
      "New mod for Stardev Valley, New mod for Stardev Valley, New mod for Stardev Valley",
    upvote: 10,
    downvote: 1,
    viewCount: 432,
    authorName: "Lewis",
    authorAvatar:
      "https://stardewvalleywiki.com/mediawiki/images/2/2b/Lewis.png",
    commentCount: 3,
    date: new Date(2023, 12, 23, 15, 22),
    excerpt:
      "How Stardew Valley Sets The Blueprint for Indie and Farming Simulator Games, How Stardew Valley Sets The Blueprint for Indie and Farming Simulator Games",
  },
];
const relatedPost: SwiperContentProps = {
  contents: contents,
};

const comments: Comment[] = [
  {
    id: "1",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/0/04/Alex.png",
    username: "alex",
    fullName: "Alex",
    date: "2023-12-05  13:34 PM",
    text: "This is the first comment.",
    upvotes: 10,
    downvotes: 2,
    replyFor: "Haley",
    totalReplyCount: 30,
    vote: VoteType.Down,
    replies: [
      {
        id: "1.1",
        avatar: "https://stardewvalleywiki.com/mediawiki/images/2/28/Emily.png",
        username: "amily",
        fullName: "Amily",
        date: "2023-12-06  13:34 PM",
        text: "Reply to the first comment. Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus sunt commodi possimus odio, officia accusantium nemo nobis eaque odit beatae aperiam dolore doloribus ullam quisquam omnis numquam ratione libero in.",
        upvotes: 5,
        downvotes: 1,
        replyFor: "alex",
        totalReplyCount: 0,
        vote: VoteType.Up,
        replies: [
          // Add more replies as needed
        ],
      },
      {
        id: "1.2",
        avatar: "https://stardewvalleywiki.com/mediawiki/images/1/1b/Robin.png",
        username: "robin",
        fullName: "Robin",
        date: "2023-12-07  13:34 PM",
        text: "This is the second comment.",
        upvotes: 8,
        downvotes: 0,
        replyFor: "alex",
        totalReplyCount: 0,
        vote: VoteType.Unvote,
        replies: [],
      },
      {
        id: "1.1.1",
        avatar: "https://stardewvalleywiki.com/mediawiki/images/0/04/Alex.png",
        username: "alex",
        fullName: "Alex",
        date: "2023-12-06  13:34 PM",
        text: "Reply to the first comment.",
        replyFor: "robin",
        upvotes: 5,
        downvotes: 1,
        totalReplyCount: 0,
        vote: VoteType.Unvote,
        replies: [],
      },
      // Add more replies as needed
    ],
  },
  {
    id: "2",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/2/2b/Lewis.png",
    username: "lewis",
    fullName: "Lewis",
    date: "2023-12-07 13:34 PM",
    text: "This is the second comment.",
    upvotes: 8,
    replyFor: "alex",
    downvotes: 0,
    totalReplyCount: 0,
    vote: VoteType.Up,
    replies: [],
  },
  // Add more comments as needed
];

const commentProps: CommentTreeProps = {
  data: comments,
  amount: 10,
  page: 1,
  totalCount: 24,
};

interface PostProps {
  content: string;
  thumbnail: string;
  excerpt: string;
  avatar: string;
  fullname: string;
  username: string;
  date: string;
  viewCount: number;
  postCount: number;
  followCount: number;
  countVote: number;
  comments: Comment[];
  isMyPost: boolean;
  vote: VoteType;
  tags: string[];
}

function PostDetail() {
  const [data, setData] = useState<PostProps>({
    content: value,
    thumbnail:
      "https://1.bp.blogspot.com/-E6gB3SWavGE/X4Wo-00m4qI/AAAAAAAAFMo/VaTo7SBekpgcy9iDDk9j108npXiSWWRPwCLcBGAsYHQ/w0/How%2Bto%2Bfix%2Bthumbnail%2Bissue%2Bin%2Bblogger%2Bhomepage.png",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam aliquam quos voluptate laborum asperiores rem. Inventore labore excepturi tempora nam impedit veniam rerum laboriosam, reprehenderit vero voluptas ratione, perspiciatis hic.",
    avatar: "https://stardewvalleywiki.com/mediawiki/images/1/1b/Haley.png",
    fullname: "Halley",
    username: "Halley",
    date: "08-12-2023 16:58 PM",
    viewCount: 2134,
    postCount: 11,
    followCount: 342,
    countVote: 34,
    comments: comments,
    isMyPost: true,
    vote: VoteType.Up,
    tags: ["markdown", "blog", "introduce", "demo", "guide"],
  });

  let { state } = useLocation();
  console.log(state);

  return (
    <div>
      <Header />
      <div className="postDetail">
        <div className="postDetail-content">
          <PostContent
            content={data.content}
            thumbnail={data.thumbnail}
            excerpt={data.excerpt}
            avatar={data.avatar}
            fullname={data.fullname}
            username={data.username}
            date={data.date}
            viewCount={data.viewCount}
            postCount={data.postCount}
            commentCount={data.comments.length}
            followCount={data.followCount}
            countVote={data.countVote}
            isMyPost={data.isMyPost}
            vote={data.vote}
            tags={data.tags}
          />
        </div>
        <div className="postDetail-more">
          <h2 className="postDetail-more-other">
            Other posts by {data.fullname}
          </h2>
          <SwipperContent contents={contents} />
          <h2 className="postDetail-more-related">Related Posts</h2>
          <div className="postDetail-more-related-container">
            <PostGrid posts={contents} />
          </div>
        </div>
        <div className="postDetail-comment">
          <h2 className="postDetail-comment-title">Comments</h2>
          <CommentsTree
            data={commentProps.data}
            amount={commentProps.amount}
            page={commentProps.page}
            totalCount={commentProps.totalCount}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PostDetail;
