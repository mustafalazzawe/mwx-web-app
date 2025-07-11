import { useEffect } from "react";
import type { FC } from "react";
import { useEchartsBase } from "../../hooks/useEchartsBase";
import { sensors } from "../../App.constants";
import { useTheme } from "styled-components";

interface ITypeCount {
  [key: string]: number;
}

const SensorCountChart: FC = () => {
  const theme = useTheme();
  const { chartRef, initChart, mode } = useEchartsBase();

  useEffect(() => {
    // Calculate type counts from sensor data
    const typeCounts: ITypeCount = sensors.reduce((acc, sensor) => {
      const type = sensor.type;
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as ITypeCount);

    const typeColors = {
      IEQ: "#6B8DD6",
      IEQPM: "#48A360",
      OAQ: "#F89D2A",
      TUNDRA: "#DE5646",
      ELECTRICAL: "#79DFFE",
    };

    // Convert to chart data format
    const chartData = Object.entries(typeCounts).map(([type, count]) => ({
      value: count,
      name: type,
      itemStyle: {
        color:
          typeColors[type as keyof typeof typeColors] ||
          theme.palettes.greyscale[500],
      },
    }));

    const option = {
      tooltip: {
        trigger: "item" as const,
        formatter: "{b}: {c} sensors ({d}%)",
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
          name: "Sensor Count",
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
    theme.palettes.greyscale,
    theme.semanticColors.border.primary,
    theme.semanticColors.foreground,
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

export default SensorCountChart;
