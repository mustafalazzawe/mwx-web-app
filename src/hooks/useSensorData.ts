import { useState, useEffect, useCallback } from "react";
import type { ISensorData } from "../App.types";
import { getAssetPath } from "../utils/assetsPaths";

interface ISensorDataResponse {
  sensors: ISensorData[];
}

interface IUseSensorDataReturn {
  sensors: ISensorData[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useSensorData = (): IUseSensorDataReturn => {
  const [sensors, setSensors] = useState<ISensorData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSensorData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Simulate network delay for realistic loading experience
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Use proper asset path
      const dataPath = getAssetPath("data/sensor-data.json");
      console.log("Fetching sensor data from:", dataPath);

      const response = await fetch(dataPath);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch sensor data: ${response.status} ${response.statusText}`
        );
      }

      const data: ISensorDataResponse = await response.json();

      // Validate data structure
      if (!data.sensors || !Array.isArray(data.sensors)) {
        throw new Error("Invalid sensor data format");
      }

      console.log(`Loaded ${data.sensors.length} sensors from ${dataPath}`);
      setSensors(data.sensors);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      console.error("Error loading sensor data:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSensorData();
  }, [fetchSensorData]);

  return {
    sensors,
    isLoading,
    error,
    refetch: fetchSensorData, // Use the memoized version
  };
};
