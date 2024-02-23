import React, { useState, useEffect, useRef } from "react";
import { useDownloadExcel } from 'react-export-table-to-excel';
import Sidebar from "../../../Components/Sidebar/Sidebar";
import styles from "./Complaints.module.css";
import Welcome from "../../../Components/Welcome/Welcome";
import FacultyTable from "../../../Components/Tables/FacultyTable";

const FacultyComplaints = () => {
  const tableRef = useRef(null);
  const currentDate = new Date().toISOString().slice(0, 10);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: `${currentDate} Faculty Complaints`,
    sheet: 'Faculty'
  });

  return (
    <>
      <div className={styles.main_container}>
        <Sidebar className={styles.stickyNav} />
        <div className={styles.container}>
          <Welcome />
          <div className={styles.form_group}>
            <div className={styles.button_container}>
            <button className="button-primary" onClick={onDownload}>Download Excel</button>
            </div>
            <div className={styles.title}>Faculty Complaints</div>
            <FacultyTable ref={tableRef}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default FacultyComplaints;
