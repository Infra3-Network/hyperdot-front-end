import {
  Box, Flex,

} from '@chakra-ui/react'

import React, { useEffect, useState } from 'react'
import AdminLayout from 'layouts/admin'
import dynamic from 'next/dynamic'
import DataEngine from 'views/admin/newQuery/components/DataEngine';
import { hyperdotApis } from 'constants/hyperdot';

const fetchDataEngines = async (setDataEngines: any) => {
  try {
    let url = process.env.RESTURL_HYPERDOT + hyperdotApis["system"]["dataengines"]
    console.log(url)

    const data = await fetch(url).then((res) => res.json());
    // console.log(dd)
    // const response = await fetch('http://127.0.0.1:3000/apis/core/dataengines');
    // const data = await response.json();
    setDataEngines(data.engines);
  } catch (error) {
    console.error('Error fetching data engines:', error);
  }
};

export default function NewQuery() {
  const [dataEngines, setDataEngines] = useState(null);
  const [selectedDataEngine, setSelectedDataEngine] = useState('');
  const [selectedChain, setSelectedChian] = useState('');

  useEffect(() => {
    fetchDataEngines(setDataEngines)
  }, [])


  if (!dataEngines) {
    return null
  }

  const DataPlayground = dynamic(
    () => import('views/admin/newQuery/components/DataPlayground'),
    { ssr: false }
  )

  console.log(process.env.RESTURL_HYPERDOT)
  return (
    <AdminLayout>
      <Flex height="100vh" pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <Box width="20%" height="100%" >
          <DataEngine
            dataEngines={dataEngines}
            selectedDataEngine={selectedDataEngine}
            onSelectDataEngine={(e: any) => setSelectedDataEngine(e.target.value)}
            selectedChain={selectedChain}
            onSelectChain={(e: any) => setSelectedChian(e.target.value)}

          />
        </Box>
        <Box
          width="80%"
          height="100%"
        >

          <DataPlayground
            selectedDataEngine={selectedDataEngine}
            selectedChain={selectedChain}
          />

        </Box>
      </Flex>
    </AdminLayout>
  )
}
