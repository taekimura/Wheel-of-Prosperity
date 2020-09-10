import React from "react";
import "./DashboardTable.styles.scss";

export default function DashboardTable({ data, total }) {
  return (
    <div className="dashboard-table-container">
      <table>
        <thead>
          <tr className="table-highlight">
            <th>Category</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((row, index) => (
            <tr key={index}>
              <td>{row.category}</td>
              {
                row.value === 100 ? <td>YES</td> :
                row.value === 101 ? <td>NO</td> :
                <td>{row.value}</td>
              }
            </tr>
          ))}
          <tr className="table-highlight">
            <th>Total</th>
            <th>{total}</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
