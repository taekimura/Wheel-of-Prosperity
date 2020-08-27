import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, Box } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DashboardTable from './DashboardTable.component';
import Loading from "../Loading/Loading";
import Pagination from "@material-ui/lab/Pagination";

import { getAllResults } from "../firebase/firebase_utils";

const Dashboard = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [resultData, setResultData] = useState([]);
  const itemsPerPage = 10;
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState();
  // const [noOfPages] = useState(
  //   Math.ceil(resultData.length / itemsPerPage)
  // );

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

  if(isLoading) return(<Loading />)

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        {resultData &&
          resultData.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((item, panel) => (
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
                <Typography className={classes.heading}>
                  {item.displayName}
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  {item.email}
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  {item.total}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.dropDown}>
                <Typography >
                  <DashboardTable data={item.aveAnswers} />
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
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    color: theme.palette.text.secondary,
  },
  dropDown: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  paginator: {
    justifyContent: "center",
    padding: "10px"
  }
}));
