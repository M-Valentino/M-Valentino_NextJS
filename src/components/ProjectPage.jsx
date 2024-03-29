import React, { useState } from "react";
import {
  Button,
  IconButton,
  Grid,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import GitHubIcon from "@mui/icons-material/GitHub";
import { LanguageChip } from "./LanguageChip";
import { CustomPaper } from "./layout/CustomPaper";
import { MainHeading } from "./layout/Headings";
import { getExtraProjectContent } from "../utils/getProjectExtraContent";
import {
  COLORS,
  SCREEN_CONTROL_STYLES,
  SHADOWS,
  Z_INDEX_ORDER,
} from "../consts/stylingValues";
import { HREF_TYPES } from "../consts/projectContent";

/**
 * Component that is shown that takes up most of the screen. When a project
 * card or project table entry is clicked, the user is shown this component.
 * This component displays more content about a project than in card or table
 * form. All languages and libraries are shown here as well as a GitHub link
 * to the source code.
 *
 * Some projects can be run in the browser, if they are an iframe containing
 * the project is shown.
 */
export default function ProjectPage(props) {
  const {
    href,
    hrefType,
    hideIframeControls,
    imageLink,
    imageAltText,
    title,
    date,
    description,
    languages,
    gitLink,
  } = props.data;
  const isDesktopView = useMediaQuery("(min-width:900px)");
  // Handles whether the iframe covers the whole page or not.
  const [iframeFullSize, setIframeFullSize] = useState(false);

  const iframeSmallStyle = {
    width: "100%",
    height: 500,
    border: "none",
  };

  const iframeBigStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: "100%",
    height: "100%",
    border: "none",
    margin: 0,
    padding: 0,
    overflow: "hidden",
    zIndex: Z_INDEX_ORDER.iframeFull,
  };

  const getProjectComponent = () => {
    switch (hrefType) {
      case HREF_TYPES.externalLink:
        return (
          <img
            className="projectPageImage"
            src={imageLink}
            role="img"
            alt={imageAltText}
            style={{
              margin: "auto",
              marginBottom: 40,
              display: "block",
              boxShadow: SHADOWS.minute,
            }}
          />
        );
      case HREF_TYPES.iframe:
        return (
          <>
            <iframe
              src={href}
              title="description"
              style={iframeFullSize ? iframeBigStyle : iframeSmallStyle}
            />
            {!hideIframeControls && (
              <Tooltip title={iframeFullSize ? "Shrink" : "Expand"}>
                {/* This button will always be visible no matter the size of the iframe. When the
             iframe covers the full page, it's position will be fixed to the bottom left corner. */}
                <IconButton
                  onClick={() => setIframeFullSize(!iframeFullSize)}
                  style={{
                    // Button is below the iframe whe not full screen so it is moved up to appear inside it.
                    transform: iframeFullSize
                      ? "none"
                      : "translate(7.5px, -60px)",
                    position: iframeFullSize ? "fixed" : "relative",
                    bottom: iframeFullSize ? 40 : "unset",
                    left: iframeFullSize ? 40 : "unset",
                    zIndex: iframeFullSize
                      ? Z_INDEX_ORDER.iframeScreenControlShrink
                      : "unset",
                    width: 50,
                    height: 50,
                    color: COLORS.offWhiteColor,
                  }}
                >
                  {iframeFullSize ? (
                    <FullscreenExitIcon style={SCREEN_CONTROL_STYLES} />
                  ) : (
                    <FullscreenIcon style={SCREEN_CONTROL_STYLES} />
                  )}
                </IconButton>
              </Tooltip>
            )}
          </>
        );
    }
  };
  return (
    <CustomPaper>
      <MainHeading addMarginBottomOn={true}>{title}</MainHeading>
      {getProjectComponent()}
      <Typography variant="h6" color="primary">
        Year started: {date}
      </Typography>

      <Typography
        className="projectPageDescription"
        variant="body1"
        color="text.secondary"
      >
        {description}
      </Typography>
      <Typography variant="h5" style={{ marginTop: 20, marginBottom: 5 }}>
        Languages and Libraries used:
      </Typography>
      <Grid container spacing={1}>
        {languages.map((item, index) => (
          <Grid item key={index}>
            <LanguageChip
              language={item}
              size={!isDesktopView ? "small" : "full"}
              showLink
            />
          </Grid>
        ))}
      </Grid>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          className="sourceCodeButton"
          target="_blank"
          href={gitLink}
          rel="noreferrer"
          style={{
            marginTop: 40,
            marginBottom: 40,
          }}
          variant="contained"
          color="primary"
        >
          <GitHubIcon
            className="gitHubSCodeIcon"
            style={{
              marginRight: 10,
              transform: "translateY(-5px)",
              filter: SHADOWS.minuteSVG,
            }}
          />
          View Code Source
        </Button>
      </div>
      {getExtraProjectContent(title, isDesktopView)}
    </CustomPaper>
  );
}
