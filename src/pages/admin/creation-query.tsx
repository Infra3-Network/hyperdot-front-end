import {
    Box, Flex,

} from '@chakra-ui/react'
import Card from "components/card/Card"
import React, {useEffect, useState} from 'react'
import AdminLayout from 'layouts/admin'
import dynamic from 'next/dynamic'
import DataEngine from 'views/admin/newQuery/components/DataEngine';
import {hyperdotApis} from 'constants/hyperdot';
import * as process from "process";
import mockEngins from 'views/admin/newQuery/variables/engines.json'


const fetchDataEngines = async (setDataEngines: any) => {
    try {
        if (process.env.DEV) {
            setDataEngines(mockEngins.data)
            return
        }
        let url = process.env.RESTURL_HYPERDOT + hyperdotApis["system"]["dataengines"]
        console.log(url)

        const data = await fetch(url).then((res) => res.json());
        // console.log(dd)
        // const response = await fetch('http://127.0.0.1:3000/apis/core/dataengines');
        // const data = await response.json();
        setDataEngines(data.engines);
    } catch (error) {
        console.error('Error fetching data engines.json:', error);
    }
};

export default function CreationQuery() {
    const [dataEngines, setDataEngines] = useState(null);
    const [selectedDataEngine, setSelectedDataEngine] = useState('');
    const [selectedChain, setSelectedChian] = useState('');

    useEffect(() => {
        fetchDataEngines(setDataEngines)
    }, [])
    //
    //
    // if (!dataEngines) {
    //   return null
    // }

    const DataPlayground = dynamic(
        () => import('views/admin/newQuery/components/DataPlayground'),
        {ssr: false}
    )

    return (
        <AdminLayout>
            <Flex height="100vh" pt={{base: '130px', md: '80px', xl: '80px'}}>
                <Box width="25%" height="100%" padding={0} borderRadius={'2px'}  mr={'8px'} overflow={'auto'}>
                        <DataEngine
                            engines={dataEngines}
                            queryEngine={selectedDataEngine}
                            onSelectDataEngine={(e) => setSelectedDataEngine(e.target.value)}
                            selectedChain={selectedChain}
                            onSelectChain={(e) => setSelectedChian(e.target.value)}

                        />

                </Box>
                <Box
                    width="75%"
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
