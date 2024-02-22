import React, { useState, useEffect, useRef } from "react";
import { DownloadTableExcel } from 'react-export-table-to-excel';
import Sidebar from "../../../Components/Sidebar/Sidebar";
import styles from "./Complaints.module.css";
import Welcome from "../../../Components/Welcome/Welcome";
import FacultyTable from "../../../Components/Tables/FacultyTable";

const FacultyComplaints = () => {
  const tableRef = useRef(null);
  const currentDate = new Date().toISOString().slice(0, 10);
  return (
    <>
      <div className={styles.main_container}>
        <Sidebar className={styles.stickyNav} />
        <div className={styles.container}>
          <Welcome />
          <div className={styles.form_group}>
            <div className={styles.button_container}>
            <DownloadTableExcel
                    filename={`${currentDate} - Faculty Complaints`}
                    sheet="Student Complaints"
                    currentTableRef={tableRef.current}
                >

                   <button className="button-primary">Download Excel</button>

                </DownloadTableExcel>
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