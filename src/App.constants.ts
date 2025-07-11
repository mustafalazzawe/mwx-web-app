import type { ISensorData } from "./App.types";

export const sensors: ISensorData[] = [
  {
    id: "B8D61ABC26A8",
    status: "Good",
    type: "OAQ",
    model: "N/A",
    building: "Main",
    floor: "5",
    location: "Roof",
    details: [
      {
        title: "Temperature",
        data: {
          value: 72,
          unit: "°F",
        },
        status: "Good",
      },
      {
        title: "Ozone",
        data: {
          value: 66,
          unit: "ppb",
        },
        status: "Good",
      },
      {
        title: "Humidity",
        data: {
          value: 60.5,
          unit: "%",
        },
        status: "Good",
      },
      {
        title: "NO2",
        data: {
          value: 43,
          unit: "ppb",
        },
        status: "Good",
      },
      {
        title: "PM 2.5",
        data: {
          value: 3317,
          unit: "mg/m³",
        },
        status: "Good",
      },
    ],
    alerts: [""],
    timestamp: "06/04/2025 12:38:39 PM",
  },
  {
    id: "24E124128B163809",
    status: "Medium",
    type: "IEQ",
    model: "AM107-915",
    building: "Main",
    floor: "4",
    location: "RM 317",
    details: [
      {
        title: "Temperature",
        data: {
          value: 75,
          unit: "°F",
        },
        status: "Medium",
      },
      {
        title: "Pressure",
        data: {
          value: 1008,
          unit: "hpa",
        },
        status: "Good",
      },
      {
        title: "Humidity",
        data: {
          value: 60.5,
          unit: "%",
        },
        status: "Good",
      },
      {
        title: "Illumination",
        data: {
          value: 39,
          unit: "lux",
        },
        status: "Good",
      },
      {
        title: "CO2",
        data: {
          value: 1124,
          unit: "ppm",
        },
        status: "Good",
      },
      {
        title: "Motion Detection",
        data: {
          value: true,
          unit: "",
        },
        status: "Good",
      },
      {
        title: "TVOC",
        data: {
          value: 312,
          unit: "ppb",
        },
        status: "Medium",
      },
      {
        title: "Battery",
        data: {
          value: 84,
          unit: "%",
        },
        status: "Good",
      },
    ],
    alerts: [
      "The current temperature exceeds 73 °F. Please take necessary precautions to stay cool and hydrated.",
      "The current tvoc level is within the moderate index category of 204 - 660 ppb. Please be aware that prolonged exposure to these levels may have health implecations.",
    ],
    timestamp: "06/04/2025 12:38:39 PM",
  },
  {
    id: "24E124707D486876",
    status: "Bad",
    type: "IEQPM",
    model: "AM308-915",
    building: "Main",
    floor: "4",
    location: "RM 321",
    details: [
      {
        title: "Temperature",
        data: {
          value: 72,
          unit: "°F",
        },
        status: "Good",
      },
      {
        title: "PM 2.5",
        data: {
          value: 3317,
          unit: "mg/m³",
        },
        status: "Good",
      },
      {
        title: "Humidity",
        data: {
          value: 60.5,
          unit: "%",
        },
        status: "Good",
      },
      {
        title: "PM 10",
        data: {
          value: 3317,
          unit: "mg/m³",
        },
        status: "Good",
      },
      {
        title: "CO2",
        data: {
          value: 1630,
          unit: "ppm",
        },
        status: "Bad",
      },
      {
        title: "Light Level",
        data: {
          value: 1,
          unit: "",
        },
        status: "Good",
      },
      {
        title: "TVOC",
        data: {
          value: 345,
          unit: "ppb",
        },
        status: "Good",
      },
      {
        title: "Motion Detection",
        data: {
          value: true,
          unit: "",
        },
        status: "Good",
      },
      {
        title: "Pressure",
        data: {
          value: 1008,
          unit: "hpa",
        },
        status: "Good",
      },
      {
        title: "Battery",
        data: {
          value: 84,
          unit: "%",
        },
        status: "Good",
      },
    ],
    alerts: [
      "The current CO2 levels detected exceed 1500 ppm, indicating a significant concern for indoor air quality.",
    ],
    timestamp: "06/04/2025 12:38:39 PM",
  },
  {
    id: "647FDA000001BB4B",
    status: "Good",
    type: "TUNDRA",
    model: "N/A",
    building: "Main",
    floor: "1",
    location: "Freezer",
    details: [
      {
        title: "Temperature",
        data: {
          value: 72,
          unit: "°F",
        },
        status: "Good",
      },
      {
        title: "Battery",
        data: {
          value: 84,
          unit: "%",
        },
        status: "Good",
      },
      {
        title: "Humidity",
        data: {
          value: 60.5,
          unit: "%",
        },
        status: "Good",
      },
    ],
    alerts: [""],
    timestamp: "06/04/2025 12:38:39 PM",
  },
];
