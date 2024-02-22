import React, { useState, useRef } from "react";
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import styles from "./Medicines.module.css";
import Welcome from "../../../Components/Welcome/Welcome";
import MedicinesTable from "../../../Components/Tables/MedicinesTable";
import MedicinesFunctions from "../../../Components/Tables/MedicinesFunctions";

const Medicines = () => {
  const tableRef = useRef(null);
  const navigate = useNavigate();

  const [showFunctions, setShowFunctions] = useState(false);

  const currentDate = new Date().toISOString().slice(0, 10);

  const toggleFunctions = () => {
    setShowFunctions(!showFunctions);
  };

  return (
    <>
      <div className={styles.main_container}>
        <Sidebar className={styles.stickyNav} />
        <div className={styles.container}>
          <Welcome />
          <div className={styles.form_group}>
            <div className={styles.button_container}>
              <button className="button-download" onClick={(() => navigate('/medicinesadd'))}>Register Medicine</button>
              <DownloadTableExcel filename={`${currentDate} - Medicines Report`} sheet="Medicines Report" currentTableRef={tableRef.current}>
                <button className="button-download">Download Excel</button>
              </DownloadTableExcel>
              <button className="button-download-red" onClick={toggleFunctions}>{showFunctions ? 'Cancel' : 'Edit'}</button>
            </div>
            
            {showFunctions ? <MedicinesFunctions /> : <MedicinesTable ref={tableRef} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Medicines;
