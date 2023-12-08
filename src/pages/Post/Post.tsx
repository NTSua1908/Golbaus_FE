import React, { useState } from 'react';
import PostContent from '../../components/PostContent/PostContent';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const value = `
## Horizontal Rules

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
  upvote: number;
  downvote: number;
  comments: string[]; //before
}

function Post() {
  const [data, setData] = useState<PostProps>({
    content: value,
    thumbnail:
      'https://1.bp.blogspot.com/-E6gB3SWavGE/X4Wo-00m4qI/AAAAAAAAFMo/VaTo7SBekpgcy9iDDk9j108npXiSWWRPwCLcBGAsYHQ/w0/How%2Bto%2Bfix%2Bthumbnail%2Bissue%2Bin%2Bblogger%2Bhomepage.png',
    excerpt:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam aliquam quos voluptate laborum asperiores rem. Inventore labore excepturi tempora nam impedit veniam rerum laboriosam, reprehenderit vero voluptas ratione, perspiciatis hic.',
    avatar:
      'https://www.pockettactics.com/wp-content/sites/pockettactics/2023/02/Stardew-Valley-Haley-580x334.jpg',
    fullname: 'Halley',
    username: 'Halley',
    date: '08-12-2023 16:58 PM',
    viewCount: 2134,
    postCount: 11,
    followCount: 342,
    upvote: 34,
    downvote: 1,
    comments: ['asdf', 'asdfasd', 'assdf'],
  });

  return (
    <div className='post'>
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
        followCount={data.followCount}
        upvote={data.upvote}
        downvote={data.downvote}
      />
    </div>
  );
}

export default Post;
