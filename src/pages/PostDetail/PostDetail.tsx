import { Spin } from "antd";
import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { formatDateToString } from "../../Helper/DateHelper";
import {
  postLoading,
  postNotFound,
  removePost,
  setPostCommentPage,
  setPostContent,
} from "../../actions/postAction";
import CommentsTree from "../../components/CommentTree/CommentTree";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import PostContent from "../../components/PostContent/PostContent";
import PostGrid from "../../components/PostGrid/PostGrid";
import RequiredLogin from "../../components/RequiredLogin/RequiredLogin";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import SwipperContent, {
  SwiperCardContent,
  SwiperContentProps,
} from "../../components/SwiperContent/SwiperContent";
import NotFound from "../../images/not_found.png";
import { CommentDetailModel } from "../../model/commentModel";
import { GetPostComment } from "../../services/CommentService";
import { GetDetail, IncreateView } from "../../services/PostService";
import { RootState } from "../../store/configureStore";
import "./postDetail.scss";

const value = `## Horizontal Rules
___

---

***


## Typographic replacements

Enable typographer option to see result.

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---

"Smartypants, double quotes" and 'single quotes'


## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~

## Emphasis


## Blockquotes


> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.


## Lists

Unordered

+ Create a list by starting a line with \`+\`, \`-\`, or \`*\`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


1. You can use sequential numbers...
1. ...or keep all the numbers as \`1.\`

Start numbering with offset:

57. foo
1. bar


## Code

Inline \`code\`

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code


Block code "fences"

\`\`\`
Sample text here...
\`\`\`

Syntax highlighting

\`\`\` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
\`\`\`

\`\`\` css
/* Custom styles for blockquotes */
.custom-blockquote {
  border-left: 4px solid #3498db;
  padding-left: 1em;
  margin-left: 0;
  font-style: italic;
  color: #555;
}

/* Custom styles for horizontal rule */
.custom-hr {
  border: 1px solid #ddd;
  margin: 1em 0;
}
\`\`\`

## Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |


## Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

Autoconverted link https://github.com/nodeca/pica (enable linkify to see)


## Images

![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")
![Wallpaper](https://c4.wallpaperflare.com/wallpaper/39/346/426/digital-art-men-city-futuristic-night-hd-wallpaper-thumb.jpg)

Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location:

[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"


## Plugins

The killer feature of \`markdown-it\` is very effective support of
[syntax plugins](https://www.npmjs.org/browse/keyword/markdown-it-plugin).


### [Emojies](https://github.com/markdown-it/markdown-it-emoji)

> Classic markup: :wink: :crush: :cry: :tear: :laughing: :yum:
>
> Shortcuts (emoticons): :-) :-( 8-) ;)

see [how to change output](https://github.com/markdown-it/markdown-it-emoji#change-output) with twemoji.


### [Subscript](https://github.com/markdown-it/markdown-it-sub) / [Superscript](https://github.com/markdown-it/markdown-it-sup)

- 19^th^
- H~2~O


### [\<ins>](https://github.com/markdown-it/markdown-it-ins)

++ Inserted text ++


### [\<mark>](https://github.com/markdown-it/markdown-it-mark)

==Marked text==


### [Footnotes](https://github.com/markdown-it/markdown-it-footnote)

Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.


### [Definition lists](https://github.com/markdown-it/markdown-it-deflist)

Term 1

:   Definition 1
with lazy continuation.

Term 2 with *inline markup*

:   Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

_Compact style:_

Term 1
  ~ Definition 1

Term 2
  ~ Definition 2a
  ~ Definition 2b


### [Abbreviations](https://github.com/markdown-it/markdown-it-abbr)

This is HTML abbreviation example.

It converts "HTML", but keep intact partial entries like "xxxHTMLyyy" and so on.

*[HTML]: Hyper Text Markup Language

### [Custom containers](https://github.com/markdown-it/markdown-it-container)

::: warning
*here be dragons*
:::

`;

