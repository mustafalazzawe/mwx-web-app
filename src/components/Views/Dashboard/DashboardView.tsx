import React, { useState, useEffect } from "react";
import {
  DashboardViewWrapper,
  DashboardContent,
  MetricsGrid,
  MetricCard,
} from "./DashboardView.styled";
import TopNav from "../../Navbars/TopNav/TopNav";
import SubNav from "../../Navbars/SubNav/SubNav";

interface DashboardData {
  sensorCount: number;
  activeAlerts: number;
}

const DashboardView: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  // TODO: Use real data to populate dashboard
  // Simulate dashboard data loading
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const mockData: DashboardData = {
          sensorCount: 24,
          activeAlerts: 3,
        };

        setDashboardData(mockData);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  return (
    <DashboardViewWrapper>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <TopNav />
        <SubNav />
      </div>

      <DashboardContent>
        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner" />
            <p>Loading Dashboard...</p>
          </div>
        ) : dashboardData ? (
          <MetricsGrid>
            <MetricCard>
              <div className="metric-label">Total Sensors</div>
              <div className="metric-value">{dashboardData.sensorCount}</div>
            </MetricCard>

            <MetricCard $hasAlert={dashboardData.activeAlerts > 0}>
              <div className="metric-label">Active Alerts</div>
              <div className="metric-value">{dashboardData.activeAlerts}</div>
            </MetricCard>
          </MetricsGrid>
        ) : (
          <div className="error-container">
            <h2>Failed to Load Dashboard Data</h2>
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        )}
      </DashboardContent>
    </DashboardViewWrapper>
  );
};

export default DashboardView;
