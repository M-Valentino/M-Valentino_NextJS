import React, { useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import { MainWrapper } from "../components/layout/MainWrapper";
import ProjectCard from "../components/ProjectsPage/ProjectCard";
import { ProjectTable } from "../components/ProjectsPage/ProjectTable";
import { CustomHead } from "../components/layout/CustomHead";
import { NoResults } from "../components/ProjectsPage/NoResults";
import { PROJECT_CONTENT } from "../consts/projectContent";
import { SHADOWS } from "../consts/stylingValues";
import { MainHeading } from "../components/layout/Headings";
import { PAGE_TITLES } from "../consts/pageTitles";

/**
 * This component shows all projects in either a card view or a table view.
 * Users can toggle between card and table view as well as search for projects.
 * Additionally, projects can be displayed from newest to oldest or oldest to
 * newest.
 */
export default function Projects() {
  const isDesktopView = useMediaQuery("(min-width:1200px)");
  const isTabletView = useMediaQuery("(max-width:899px)");
  const CARD_VIEW = "cardView";
  const TABLE_VIEW = "tableView";
  const NEWEST = "newest"
  const OLDEST = "oldest"

  /**
   * For if the projects are shown in a card or table view. Mobile devices will
   * be shown the table view by default while desktop devices will be shown the
   * card view by default.
   */
  const [view, setView] = useState(isDesktopView ? CARD_VIEW : TABLE_VIEW);

  /**
   * Function to handle changing the state of the view. It is called by the
   * ToggleButtonGroup.
   * @param {*} _event
   * @param {*} nextView the view to be set
   */
  const handleSetView = (_event, nextView) => {
    setView(nextView);
  };

  const viewIconStyle = {
    transform: "translateY(-1.5px)",
    marginRight: 2,
    filter: SHADOWS.minuteSVG,
  };

  /**
   * For managing the order of the projects shown. If false, the oldest
   * projects are shown first.
   */
  const [sort, setSort] = useState(NEWEST);

  /**
   * Function to change the state of sort and reverse the ording of
   * the projects.
   * @param {*} event when the user selects "Newest" or "Oldest"
   */
  const handleSetSort = (event) => {
    setSort(event.target.value);
    setProjectResults([...projectResults].reverse());
  };

  // For managing the search input from the user
  const [searchInputValue, setSearchInputValue] = useState("");

  /**
   * Handles the current value of the TextField
   * @param {*} event
   */
  const onChangeHandler = (event) => {
    setSearchInputValue(event.target.value);
  };

  // For managing the project search results
  const [projectResults, setProjectResults] = useState(PROJECT_CONTENT);

  /**
   * Function filter out projects that don't contain a string from the TextField
   * input and update the projects shown on the screen. It filters from the
   * PROJECT_CONTENT object which contain the default values.
   */
  const filterProjects = () => {
    let results = [...PROJECT_CONTENT];
    // If all JSON fields were matches with the query, the results would not be as good.
    results = results.filter(
      (data) =>
        JSON.stringify(data.description)
          .concat(
            JSON.stringify(data.languages),
            JSON.stringify(data.imageAltText)
          )
          .toLowerCase()
          .indexOf(searchInputValue.toLowerCase()) !== -1
    );
    // If the sort is selected as "Newest".
    if (sort === NEWEST) {
      setProjectResults(results);
    } else {
      setProjectResults(results.reverse());
    }
  };

  /**
   * Function to load the default project values and clear what the user typed.
   * It keeps the current selected sort order too.
   */
  const handleResetFilter = () => {
    if (sort === NEWEST) {
      setProjectResults([...PROJECT_CONTENT]);
    } else {
      setProjectResults([...PROJECT_CONTENT].reverse());
    }
    setSearchInputValue("");
  };

  return (
    <>
      <CustomHead
        descriptionText="Mark Valentino's coding projects."
        title="Mark Valentino - Projects"
        keywords="projects, web development, AI, data science"
      />
      <MainWrapper activeLink={PAGE_TITLES.projects}>
        <Grid
          id="projectsMenu"
          container
          justifyContent="space-between"
          style={{
            margin: "auto",
            marginTop: 40,
            marginBottom: 20,
          }}
        >
          <Grid item md={4} xs={12}>
            <Stack
              direction="row"
              justifyContent={isTabletView ? "center" : "flex-start"}
            >
              <FormControl
                sx={{ marginRight: 1 }}
                fullWidth
                style={{ maxWidth: 150 }}
              >
                <InputLabel>Sort By</InputLabel>
                <Select
                  aria-label="Sort By"
                  value={sort}
                  label="Sort By"
                  onChange={handleSetSort}
                >
                  <MenuItem value={NEWEST}>Newest</MenuItem>
                  <MenuItem value={OLDEST}>Oldest</MenuItem>
                </Select>
              </FormControl>
              <ToggleButtonGroup
                orientation="horizontal"
                value={view}
                exclusive
                onChange={handleSetView}
                style={{
                  whiteSpace: "nowrap",
                  boxShadow: SHADOWS.minute,
                }}
              >
                <ToggleButton
                  value={CARD_VIEW}
                  aria-label="card view"
                  disabled={view === CARD_VIEW}
                  color="primary"
                >
                  <ViewModuleIcon style={viewIconStyle} />
                  {isDesktopView ? "Card View" : "Cards"}
                </ToggleButton>
                <ToggleButton
                  value={TABLE_VIEW}
                  aria-label="table view"
                  disabled={view === TABLE_VIEW}
                  color="primary"
                >
                  <ViewListIcon style={viewIconStyle} />
                  {isDesktopView ? "Table View" : "Table"}
                </ToggleButton>
              </ToggleButtonGroup>
            </Stack>
          </Grid>
          <Grid id="prjctHdingWrppr" item md={4} xs={12}>
            <MainHeading addMarginBottomOn={isTabletView}>Projects</MainHeading>
          </Grid>
          <Grid item md={4} xs={12}>
            <Stack direction="row">
              <TextField
                label="Search Projects"
                variant="outlined"
                fullWidth
                onChange={onChangeHandler}
                value={searchInputValue}
                style={{ minWidth: 150 }}
              />

              <Button
                variant="contained"
                sx={{ boxShadow: 1, marginLeft: 1 }}
                onClick={() => filterProjects()}
                aria-label="search"
              >
                <SearchIcon style={{ filter: SHADOWS.minuteSVG }} />
              </Button>
              <Tooltip title="Shows all projects again.">
                <Button
                  color="secondary"
                  variant="outlined"
                  sx={{ boxShadow: 1, marginLeft: 1 }}
                  onClick={() => handleResetFilter()}
                  aria-label="reset search"
                >
                  Reset
                </Button>
              </Tooltip>
            </Stack>
          </Grid>
        </Grid>
        <div style={{ width: "fit-content", margin: "auto" }}>
          <Typography
            style={{
              fontSize: 13,
              color: "#555",
              marginBottom: 5,
              marginLeft: 5,
              marginRight: 5,
              textAlign: "justify",
            }}
          >
            {isDesktopView ? "Click " : "Select "}
            {view === CARD_VIEW ? "a card" : "an entry"} to view more details.
            Each project has a link to a GitHub repo as well as full list of
            languages and libraries used.
          </Typography>
        </div>
        {projectResults.length > 0 ? (
          <>
            {view === CARD_VIEW ? (
              <Grid
                id="cardContainer"
                container
                justifyContent="center"
                spacing={3}
                direction="row"
                style={{
                  marginBottom: 50,
                }}
              >
                {projectResults.map((props, key) => (
                  <Grid item key={key}>
                    <ProjectCard data={props} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <ProjectTable
                PROJECT_CONTENT={projectResults}
              />
            )}
          </>
        ) : (
          <NoResults />
        )}
      </MainWrapper>
    </>
  );
}
