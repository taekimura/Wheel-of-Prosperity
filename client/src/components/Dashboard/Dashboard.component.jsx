import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, Box } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DashboardTable from "./DashboardTable.component";
import Loading from "../Loading/Loading";
import Pagination from "@material-ui/lab/Pagination";
import Media from "react-media";
import moment from 'moment';

import { getAllResults } from "../firebase/firebase_utils";

const Dashboard = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [resultData, setResultData] = useState([]);
  const itemsPerPage = 10;
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState();

  useEffect(() => {
    getAllResults().then((data) => {
      setResultData(data);
      setIsLoading(false);
      setNoOfPages(Math.ceil(data.length / itemsPerPage));
    });
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
    setExpanded(false);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (isLoading) return <Loading />;

  return (
    <div className={classes.root}>
      <Media
        queries={{
          desktop: "(min-width: 771px)",
          largeDesktop: "(min-width: 1024px)"
        }}
      >
        {(matches) => (
          <div className={classes.wrapper}>
            <h1>Quiz Result List</h1>
            <Divider />
            <br />
            <AccordionDetails>
              <Typography component={'span'} className={classes.heading}>Category</Typography>
              {matches.desktop && (
                <Typography component={'span'} className={classes.secondaryHeading}>
                  Email
                </Typography>
              )}
              <Typography component={'span'} className={classes.secondaryHeading}>
                Score
              </Typography>
              {matches.largeDesktop && (
                <Typography component={'span'} className={classes.secondaryHeading}>
                  Create At
                </Typography>
              )}
            </AccordionDetails>
            {resultData &&
              resultData
                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                .map((item, panel) => (
                  <Accordion
                    key={panel}
                    expanded={expanded === `panel${panel}`}
                    onChange={handleChange(`panel${panel}`)}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${panel}bh-content`}
                      id={`panel${panel}bh-header`}
                    >
                      <Typography component={'span'} className={classes.heading}>
                        {item.displayName}
                      </Typography>
                      {matches.desktop && (
                        <Typography component={'span'} className={classes.secondaryHeading}>
                          {item.email}
                        </Typography>
                      )}
                      <Typography component={'span'} className={classes.secondaryHeading}>
                        {item.total}
                      </Typography>
                      {matches.largeDesktop && (
                        <Typography component={'span'} className={classes.secondaryHeading}>
                          {moment(item.createdAt.toDate()).format('lll')}
                        </Typography>
                      )}
                    </AccordionSummary>
                    <AccordionDetails className={classes.dropDown}>
                      <Typography component={'span'} className={classes.dropDownWrapper}>
                        <DashboardTable
                          data={item.aveAnswers}
                          total={item.total}
                        />
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
            <Divider />
            <Box component="span">
              <Pagination
                count={noOfPages}
                page={page}
                onChange={handlePageChange}
                defaultPage={1}
                color="secondary"
                size="large"
                showFirstButton
                showLastButton
                classes={{ ul: classes.paginator }}
              />
            </Box>
          </div>
        )}
      </Media>
    </div>
  );
};

export default Dashboard;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    width: "100vw",
    paddingTop: "150px",
  },
  wrapper: {
    width: "80%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "25%",
    flexShrink: 0,
  },
  headingSpacer: {
    width: "64px",
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "25%",
    color: theme.palette.text.secondary,
    flexShrink: 0,
    textAlign: "center"
  },
  dropDown: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#111",
  },
  dropDownWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  paginator: {
    justifyContent: "center",
    padding: "10px",
  },
  tableRow: {},
}));
