import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import "./ExportData.css";
import jspdf from "jspdf";
import "jspdf-autotable";
import SimpleLoader from "../SimpleLoader/SimpleLoader";
import swal from 'sweetalert2'
import axios from 'axios'

const ExportData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("bulkmailusertoken");
      if (!token)
        return swal.fire("Error", "Session Expired, try again later", "error");
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:7000/api/v1/user/history/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLoading(false);
        setData(response.data);
      } catch (error) {
        setLoading(false);
        if (error.response.status) {
          swal.fire({
            title: error.response.statusText,
            text: error.response.data,
            icon: "error",
          });
        } else {
          swal.fire({ title: "Error", text: error.message, icon: "error" });
        }
      }
    };
    fetchData();
  }, []);

  const generatePDF = async () => {
    const doc = new jspdf();
    doc.autoTable({
      head: [['No','Window','Action','Status','Time']],
      body: data.map((row,i) => [i+1,row.window,row.action,row.status,row.time]),
    });
    doc.save("history.pdf")
  };
  return (
    <>
      <div className="export-container">
        <h1>Export History</h1>
        {loading? <SimpleLoader/> : <><Button variant="outlined" color="success">
          Export CSV
        </Button>
        <Button variant="outlined" color="error" onClick={generatePDF}>
          Export PDF
        </Button></>}
      </div>
    </>
  );
};

export default ExportData;
