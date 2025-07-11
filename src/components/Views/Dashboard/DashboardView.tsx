import { useState, useEffect } from "react";
import type { FC } from "react";
import {
  DashboardViewWrapper,
  DashboardContent,
  DashboardGrid,
  TableSection,
} from "./DashboardView.styled";
import TopNav from "../../Navbars/TopNav/TopNav";
import SubNav from "../../Navbars/SubNav/SubNav";
import Card from "../../Card/Card";
import SensorStatusChart from "../../Charts/SensorStatusChart";
import SensorCountChart from "../../Charts/SensorCountChart";
import SensorTable from "../../Table/src/SensorTable";

interface IDashboardData {
  sensorCount: number;
  activeAlerts: number;
}

const DashboardView: FC = () => {
  const [dashboardData, setDashboardData] = useState<IDashboardData | null>(
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

        const mockData: IDashboardData = {
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
          <>
            <DashboardGrid>
              <Card $variant="Metric" title="Total Sensors">
                <div className="metric-value">{dashboardData.sensorCount}</div>
              </Card>

              <Card
                $variant="Metric"
                title="Active Alerts"
                $hasAlert={dashboardData.activeAlerts > 0}
              >
                <div className="metric-value">{dashboardData.activeAlerts}</div>
              </Card>

              <Card $variant="Chart" title="Sensor Count">
                <SensorCountChart />
              </Card>

              <Card $variant="Chart" title="Sensor Status">
                <SensorStatusChart />
              </Card>
            </DashboardGrid>

            <TableSection>
              <Card $variant="Table" title="List">
                <SensorTable />
              </Card>
            </TableSection>
          </>
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
