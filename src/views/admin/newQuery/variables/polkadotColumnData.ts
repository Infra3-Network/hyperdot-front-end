interface IColumnHeader {
    Header: string;
    accessor: string;
  }
  
  type Columns = IColumnHeader[];

  
  export const polkadotBlockColumns: Columns = [
    {
      Header: "BLOCK NUMBER",
      accessor: "block_number",
    },
    {
      Header: "BLOCK HASH",
      accessor: "block_hash",
    },
    {
      Header: "PARENT HASH",
      accessor: "parent_hash",
    },
    {
      Header: "STATE ROOT",
      accessor: "state_root",
    },
    {
        Header: "EXTRINSICS ROOT",
        accessor: "extrinsics_root",
    },
  ];