const contents: SwiperCardContent[] = [
  {
    id: "18dc084f-6462-4b2d-8b41-5b8cfcd61ca8",
    thumbnail:
      "https://tintuc-divineshop.cdn.vccloud.vn/wp-content/uploads/2020/08/782784.jpg",
    title: "Stardev Valley",
    upVote: 10,
    downVote: 1,
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
    id: "08dc084f-6462-4b2d-8b41-5b8cfcd61ca8",
    thumbnail: "https://pbs.twimg.com/media/E1veJHUWEAMrLrm.jpg:large",
    title: "New mod for Stardev Valley",
    upVote: 10,
    downVote: 1,
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
    id: "08dc084f-6462-4b2d-8b41-5b8cfcd61ca8",
    thumbnail: "https://pbs.twimg.com/media/E1veJHUWEAMrLrm.jpg:large",
    title: "New mod for Stardev Valley",
    upVote: 10,
    downVote: 1,
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
    id: "08dc084f-6462-4b2d-8b41-5b8cfcd61ca8",
    thumbnail: "https://pbs.twimg.com/media/E1veJHUWEAMrLrm.jpg:large",
    title: "New mod for Stardev Valley",
    upVote: 10,
    downVote: 1,
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
    id: "08dc084f-6462-4b2d-8b41-5b8cfcd61ca8",
    thumbnail: "https://pbs.twimg.com/media/E1veJHUWEAMrLrm.jpg:large",
    title: "New mod for Stardev Valley",
    upVote: 10,
    downVote: 1,
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
    id: "08dc084f-6462-4b2d-8b41-5b8cfcd61ca8",
    thumbnail: "https://pbs.twimg.com/media/E1veJHUWEAMrLrm.jpg:large",
    title: "New mod for Stardev Valley",
    upVote: 10,
    downVote: 1,
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
    id: "08dc084f-6462-4b2d-8b41-5b8cfcd61ca8",
    thumbnail: "https://pbs.twimg.com/media/E1veJHUWEAMrLrm.jpg:large",
    title: "New mod for Stardev Valley",
    upVote: 10,
    downVote: 1,
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
    id: "08dc084f-6462-4b2d-8b41-5b8cfcd61ca8",
    thumbnail: "https://pbs.twimg.com/media/E1veJHUWEAMrLrm.jpg:large",
    title: "New mod for Stardev Valley",
    upVote: 10,
    downVote: 1,
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
    id: "08dc084f-6462-4b2d-8b41-5b8cfcd61ca8",
    thumbnail: "https://pbs.twimg.com/media/E1veJHUWEAMrLrm.jpg:large",
    title:
      "New mod for Stardev Valley, New mod for Stardev Valley, New mod for Stardev Valley",
    upVote: 10,
    downVote: 1,
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

// const comments: Comment[] = [
//   {
//     id: "1",
//     avatar: "https://stardewvalleywiki.com/mediawiki/images/0/04/Alex.png",
//     username: "alex",
//     fullName: "Alex",
//     date: "2023-12-05  13:34 PM",
//     text: "This is the first comment.",
//     upVotes: 10,
//     downVotes: 2,
//     replyFor: "Haley",
//     totalReplyCount: 30,
//     vote: VoteType.Down,
//     replies: [
//       {
//         id: "1.1",
//         avatar: "https://stardewvalleywiki.com/mediawiki/images/2/28/Emily.png",
//         username: "amily",
//         fullName: "Amily",
//         date: "2023-12-06  13:34 PM",
//         text: "Reply to the first comment. Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus sunt commodi possimus odio, officia accusantium nemo nobis eaque odit beatae aperiam dolore doloribus ullam quisquam omnis numquam ratione libero in.",
//         upVotes: 5,
//         downVotes: 1,
//         replyFor: "alex",
//         totalReplyCount: 0,
//         vote: VoteType.Up,
//         replies: [
//           // Add more replies as needed
//         ],
//       },
//       {
//         id: "1.2",
//         avatar: "https://stardewvalleywiki.com/mediawiki/images/1/1b/Robin.png",
//         username: "robin",
//         fullName: "Robin",
//         date: "2023-12-07  13:34 PM",
//         text: "This is the second comment.",
//         upVotes: 8,
//         downVotes: 0,
//         replyFor: "alex",
//         totalReplyCount: 0,
//         vote: VoteType.Unvote,
//         replies: [],
//       },
//       {
//         id: "1.1.1",
//         avatar: "https://stardewvalleywiki.com/mediawiki/images/0/04/Alex.png",
//         username: "alex",
//         fullName: "Alex",
//         date: "2023-12-06  13:34 PM",
//         text: "Reply to the first comment.",
//         replyFor: "robin",
//         upVotes: 5,
//         downVotes: 1,
//         totalReplyCount: 0,
//         vote: VoteType.Unvote,
//         replies: [],
//       },
//       // Add more replies as needed
//     ],
//   },
//   {
//     id: "2",
//     avatar: "https://stardewvalleywiki.com/mediawiki/images/2/2b/Lewis.png",
//     username: "lewis",
//     fullName: "Lewis",
//     date: "2023-12-07 13:34 PM",
//     text: "This is the second comment.",
//     upVotes: 8,
//     replVFor: "alex",
//     downvotes: 0,
//     totalReplyCount: 0,
//     vote: VoteType.Up,
//     replies: [],
//   },
//   // Add more comments as needed
// ];

// const commentProps: CommentTreeProps = {
//   postId: "",
//   userName: "NTSua",
//   data: comments,
//   amount: 10,
//   page: 1,
//   totalCount: 24,
// };

const amount = 10;

function PostDetail() {
  const isAuthenticated = localStorage.getItem("token") !== null;
  const post = useSelector((state: RootState) => state.post.post);

  const [comments, setComments] = useState<CommentDetailModel[]>([]);
  const page = useSelector((state: RootState) => state.post.page) ?? 0;
  const [totalCount, setTotalCount] = useState(0);

  const isNotFound = useSelector((state: RootState) => state.post.isNotFound);
  const isLoading = useSelector((state: RootState) => state.post.isLoading);
  const [isCommentLoading, setCommentLoading] = useState(false);
  const [firstTime, setFirstTime] = useState(true);

  const dispatch = useDispatch();

  const [isRequiredLogin, setRequiredLogin] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  let { postId } = useParams();
  let { state } = useLocation();

  const handleCloseRequiredLogin = () => {
    setRequiredLogin(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (
      !isLoading &&
      postId &&
      (!post || post.id != postId || (state && state.isReload))
    ) {
      if (post) {
        dispatch(removePost());
      }
      if (state && state.isReload) {
        state.isReload = false;
      }
      dispatch(postLoading());
      GetDetail(postId)
        .then((res) => {
          dispatch(setPostContent(res.data));
        })
        .catch((error: AxiosError) => {
          if (error.request.status === 400) {
            dispatch(postNotFound());
          }
        });
    }
    if (!isCommentLoading && postId) {
      setCommentLoading(true);
      GetPostComment(postId)
        .then((res) => {
          setComments(res.data.data);
          setTotalCount(res.data.totalCount);
          setFirstTime(false);
        })
        .catch((error: AxiosError) => {
          console.log(error);
        })
        .finally(() => {
          setCommentLoading(false);
        });
    }
  }, [postId]);

  useEffect(() => {
    console.log("New page first", page, firstTime);
    if (!isCommentLoading && postId && !firstTime) {
      console.log("New page", page);
      setCommentLoading(true);
      GetPostComment(postId, page, 10)
        .then((res) => {
          console.log(res.data);
          setComments(res.data.data);
          dispatch(setPostCommentPage(res.data.page));
          setTotalCount(res.data.totalCount);
        })
        .catch((error: AxiosError) => {
          console.log(error);
        })
        .finally(() => {
          setCommentLoading(false);
        });
    }
  }, [page]);

  useEffect(() => {
    timeoutRef.current = setTimeout(async () => {
      if (postId) {
        await IncreateView(postId)
          .then()
          .catch((err) => {});
      }
    }, 15000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div>
      <Header />
      {isNotFound && (
        <div className='postDetail-notFound'>
          <img src={NotFound} alt='Not Found' />
        </div>
      )}
      {isLoading && (
        <div>
          <Spin fullscreen size='large' />
        </div>
      )}
      {post && post.id === postId && (
        <div className='postDetail'>
          <div className='postDetail-content'>
            <PostContent
              id={post.id}
              title={post.title}
              content={post.content}
              thumbnail={post.thumbnail}
              excerpt={post.excerpt}
              avatar={post.avatar}
              fullname={post.fullName}
              username={post.userName}
              updatedDate={post.updatedDate}
              publishDate={post.publishDate}
              viewCount={post.viewCount}
              postCount={post.postCount}
              commentCount={post.commentCount}
              followCount={post.followCount}
              countVote={post.countVote}
              isMyPost={post.isMyPost}
              vote={post.vote}
              publishType={post.publishType}
              willBePublishedOn={post.willBePublishedOn}
              tags={post.tags}
              handleOpenModal={setRequiredLogin}
            />
          </div>
          <div className='postDetail-more'>
            <h2 className='postDetail-more-other'>
              Other posts by {post.fullName}
            </h2>
            <SwipperContent contents={contents} />
            <h2 className='postDetail-more-related'>Related Posts</h2>
            <div className='postDetail-more-related-container'>
              <PostGrid posts={contents} />
            </div>
          </div>
          <div className='postDetail-comment'>
            <h2 className='postDetail-comment-title'>Comments</h2>
            {isCommentLoading && (
              <div className='postDetail-comment-loading'>
                <Spin fullscreen />
              </div>
            )}
            <CommentsTree
              postId={post.id}
              userName={post.userName}
              data={comments != undefined ? comments : []}
              amount={amount ? amount : 10}
              page={page ? page : 0}
              totalCount={totalCount ? totalCount : 0}
            />
          </div>
        </div>
      )}
      <RequiredLogin
        show={isRequiredLogin}
        handleClose={handleCloseRequiredLogin}
      />
      <ScrollToTop />
      <Footer />
    </div>
  );
}

export default PostDetail;
