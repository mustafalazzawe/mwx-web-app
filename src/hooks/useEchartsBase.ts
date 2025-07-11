import { useCallback, useEffect, useRef } from "react";
import * as echarts from "echarts";
import { useThemeContext } from "../providers/Theme/Theme.context";

export const useEchartsBase = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const { mode } = useThemeContext();

  const initChart = useCallback((option: echarts.EChartsOption) => {
    if (!chartRef.current) return;

    // Initialize chart if it doesn't exist
    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    // Set the chart option
    chartInstance.current.setOption(option);
  }, []);

  // Handle resize and cleanup
  useEffect(() => {
    const handleResize = () => {
      chartInstance.current?.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chartInstance.current?.dispose();
      chartInstance.current = null;
    };
  }, []);

  return {
    chartRef,
    initChart,
    mode,
  };
};
