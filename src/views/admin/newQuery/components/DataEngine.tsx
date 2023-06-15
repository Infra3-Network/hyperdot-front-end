import React, { useEffect, useState } from 'react'
import {
    Box,
    Flex,
    ListItem,
    ListIcon,
    List,
    Select,
    Alert,
    AlertIcon,
    Link,
} from '@chakra-ui/react'
import { BsTable } from 'react-icons/bs';

function DataEngineSelect({ dataEngines, selectedDataEngine, onSelectDataEngine }: { dataEngines: any, selectedDataEngine: any, onSelectDataEngine: any }) {
    if (!dataEngines) {
        return <Select
            mb="4"
            placeholder="Select Data Engine"
        />
    }

    return (

        <Select
            mb="4" placeholder="Select Data Engine"
            value={selectedDataEngine}
            onChange={onSelectDataEngine}
            isRequired={true}
        >
            {dataEngines.engines.map((engine, index) => (
                <option key={index} value={engine.name}>{engine.name}</option>
            ))}
        </Select>
    )
}

function ChianSelect({ selectedEngine, dataEngines, selectedChain, onSelectChain }) {
    if (selectedEngine.length == 0) {
        return <Select ml="4" placeholder="Select Chain" />
    }
    if (!dataEngines.support_chains[selectedEngine]) {
        return <Select ml="4" placeholder="No Chain support for this engine" />
    }

    let chains = dataEngines.support_chains[selectedEngine];
    return (
        <Select ml="4" placeholder="Select Chain" value={selectedChain} onChange={onSelectChain}>
            {chains.map(chain => (
                <option key={chain} value={chain}>
                    {chain}
                </option>
            ))}
        </Select>
    )
}

function DataEngineView({ selectedDataEngine, selectedChain, dataTables, setDataTabls }) {
    if (!(selectedDataEngine && selectedChain)) {
        return <Box bg="gray.400"></Box>
    }


 const fetchDataTables = async (selectedDataEngine, selectedChain) => {
        if (selectedDataEngine && selectedChain) {
            if (selectedDataEngine == "postgres" && selectedChain == "polkadot") {
                if (!dataTables) {
                    try {
                        const response = await fetch('http://127.0.0.1:3000/apis/v1/polkadot/psql/tables');
                        const data = await response.json();
                        setDataTabls(data);
                    } catch (error) {
                        console.error('Error fetching data tables:', error);
                    }
                }
            }
        }
    }

    useEffect(() => {
        fetchDataTables(selectedDataEngine, selectedChain)
    })
   
    if (!dataTables) {
        return <Box bg="gray.400"></Box>
    }

    console.log(dataTables)

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

export default function DataEngine(props) {
    const [dataTables, setDataTabls] = useState(null);
    return (

        <Flex direction="column" height="100%">
            {/* 第一部分 */}

            <Flex direction="column" p="4">
                <DataEngineSelect
                    dataEngines={props.dataEngines}
                    selectedDataEngine={props.selectedDataEngine}
                    onSelectDataEngine={props.onSelectDataEngine}
                // setSelectedEngine={setSelectedEngine}
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
                        selectedEngine={props.selectedDataEngine}
                        dataEngines={props.dataEngines}
                        selectedChain={props.selectedChain}
                        onSelectChain={props.onSelectChain}
                    />

                </Flex>
                <Flex direction="column">
                    <DataEngineView
                        selectedDataEngine={props.selectedDataEngine}
                        selectedChain={props.selectedChain}
                        dataTables={dataTables}
                        setDataTabls={setDataTabls}
                    />
                </Flex>
            </Flex>
        </Flex>
    )
}
