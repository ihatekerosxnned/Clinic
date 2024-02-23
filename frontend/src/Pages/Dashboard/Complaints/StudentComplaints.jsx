import React, {useRef, useState, useEffect} from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';
import Sidebar from "../../../Components/Sidebar/Sidebar";
import styles from "./Complaints.module.css";
import Welcome from "../../../Components/Welcome/Welcome";
import StudentsTable from "../../../Components/Tables/StudentsTable";

const StudentComplaints = () => {
  const tableRef = useRef(null);
  const currentDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: `${currentDate} Students Complaints`,
    sheet: 'Students'
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
            <div className={styles.title}>Student Complaints</div>
            <StudentsTable ref={tableRef}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentComplaints;
