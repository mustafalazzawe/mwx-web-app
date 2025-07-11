import { useState, useEffect } from "react";
import type { ISensorData } from "../App.types";

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

  const fetchSensorData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Simulate network delay for realistic loading experience
      await new Promise((resolve) => setTimeout(resolve, 800));

      const response = await fetch("/data/sensor-data.json");

      if (!response.ok) {
        throw new Error(`Failed to fetch sensor data: ${response.status}`);
      }

      const data: ISensorDataResponse = await response.json();

      // Validate data structure
      if (!data.sensors || !Array.isArray(data.sensors)) {
        throw new Error("Invalid sensor data format");
      }

      setSensors(data.sensors);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      console.error("Error loading sensor data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = () => {
    fetchSensorData();
  };

  useEffect(() => {
    fetchSensorData();
  }, []);

  return {
    sensors,
    isLoading,
    error,
    refetch,
  };
};
