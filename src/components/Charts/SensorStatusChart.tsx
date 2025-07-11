import { useEffect } from "react";
import type { FC } from "react";
import { useTheme } from "styled-components";

import { useEchartsBase } from "../../hooks/useEchartsBase";

import { sensors } from "../../App.constants";

interface IStatusCount {
  [key: string]: number;
}

const SensorStatusChart: FC = () => {
  const theme = useTheme();
  const { chartRef, initChart, mode } = useEchartsBase();

  useEffect(() => {
    // Calculate status counts from sensor data
    const statusCounts: IStatusCount = sensors.reduce((acc, sensor) => {
      const status = sensor.status.toUpperCase();
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as IStatusCount);

    // Convert to chart data format
    const chartData = [
      {
        value: statusCounts.GOOD || 0,
        name: "GOOD",
        itemStyle: {
          color: theme.semanticColors.severity.good,
        },
      },
      {
        value: statusCounts.MEDIUM || 0,
        name: "WARNING",
        itemStyle: {
          color: theme.semanticColors.severity.caution,
        },
      },
      {
        value: statusCounts.BAD || 0,
        name: "ALERT",
        itemStyle: {
          color: theme.semanticColors.severity.bad,
        },
      },
    ].filter((item) => item.value > 0); // Only show categories with data

    const option = {
      tooltip: {
        trigger: "item" as const,
        formatter: "{b}: {c} ({d}%)",
        backgroundColor: theme.semanticColors.surface[300],
        borderColor: theme.semanticColors.border.primary,
        textStyle: {
          color: theme.semanticColors.foreground["fg-primary"],
          fontSize: 12,
          fontFamily: "Sofia Sans, sans-serif",
        },
      },
      legend: {
        bottom: "5%" as const,
        left: "center" as const,
        textStyle: {
          color: theme.semanticColors.foreground["fg-primary"],
          fontSize: 12,
          fontFamily: "Sofia Sans, sans-serif",
          fontWeight: 500,
        },
        itemGap: 20,
      },
      series: [
        {
          name: "Sensor Status",
          type: "pie" as const,
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center" as const,
          },
          labelLine: {
            show: false,
          },
          data: chartData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    initChart(option);
  }, [
    initChart,
    mode,
    theme.semanticColors.border.primary,
    theme.semanticColors.foreground,
    theme.semanticColors.severity.bad,
    theme.semanticColors.severity.caution,
    theme.semanticColors.severity.good,
    theme.semanticColors.surface,
  ]);

  return (
    <div
      ref={chartRef}
      style={{
        width: "100%",
        height: "300px",
      }}
    />
  );
};

export default SensorStatusChart;
