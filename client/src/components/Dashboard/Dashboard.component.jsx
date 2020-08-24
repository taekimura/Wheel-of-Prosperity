import React, { useState, useEffect } from "react";

import { getAllResults } from "../firebase/firebase_utils";

const Dashboard = () => {
  const [resultData, setResultData] = useState([]);

  useEffect(() => {
    getAllResults().then((data) => setResultData(data));
  }, []);
  useEffect(() => {
    console.log(resultData)
  }, [resultData]);

  return (
    <ul>
      {
          resultData && resultData.map((item, count) => (
              <li key={count}>
                  <span>{item.total}</span>
                  {/* <span>{item.createdAt}</span> */}
              </li>
          ))
      }
    </ul>
  );
};

export default Dashboard;
