export type TSeverity = "Good" | "Medium" | "Bad";

export interface ISensorDetail {
  title: string;
  data: {
    value: number | boolean;
    unit: string;
  };
  status: TSeverity;
}

export interface ISensorData {
  id: string;
  status: TSeverity;
  type: "OAQ" | "IEQ" | "IEQPM" | "TUNDRA";
  model: "AM107-915" | "AM308-915" | "N/A";
  building: "Main";
  floor: number | string;
  location: string;
  details: ISensorDetail[];
  alerts: string[];
  timestamp: string;
}
