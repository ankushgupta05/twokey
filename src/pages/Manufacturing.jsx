import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardTabs from "../components/DashboardTabs";
import DepartmentFiles from "../components/DepartmentFiles";
import ErrorPage from "../components/ErrorPage";
import secureLocalStorage from "react-secure-storage";

const Marketing = () => {
  const [filesFromBackend, setFilesFromBackend] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let token = JSON.parse(secureLocalStorage.getItem("token"));

        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/file/files/Marketing/?recs=25`,
          {
            headers: {
              Authorization: `Bearer ${token.session.access_token}`,
            },
          }
        );

        setFilesFromBackend(response.data);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchData();
  }, []);

  if (!secureLocalStorage.getItem("token")) {
    return <ErrorPage error="You are not authorised" />;
  }
  return (
    <div className="p-4">
      <DashboardTabs />
      <DepartmentFiles filesFromBackend={filesFromBackend} />
    </div>
  );
};

export default Marketing;
