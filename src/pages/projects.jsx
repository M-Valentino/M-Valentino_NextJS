import Head from "next/head";
import React, { useState } from "react";
import {
  Button,
  Grid,
  Stack,
  TextField,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import { MainTheme } from "@/utils/MUITheme";
import NavBar from "@/components/navbar";
import ProjectCard from "@/components/ProjectCard";
import ProjectTable from "@/components/ProjectTable";
import { projectContent } from "@/consts/projectContent";

export default function projects() {
  const [view, setView] = useState("cardView");

  const handleChange = (event, nextView) => {
    setView(nextView);
  };

  return (
    <>
      <Head>
        <title>Projects</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ThemeProvider theme={MainTheme}>
          <NavBar activeLink={1} />

          <Grid
            container
            justifyContent="space-between"
            style={{
              width: "calc(100% - 20px)",
              margin: "auto",
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            <Grid item md={4} xs={12}>
              <ToggleButtonGroup
                orientation="horizontal"
                value={view}
                exclusive
                onChange={handleChange}
                style={{ whiteSpace: "nowrap" }}
              >
                <ToggleButton
                  value="cardView"
                  aria-label="cardView"
                  disabled={view === "cardView"}
                  color="primary"
                >
                  <ViewModuleIcon style={{transform: "translateY(-1.5px)", marginRight: 2}}/> Card View
                </ToggleButton>
                <ToggleButton
                  value="tableView"
                  aria-label="tableView"
                  disabled={view === "tableView"}
                  color="primary"
                >
                  <ViewListIcon style={{transform: "translateY(-1.5px)", marginRight: 2}}/> Table View
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography
                variant="h3"
                fontWeight={500}
                textTransform={"uppercase"}
                textAlign={"center"}
              >
                Projects
              </Typography>
            </Grid>
            <Grid item md={4} xs={12}>
              <Stack direction="row">
                <TextField
                  label="Search Projects"
                  variant="outlined"
                  fullWidth
                />

                <Button
                  variant="contained"
                  sx={{ boxShadow: 1, marginLeft: 1 }}
                >
                  <SearchIcon />
                  Search
                </Button>
              </Stack>
            </Grid>
          </Grid>

          {view === "cardView" && (
            <Grid
              container
              justifyContent="center"
              spacing={3}
              direction="row"
              style={{ marginBottom: 50 }}
            >
              {projectContent.map((props, index) => (
                <Grid item>
                  <ProjectCard index={index} data={props} style />
                </Grid>
              ))}
            </Grid>
          )}
          {view === "tableView" && (
            <ProjectTable projectContent={projectContent} />
          )}
        </ThemeProvider>
      </main>
    </>
  );
}
