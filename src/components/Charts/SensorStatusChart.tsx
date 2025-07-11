import { useEffect } from "react";
import type { FC } from "react";
import { useTheme } from "styled-components";

import { useEchartsBase } from "../../hooks/useEchartsBase";

import type { ISensorData } from "../../App.types";

interface IStatusCount {
  [key: string]: number;
}

interface ISensorStatusChartProps {
  sensors: ISensorData[];
}

const SensorStatusChart: FC<ISensorStatusChartProps> = ({ sensors }) => {
  const theme = useTheme();
  const { chartRef, initChart, mode } = useEchartsBase();

  useEffect(() => {
    // Early return if no data
    if (!sensors || sensors.length === 0) {
      const emptyOption = {
        title: {
          text: "No Data Available",
          left: "center",
          top: "middle",
          textStyle: {
            color: theme.semanticColors.foreground["fg-secondary"],
            fontSize: 14,
            fontFamily: "Sofia Sans, sans-serif",
          },
        },
        graphic: {
          elements: [
            {
              type: "text",
              left: "center",
              top: "middle",
              style: {
                text: "No sensor data to display",
                fontSize: 12,
                fill: theme.semanticColors.foreground["fg-secondary"],
                fontFamily: "Sofia Sans, sans-serif",
              },
            },
          ],
        },
      };
      initChart(emptyOption);
      return;
    }

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

    // Handle case where all sensors have the same status
    if (chartData.length === 0) {
      const noDataOption = {
        title: {
          text: "No Status Data",
          left: "center",
          top: "middle",
          textStyle: {
            color: theme.semanticColors.foreground["fg-secondary"],
            fontSize: 14,
            fontFamily: "Sofia Sans, sans-serif",
          },
        },
      };
      initChart(noDataOption);
      return;
    }

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
    sensors,
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
