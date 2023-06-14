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

import PolkadotBlockTable from 'views/admin/newQuery/components/PolkadotBlockTable';
import polkadotData from 'views/admin/newQuery/variables/polkadotData.json';


import React, { useEffect, useRef, useState } from 'react'
import AdminLayout from 'layouts/admin'
import { TableData } from 'views/admin/default/variables/columnsData'
import dynamic from 'next/dynamic'
import DataEngine from 'views/admin/newQuery/components/DataEngine';

const fetchDataEngines = async (setDataEngines: any) => {
  try {
    const response = await fetch('http://127.0.0.1:3000/apis/core/dataengines');
    const data = await response.json();
    setDataEngines(data);
  } catch (error) {
    console.error('Error fetching data engines:', error);
  }
};

export default function NewQuery() {
  const [dataEngines, setDataEngines] = useState(null);
  const [selectedDataEngine, setSelectedDataEngine] = useState('');
  const [selectedChain, setSelectedChian] = useState('');
  // const editorRef = useRef<any>(null);

  useEffect(() => {
    fetchDataEngines(setDataEngines)
  }, [])


  if (!dataEngines) {
    return null
  }

  const DataEditor = dynamic(
    () => import('views/admin/newQuery/components/DataEditor'),
    { ssr: false }
  )

  return (
    <AdminLayout>
      <Flex height="100vh" pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <Box width="20%" height="100%" >
          <DataEngine
            dataEngines={dataEngines}
            selectedDataEngine={selectedDataEngine}
            onSelectDataEngine={(e) => setSelectedDataEngine(e.target.value)}
            selectedChain={selectedChain}
            onSelectChain={(e) => setSelectedChian(e.target.value)}
            // dataTables={dataTables}

          />
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

            <DataEditor
              selectedDataEngine={selectedDataEngine}
              selectedChain={selectedChain}
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
          </Flex>
        </Box>
      </Flex>
    </AdminLayout>
  )
}
