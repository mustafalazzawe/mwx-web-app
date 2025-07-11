import { useMemo } from "react";
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
import { useSensorData } from "../../../hooks/useSensorData";
import type { IDashboardData } from "./DashboardView.types";
import Button from "../../Button/Button";

const DashboardView: FC = () => {
  const { sensors, isLoading, error, refetch } = useSensorData();

  // Calculate dashboard metrics from sensor data
  const dashboardData: IDashboardData = useMemo(() => {
    if (sensors.length === 0) {
      return { sensorCount: 0, activeAlerts: 0 };
    }

    const sensorCount = sensors.length;

    // Count sensors with alerts (non-empty alerts array)
    const activeAlerts = sensors.reduce((count, sensor) => {
      const hasAlerts =
        sensor.alerts.length > 0 &&
        sensor.alerts.some((alert) => alert.trim() !== "");
      return hasAlerts ? count + 1 : count;
    }, 0);

    return { sensorCount, activeAlerts };
  }, [sensors]);

  // Determine if there are any alerts for the card styling
  const hasActiveAlerts = dashboardData.activeAlerts > 0;

  if (isLoading) {
    return (
      <DashboardViewWrapper>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TopNav />
          <SubNav />
        </div>

        <DashboardContent>
          <div className="loading-container">
            <div className="loading-spinner" />
            <p>Loading Dashboard...</p>
          </div>
        </DashboardContent>
      </DashboardViewWrapper>
    );
  }

  if (error) {
    return (
      <DashboardViewWrapper>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TopNav />
          <SubNav />
        </div>

        <DashboardContent>
          <div className="error-container">
            <h2>Failed to Load Dashboard Data</h2>
            <p>{error}</p>
            <Button $variant="Primary" onClick={refetch}>
              Retry
            </Button>
          </div>
        </DashboardContent>
      </DashboardViewWrapper>
    );
  }

  return (
    <DashboardViewWrapper>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <TopNav />
        <SubNav />
      </div>

      <DashboardContent>
        <DashboardGrid>
          <Card $variant="Metric" title="Total Sensors">
            <div className="metric-value">{dashboardData.sensorCount}</div>
          </Card>

          <Card
            $variant="Metric"
            title="Active Alerts"
            $hasAlert={hasActiveAlerts}
          >
            <div className="metric-value">{dashboardData.activeAlerts}</div>
          </Card>

          <Card $variant="Chart" title="Sensor Count">
            <SensorCountChart sensors={sensors} />
          </Card>

          <Card $variant="Chart" title="Sensor Status">
            <SensorStatusChart sensors={sensors} />
          </Card>
        </DashboardGrid>

        <TableSection>
          <Card $variant="Table" title="Sensor List">
            <SensorTable sensors={sensors} />
          </Card>
        </TableSection>
      </DashboardContent>
    </DashboardViewWrapper>
  );
};

export default DashboardView;
