import {
  Box, SimpleGrid, Flex,
  ListItem,
  Button,
  ListIcon,
  List,
  Grid,
  GridItem,
  Input, IconButton, Select, Alert, AlertIcon, Link, UnorderedList, CircularProgress
} from '@chakra-ui/react'
import { BiSearch, BiFullscreen, BiCollapse, BiCodeAlt } from 'react-icons/bi';
import { AiOutlineFundView } from 'react-icons/ai';
import { BsTable } from 'react-icons/bs';
import { SearchIcon, TriangleDownIcon } from '@chakra-ui/icons';

import Card from "components/card/Card"


import {
  polkadotBlockColumns,

} from 'views/admin/newQuery/variables/polkadotColumnData';

import Editor from 'views/admin/newQuery/components/DevelopTextEditor';
import PolkadotBlockTable from 'views/admin/newQuery/components/PolkadotBlockTable';
import polkadotData from 'views/admin/newQuery/variables/polkadotData.json';
import DevelopmentTable from 'views/admin/dataTables/components/DevelopmentTable'
import CheckTable from 'views/admin/dataTables/components/CheckTable'
import ColumnsTable from 'views/admin/dataTables/components/ColumnsTable'
import ComplexTable from 'views/admin/dataTables/components/ComplexTable'
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex
} from 'views/admin/dataTables/variables/columnsData'
import tableDataDevelopment from 'views/admin/dataTables/variables/tableDataDevelopment.json'
import tableDataCheck from 'views/admin/dataTables/variables/tableDataCheck.json'
import tableDataColumns from 'views/admin/dataTables/variables/tableDataColumns.json'
import tableDataComplex from 'views/admin/dataTables/variables/tableDataComplex.json'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import AdminLayout from 'layouts/admin'
import { TableData } from 'views/admin/default/variables/columnsData'
import dynamic from 'next/dynamic'


function DataEngineSelect({ selectedEngine, setSelectedEngine, dataEngines }) {
  if (!dataEngines) {
    return <Select mb="4" placeholder="Select Data Engine" />
  }

  return (
    <Select mb="4" placeholder="Select Data Engine" value={selectedEngine} onChange={(e) => setSelectedEngine(e.target.value)}>
      {dataEngines.engines.map((engine, index) => (
        <option key={index} value={engine.name}>{engine.name}</option>
      ))}
    </Select>
  )
}

function ChianSelect({ selectedEngine, dataEngines, selectedChain, setSelectedChain }) {
  if (selectedEngine.length == 0) {
    return <Select ml="4" placeholder="Select Chain" />
  }
  if (!dataEngines.support_chains[selectedEngine]) {
    return <Select ml="4" placeholder="No Chain support for this engine" />
  }

  let chains = dataEngines.support_chains[selectedEngine];
  return (
    <Select ml="4" placeholder="Select Chain" value={selectedChain} onChange={(e) => setSelectedChain(e.target.value)}>
      {chains.map(chain => (
        <option key={chain} value={chain}>
          {chain}
        </option>
      ))}
    </Select>
  )
}

function DataEngineView({ selectedEngine, selectedChain, dataTables, setDataTables }) {
  if (!(selectedEngine && selectedChain)) {
    return <Box bg="gray.400"></Box>
  }


  useEffect(() => {
    if (selectedEngine && selectedChain) {
      if (selectedEngine == "postgres" && selectedChain == "polkadot") {
        if (dataTables === null) {
          fetch('http://127.0.0.1:3000/apis/v1/polkadot/psql/tables')
            .then(response => response.json())
            .then(data => setDataTables(data))
            .catch(error => console.error(error));

        }
      }
    }
  }, [selectedEngine, selectedChain, setDataTables])

  if (dataTables === null) {
    return <Box bg="gray.400"></Box>
  }


  dataTables.tables.map(table_name => {
    console.log(table_name)
  })
  return (
    <List>
      {dataTables.tables.map(table_name => (

        <ListItem key={table_name}>
          <Flex align="center">
            <Box w={'20%'}>
              <ListIcon as={BsTable} color='gray.400' />
            </Box>
            <Box w={'80%'}>
              <Link href="#" >
                {table_name}
              </Link>
            </Box>
            {/* <Box ml="2"><AiOutlineFundView/></Box> */}
            {/* <Button ml="2" size="sm" variant="ghost">按钮图标</Button> */}
          </Flex>
        </ListItem>
      ))}
    </List>
  )
}



export default function NewQuery() {
  const editorRef = useRef<any>(null);
  const [dataEngines, setDataEngines] = useState(null);
  const [selectedEngine, setSelectedEngine] = useState('');
  const [selectedChain, setSelectedChian] = useState('');
  const [dataTables, setDataTabls] = useState(null);
  const [isRunning, setRunning] = useState(false);
  const [editorValue, setEditorValue] = useState('');



  const AceEditor = dynamic(
    () => import('views/admin/newQuery/components/DevelopTextEditor'),
    { ssr: false }
  )

  useEffect(() => {
    fetchDataEngines();
  }, []);

  const fetchDataEngines = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/apis/core/dataengines');
      const data = await response.json();
      setDataEngines(data);
    } catch (error) {
      console.error('Error fetching data engines:', error);
    }
  };

  return (
    <AdminLayout>
      <Flex height="100vh" pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <Box width="20%" height="100%" >
          <Flex direction="column" height="100%">
            {/* 第一部分 */}
            <Flex direction="column" p="4">
              <DataEngineSelect
                dataEngines={dataEngines}
                selectedEngine={selectedEngine}
                setSelectedEngine={setSelectedEngine}
              />

              <Alert status="info">
                <AlertIcon />
                这是一个信息提示框
              </Alert>
            </Flex>
            <Flex direction="column" p="4">
              <Flex align="center" mb="4">
                <Link href="#">链接</Link>
                <ChianSelect
                  selectedEngine={selectedEngine}
                  dataEngines={dataEngines}
                  selectedChain={selectedChain}
                  setSelectedChain={setSelectedChian}
                />

              </Flex>
              <Flex direction="column">
                <DataEngineView
                  selectedEngine={selectedEngine}
                  selectedChain={selectedChain}
                  dataTables={dataTables}
                  setDataTables={setDataTabls}
                />
              </Flex>
            </Flex>
          </Flex>
        </Box>

        <Box
          width="80%"
          height="100%"
        >

          <Flex
            // height="40%"
            direction="column"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
          >

              <AceEditor
                mode="mysql"
                theme="monokai"
                name="blah2"
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                width="100%"
                editorRef={editorRef}
                height='200px'
                value={editorValue}
                setEditorValue={setEditorValue}
              />

          </Flex>

          <Flex
            mt="5"
            direction="column"
          >
            <PolkadotBlockTable
              columnsData={polkadotBlockColumns}
              tableData={polkadotData}
            />
            {/* </Box> */}
          </Flex>

        </Box>
      </Flex>
    </AdminLayout>
  )
}
