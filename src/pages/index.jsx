import React from "react";
import Link from "next/link";
import OrangeEarth from "../components/OrangeEarth";
import { CustomPaper } from "@/components/layout/CustomPaper";
import { SubHeading } from "@/components/layout/Headings";
import { CustomHead } from "@/components/layout/CustomHead";
import { MainWrapper } from "@/components/layout/MainWrapper";
import {
  MUI_PRIMARY_COLOR_DEEP_ORANGE,
  MINUTE_SHADOW,
} from "@/consts/stylingValues";
import { TECH_STACK } from "@/consts/techStack";
import { Button, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import { TypeAnimation } from "react-type-animation";
import { PAGE_TITLES } from "@/consts/pageTitles";

export default function Home() {
  const isDesktopView = useMediaQuery("(min-width:900px)");

  return (
    <>
      <CustomHead
        descriptionText="The personal website of Mark Valentino, a software engineer."
        title="Mark Valentino - Home"
        keywords="professional site, software engineer, web developer"
        loadClarity
      />
      <MainWrapper activeLink={PAGE_TITLES.home}>
        <CustomPaper isDesktopView={isDesktopView}>
          <TypeAnimation
            sequence={[
              "Hi, I'm Mark Valentino.",
              2200,
              "I code in",
              1000,
              "React JS,",
              1000,
              "React Native,",
              1000,
              "Python,",
              1000,
              "C++,",
              1000,
              "and more!",
              1500,
            ]}
            wrapper="span"
            speed={50}
            style={{
              fontSize: 38,
              display: "inline-block",
              fontFamily: "sans-serif",
              textShadow: MINUTE_SHADOW,
              color: MUI_PRIMARY_COLOR_DEEP_ORANGE,
              fontWeight: 600,
            }}
            repeat={Infinity}
            aria-hidden="true"
          />
          {/* This span is not visible but is for making the Typing text accessible to screen readers. */}
          <span
            style={{
              clip: "rect(1px, 1px, 1px, 1px)",
              clipPath: "inset(50%)",
              height: "1px",
              width: "1px",
              margin: "-1px",
              overflow: "hidden",
              padding: "0",
              position: "absolute",
            }}
          >
            Hi, I'm Mark Valentino. I code in React JS, React Native, Python,
            C++, and more!,
          </span>
          <Typography style={{ marginTop: 15, fontSize: 18 }}>
            Web development, app development, and graphics programming are my
            specialties. I have gotten where I am today through passion,
            perseverance, and curiosity.
          </Typography>
          <img
            style={{
              margin: "auto",
              display: "block",
              marginTop: 20,
              marginBottom: 40,
              borderRadius: 999,
              maxWidth: 130,
              border: `10px solid ${MUI_PRIMARY_COLOR_DEEP_ORANGE}`,
              boxShadow: `${MINUTE_SHADOW}, inset ${MINUTE_SHADOW}`,
            }}
            role="img"
            alt="Professional portrait of me in a suite and tie."
            src="https://avatars.githubusercontent.com/u/79779618?s=400&u=15e063ba7f2751b5f71ac4ba9a586fe296f569a8&v=4"
          />
          <SubHeading shrinkFontOn={!isDesktopView}>My Tech Stack</SubHeading>
          <Grid container spacing={4} justifyContent="center">
            {TECH_STACK.map((data, key) => (
              <Grid item md={2} xs={3} key={key}>
                <img role="img" src={data.src} alt={data.alt} />
                <Typography
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: data.smallFontSize ? 14 : 16,
                  }}
                >
                  {data.label}
                </Typography>
              </Grid>
            ))}
          </Grid>
          <Button
            variant="contained"
            color="primary"
            LinkComponent={Link}
            href="/projects"
            style={{
              width: "fit-content",
              margin: "auto",
              display: "block",
              marginTop: 40,
              fontSize: isDesktopView ? 30 : 18,
              textShadow: MINUTE_SHADOW,
            }}
          >
            <Stack direction="row" style={{ alignItems: "center" }}>
              <OrangeEarth /> Check out my projects!
            </Stack>
          </Button>
        </CustomPaper>
      </MainWrapper>
    </>
  );
}