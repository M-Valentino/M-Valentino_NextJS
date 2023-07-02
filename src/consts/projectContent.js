export const LANGUAGES = {
  bash: "Bash",
  css: "CSS",
  html: "HTML",
  java: "Java",
  python: "Python",
  react: "React",
  vanillaJS: "Vanilla JS",
};

export const projectContent = [
  {
    show: true,
    href: "/Earth3JS",
    imageLink: "/projectImages/tigers.jpg",
    title: "Earth 3JS",
    smallerTitleFontNeeded: false,
    date: "2023",
    description:
      "This project was made to explore how programs can perform image manipulation. I wrote a program that can open a bitmap image and store its pixel data into matrices which could then be manipulated. I was able to successfully mirror an image, invert the colors of an image, convert an image to black and white, and stretch an image programatically.",
    languages: [LANGUAGES.react],
  },
  {
    show: true,
    href: "https://github.com/M-Valentino/Image-Manipulation-Experiments",
    imageLink: "/projectImages/tigers.jpg",
    title: "Image Manipulation Experiments",
    smallerTitleFontNeeded: true,
    date: "2022",
    description:
      "This project was made to explore how programs can perform image manipulation. I wrote a program that can open a bitmap image and store its pixel data into matrices which could then be manipulated. I was able to successfully mirror an image, invert the colors of an image, convert an image to black and white, and stretch an image programatically.",
    languages: [LANGUAGES.java],
  },
  {
    show: true,
    href: "https://github.com/M-Valentino/Cities-Recommender",
    imageLink: "/projectImages/citiesrecommender.png",
    title: "Cities Recommender",
    smallerTitleFontNeeded: false,
    date: "2021",
    description:
      "I wrote an AI program to recommend the best cities in America to live in. Cities were optimized between being safe and having favorable economic conditions (low cost of living and high median income). Machine learning was used to estimate unknown cost of living values of cities. Over 2000 cities were looked at.",
    languages: [LANGUAGES.python, LANGUAGES.java],
  },
  {
    show: true,
    href: "/retro_calculator.html",
    imageLink: "/projectImages/calculator.jpg",
    title: "Retro Calculator",
    smallerTitleFontNeeded: false,
    date: "2022",
    description:
      "A functional recreation of an old school style calculator was made. I pushed CSS to the limit to make the calculator photorealistic by heavily using shadows and gradients. Vector images were not used as I wanted to make the calculator easier to be built upon in the future. The entire webpage is very small and takes up 14Kb.",
    languages: [LANGUAGES.vanillaJS, LANGUAGES.css, LANGUAGES.html],
  },
];
