import React from "react";

import Table from "../Table";
import type { ITableColumn } from "../Table.types";
import type { ISensorData } from "../../../App.types";

import { sensors } from "../../../App.constants";

// Create a type that ensures ISensorData works with the table
type SensorDataForTable = ISensorData & Record<PropertyKey, unknown>;

const SensorTable: React.FC = () => {
  const columns: ITableColumn<SensorDataForTable>[] = [
    {
      key: "id",
      header: "ID",
      accessor: "id",
      sortable: true,
      width: "200px",
    },
    {
      key: "status",
      header: "STATUS",
      accessor: "status",
      sortable: true,
      width: "120px",
    },
    {
      key: "type",
      header: "TYPE",
      accessor: "type",
      sortable: true,
      width: "100px",
    },
    {
      key: "model",
      header: "MODEL",
      accessor: "model",
      sortable: true,
      width: "120px",
    },
    {
      key: "building",
      header: "BUILDING",
      accessor: "building",
      sortable: true,
      width: "120px",
    },
    {
      key: "floor",
      header: "FLOOR",
      accessor: "floor",
      sortable: true,
      align: "right",
      width: "80px",
    },
    {
      key: "location",
      header: "LOCATION",
      accessor: "location",
      sortable: true,
      width: "150px",
    },
  ];

  return (
    <Table<SensorDataForTable>
      columns={columns}
      data={sensors as SensorDataForTable[]}
      sortable={true}
    />
  );
};

export default SensorTable;
