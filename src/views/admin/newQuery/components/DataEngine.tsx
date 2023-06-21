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
    IconButton,
} from '@chakra-ui/react'
import { BsTable } from 'react-icons/bs';
import { hyperdotApis } from 'constants/hyperdot';
import { ArrowBackIcon } from '@chakra-ui/icons';

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
            {Object.keys(dataEngines).map((engine, index) => (
                <option key={index} value={engine}>{engine}</option>
            ))}
        </Select>
    )
}

function ChianSelect({ selectedEngine, dataEngines, selectedChain, onSelectChain }: any) {
    if (selectedEngine.length == 0) {
        return <Select ml="4" placeholder="Select Chain" />
    }

    // console.log(dataEngines[selectedEngine].support_chains, selectedEngine);
    const support_chains = dataEngines[selectedEngine].support_chains;


    if (!support_chains) {
        return <Select ml="4" placeholder="No Chain support for this engine" />
    }

    // let chains = dataEngines.support_chains[selectedEngine];
    return (
        <Select ml="4" placeholder="Select Chain" value={selectedChain} onChange={onSelectChain}>
            {Object.keys(support_chains).map(chain => (
                <option key={chain} value={chain}>
                    {chain}
                </option>
            ))}
        </Select>
    )
}

const fetchDataTables = async (selectedDataEngine: string,
    selectedChain: string,
    dataTables: any,
    setDataTabls: any

) => {
    const schemeApi = hyperdotApis["dataengine"]["scheme"][selectedDataEngine];
    if (!schemeApi) {
        alert("can not support dataengine scheme")
        return
    }

    const apiUrl = process.env.RESTURL_HYPERDOT + schemeApi;
    // console.log(apiUrl)

    if (!dataTables) {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chain: selectedChain
                })
            });
            const data = await response.json();
            console.log("shcme data: ", data)
            setDataTabls(data.tables);

        } catch (error) {
            console.error('Error fetching data tables:', error);
        }
    }

    // if (selectedDataEngine && selectedChain) {
    //     if (selectedDataEngine == "postgres" && selectedChain == "polkadot") {
    //         if (!dataTables) {
    //             try {
    //                 const response = await fetch('http://127.0.0.1:3000/apis/v1/polkadot/psql/tables');
    //                 const data = await response.json();
    //                 setDataTabls(data);
    //             } catch (error) {
    //                 console.error('Error fetching data tables:', error);
    //             }
    //         }
    //     }
    // }
}

function DataEngineView({ selectedDataEngine, selectedChain, dataTables, setDataTabls, selectedScheme, setSelectedScheme }) {
    if (!(selectedDataEngine && selectedChain)) {
        return <Box bg="gray.400"></Box>
    }

    if (selectedScheme) {
        const table_infos = dataTables[selectedScheme];
        if (!table_infos) {
            return <Box bg="gray.400"></Box>
        }
        return (
            <List>
                {table_infos.map((table_info, index) => (

                    <ListItem key={table_info.column_name}>
                        <Flex align="center">
                            <Box w={'60%'}>
                                <ListIcon as={BsTable} color='gray.400' />
                                {table_info.column_name}
                            </Box>
                            <Box w={'40%'}>
                                {table_info.data_type.toUpperCase()}
                            </Box>
                            {/* <Box ml="2"><AiOutlineFundView/></Box> */}
                            {/* <Button ml="2" size="sm" variant="ghost">按钮图标</Button> */}
                        </Flex>
                    </ListItem>
                ))}
            </List>
        )

    }

    useEffect(() => {
        fetchDataTables(selectedDataEngine, selectedChain, dataTables, setDataTabls)
    })

    if (!dataTables) {
        return <Box bg="gray.400"></Box>
    }

    return (
        <List>
            {Object.keys(dataTables).map(table_name => (

                <ListItem key={table_name}>
                    <Flex align="center">
                        <Box w={'20%'}>
                            <ListIcon as={BsTable} color='gray.400' />
                        </Box>
                        <Box w={'80%'}>
                            <Link href="#" name={table_name} onClick={(e) => {
                                setSelectedScheme(e.target.name)
                            }}>
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
    const [selectScheme, setSelectedScheme] = useState('');
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
                    Selecting a supported Data Engine will show the chain supported by that Data Engine
                </Alert>
            </Flex>
            <Flex direction="column" p="4">
                <Flex align="center" mb="4">
                    <IconButton
                        aria-label='back-tables'
                        bg='transparent'
                        size={'md'}
                        _hover={{ bg: 'none' }}
                        rounded={'none'}
                        boxShadow={'none'}
                        variant={'unstyled'}
                        icon={<ArrowBackIcon />}
                        onClick={() => {
                            if (selectScheme) {
                                setSelectedScheme('')
                            }
                        }}
                    />


                    {/* <Link href="#" onClick={() => {
                        if (selectScheme) {
                            setSelectedScheme('')
                        }
                    }}>
                        return
                    </Link> */}
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
                        selectedScheme={selectScheme}
                        setSelectedScheme={setSelectedScheme}
                    />
                </Flex>
            </Flex>
        </Flex>
    )
}
