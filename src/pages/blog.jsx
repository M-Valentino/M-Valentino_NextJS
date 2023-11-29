import React, { useEffect, useRef, useState } from "react";
import { MainWrapper } from "@/components/layout/MainWrapper";
import { CustomHead } from "@/components/layout/CustomHead";
import { Typography, useMediaQuery } from "@mui/material";
import { PAGE_TITLES } from "@/consts/pageTitles";
import { CustomPaper } from "@/components/layout/CustomPaper";
import { MainHeading, SubHeading } from "@/components/layout/Headings";
import { Post1 } from "@/components/blogComponents/blogPosts/Post1";
import { Post2 } from "@/components/blogComponents/blogPosts/Post2";
import { BlogDrawer } from "@/components/blogComponents/BlogDrawer";

/**
 * Holds all blog posts. appendQuestionMark is needed because blog
 * post titles are used in dynamic routing and including question
 * marks in URLs creates incompatibilities.
 */
export const BLOG_POSTS = [
  {
    component: <Post2 />,
    title: "I Don't Quite Like the Design of My Site",
    date: "November 26, 2023",
  },
  {
    component: <Post1 />,
    title: "Could My Image Processing Library Replace MarvinJ",
    appendQuestionMark: true,
    date: "October 15, 2023",
  },
];

/**
 * The component property must be removed for dynamic routing
 * because components can't be serialized.
 */
export const BLOG_POSTS_NO_COMPONENT = BLOG_POSTS.map((obj) => {
  const newObj = { ...obj };
  if (newObj.hasOwnProperty("component")) {
    delete newObj["component"];
  }
  return newObj;
});

export const getBlogComponent = (title) => {
  const post = BLOG_POSTS.find((obj) => obj.title === title);
  return post.component;
};

export default function Blog() {
  const isDesktopView = useMediaQuery("(min-width:900px)");
  const isAtLeastTabletView = useMediaQuery("(min-width:600px)");
  const isLargeMobileView = useMediaQuery("(max-width:428px)");

  // Controlls how many blog posts can be seen.
  const [postsToShow, setPostsToShow] = useState(1);
  const oldTime = useRef(Date.now());

  /**
   * If user scrolled close to the bottom and 500ms have passed,
   * increment postsToShow. Adding a time delay is needed since
   * postsToShow can be incremented too much.
   */
  const handleScroll = () => {
    if (
      Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight - 20 &&
      oldTime.current + 500 < Date.now()
    ) {
      setPostsToShow((oldValue) => oldValue + 1);
      oldTime.current = Date.now();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <>
      <CustomHead
        descriptionText="The tech blog of Mark Valentino - a software engineer."
        title="Mark Valentino's Tech Blog"
        keywords="technology, programming, coding"
      />
      <MainWrapper activeLink={PAGE_TITLES.blog}>
        <MainHeading shrinkFontOn={!isDesktopView} addMarginBottomOn={true}>
          {isAtLeastTabletView && "Mark Valentino's"}Tech Blog
        </MainHeading>
        <BlogDrawer />
        {BLOG_POSTS.slice(0, postsToShow).map((item, postIndex) => (
          <CustomPaper isDesktopView={isDesktopView} key={postIndex}>
            <SubHeading shrinkFontOn={isLargeMobileView}>
              {item.title}
              {item.appendQuestionMark ? "?" : ""}
            </SubHeading>
            <Typography
              variant="h6"
              gutterBottom
              color="secondary"
              style={{ fontStyle: "italic" }}
            >
              Published {item.date}
            </Typography>
            {item.component}
          </CustomPaper>
        ))}
      </MainWrapper>
    </>
  );
}
