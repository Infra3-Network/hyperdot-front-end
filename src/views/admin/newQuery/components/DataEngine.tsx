import React, {useEffect, useState} from 'react'
import {
    Box,
    Button,
    Flex,
    ListItem,
    ListIcon,
    List,
    Select,
    Alert,
    AlertIcon,
    Link,
    Icon,
    Text, propNames,

} from '@chakra-ui/react'
import {BsTable} from 'react-icons/bs';
import {hyperdotApis} from 'constants/hyperdot';
import {ArrowBackIcon} from '@chakra-ui/icons';
import {MdCheckCircle, MdSettings} from "react-icons/md";
import {SiHiveBlockchain} from "react-icons/si";
import {left} from "@popperjs/core";
import {useDisclosure} from '@chakra-ui/react'
import ChainModal from "../../../../components/chain/Modal";
import * as querystring from "querystring";
import {Simulate} from "react-dom/test-utils";
import reset = Simulate.reset;


interface QESelectProps {
    queryEngines: any,
    setDatasets: any,
    selectedDataEngine: any,
    onSelectDataEngine: any
}

function QESelect({queryEngines, setDatasets, selectedDataEngine, onSelectDataEngine}: QESelectProps) {
    if (!queryEngines) {
        return <Select mb="4" placeholder="Select Data Engine"/>
    }

    return (
        <Select
            mb="4" placeholder="Select Query Engine"
            value={selectedDataEngine}
            onChange={(e) => {
                const target = e.target.value;
                if (target.length != 0) {
                    queryEngines.forEach((val: any, i: number) => {
                        if (val.name == target) {
                            setDatasets(val.datasets)
                        }
                    })
                }
                onSelectDataEngine(e)
            }}
            isRequired={true}
        >
            {queryEngines.map((engine: any, index: number) => (
                <option key={index} value={engine.name}>{engine.name}</option>
            ))}
        </Select>
    )
}

function ChianSelect({selectedEngine, dataEngines, selectedChain, onSelectChain}) {
    if (selectedEngine.length == 0) {
        return <Select ml="4" placeholder="Select Chain"/>
    }

    // console.log(dataEngines[selectedEngine].support_chains, selectedEngine);
    const support_chains = dataEngines[selectedEngine].support_chains;


    if (!support_chains) {
        return <Select ml="4" placeholder="No Chain support for this engine"/>
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

function DataEngineView({
                            selectedDataEngine,
                            selectedChain,
                            dataTables,
                            setDataTabls,
                            selectedScheme,
                            setSelectedScheme
                        }) {
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
                                <ListIcon as={BsTable} color='gray.400'/>
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
                            <ListIcon as={BsTable} color='gray.400'/>
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

interface QECategoriesProps {
    queryEngine: string,
    engines: any,
    datasets: any,
    tag: string,
    setTag: any,
}

function QECategories(props: QECategoriesProps) {
    if (props.queryEngine.length == 0 || props.tag.length != 0) {
        return null
    }

    if (props.datasets.length == 0) {
        return (
            <p> empty todo...</p>
        )
    }


    return (
        <nav>
            <List spacing={0}>
                {Object.keys(props.datasets).map(key => (
                    <ListItem _hover={{background: 'gray.200'}} borderRadius={'3px'} ml={'6px'} mr={'6px'}
                              padding={'2px'}
                              value={props.datasets[key].title}
                              key={props.datasets[key].title}
                              onClick={(e) => {
                                  props.setTag(props.datasets[key].id)
                              }}

                    >
                        <Flex
                            align={'center'}
                            direction={'row'}
                        >
                            <ListIcon mr={0} boxSize={8} as={SiHiveBlockchain}/>
                            <Link
                                key={props.datasets[key].title}
                            >
                                <Box
                                    borderRadius={'3px'}
                                    padding={'1rem'}
                                >
                                    <p
                                        style={{
                                            fontSize: '18px',
                                            fontWeight: '500',
                                            lineHeight: '1.6rem',
                                        }}
                                    >
                                        {props.datasets[key].title}
                                    </p>
                                    <p
                                        style={{
                                            fontSize: '14px',
                                            fontWeight: '400',
                                            lineHeight: '1.4rem',
                                        }}
                                    >
                                        {props.datasets[key].description}
                                    </p>
                                </Box>
                            </Link>
                        </Flex>
                    </ListItem>
                ))}

            </List>
        </nav>
    )
}

const fetchDataset = (queryEngine: string, tag: string, setData: any) => {
    if (queryEngine.length == 0 || tag.length == 0) {
        return
    }

    const schemeApi = `/apis/v1/query/engines/${queryEngine.toLowerCase()}/datasets/${tag.toLowerCase()}`;
    const apiUrl = process.env.RESTURL_HYPERDOT + schemeApi;

    try {
        const response =  fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
           return response.json()
        }).then(data => {
            if (data.code != 1) {
                console.error('Error fetching data tables:', data);
                return
            }

            setData(data.data)
        })

    } catch (error) {
        console.error('Error fetching data tables:', error);
    }
}


interface QEChainsProps {
    tag: string
    queryEngine: string,
    setTag: any
    data: any,
    setData: any,
}

function QEChains(props: QEChainsProps) {
    if (props.tag.length == 0 || props.queryEngine.length == 0) {
        return null
    }

    useEffect(() => {
        fetchDataset(props.queryEngine, props.tag, props.setData);
    }, [props.queryEngine, props.setData, props.tag]);

    const {isOpen, onOpen, onClose} = useDisclosure()

    if (props.data == null) {
        return null
    }
    console.log(props.data)
    return (
        <Flex
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
        >
            <Flex direction={'row'} alignItems={'center'}>
                <Button
                    gridGap={'0.58rem'}
                    display={'inline-flex'}
                    padding={'0.65rem'}
                    borderRadius={'3px'}
                    overflow={'hidden'}
                    bgColor={'transparent'}
                    _hover={{background: 'gray.400'}}
                    onClick={() => {
                        props.setTag('')
                    }}
                >
                    <Icon as={ArrowBackIcon} cursor={'pointer'}/>
                    <Text fontSize={'sm'}> {props.tag}  </Text>
                </Button>
            </Flex>
            <Button
                display={'inline-flex'}
                padding={'0.4rem'}
                borderRadius={'3px'}
                overflow={'hidden'}
                bgColor={'transparent'}
                fontSize={'sm'}
                _hover={{background: 'gray.400'}}
                onClick={onOpen}>All Chains</Button>
            <ChainModal isOpen={isOpen} onClose={onClose} chains={props.data.chains} relayChains={props.data.relayChains}/>
        </Flex>
    )
}

interface Props {
    engines: any,
    queryEngine: any,
    onSelectDataEngine: any,
}

export default function DataEngine(props: Props) {
    const [dataTables, setDataTabls] = useState(null);
    const [selectScheme, setSelectedScheme] = useState('');
    const [datasets, setDatasets] = useState(null);
    const [tag, setTag] = useState("");
    const [data, setData] = useState(null)
    return (
        <Flex direction="column" height="100%">
            {/* 第一部分 */}

            <Flex direction="column" p="4">
                < QESelect
                    queryEngines={props.engines}
                    setDatasets={setDatasets}
                    selectedDataEngine={props.queryEngine}
                    onSelectDataEngine={props.onSelectDataEngine}
                    // setSelectedEngine={setSelectedEngine}
                />

                <Alert status="info">
                    <AlertIcon/>
                    Selecting a supported Data Engine will show the chain supported by that Data Engine
                </Alert>
            </Flex>

            <QECategories
                queryEngine={props.queryEngine}
                engines={props.engines}
                datasets={datasets}
                tag={tag}
                setTag={setTag}
            />

            <QEChains tag={tag} queryEngine={props.queryEngine} data={data} setData={setData}
                      setTag={setTag}/>


            {/*<Flex direction="column" p="4">*/}
            {/*    <Flex align="center" mb="4">*/}
            {/*        <IconButton*/}
            {/*            aria-label='back-tables'*/}
            {/*            bg='transparent'*/}
            {/*            size={'md'}*/}
            {/*            _hover={{ bg: 'none' }}*/}
            {/*            rounded={'none'}*/}
            {/*            boxShadow={'none'}*/}
            {/*            variant={'unstyled'}*/}
            {/*            icon={<ArrowBackIcon />}*/}
            {/*            onClick={() => {*/}
            {/*                if (selectScheme) {*/}
            {/*                    setSelectedScheme('')*/}
            {/*                }*/}
            {/*            }}*/}
            {/*        />*/}


            {/*        /!* <Link href="#" onClick={() => {*/}
            {/*            if (selectScheme) {*/}
            {/*                setSelectedScheme('')*/}
            {/*            }*/}
            {/*        }}>*/}
            {/*            return*/}
            {/*        </Link> *!/*/}
            {/*        <ChianSelect*/}
            {/*            selectedEngine={props.selectedDataEngine}*/}
            {/*            dataEngines={props.dataEngines}*/}
            {/*            selectedChain={props.selectedChain}*/}
            {/*            onSelectChain={props.onSelectChain}*/}
            {/*        />*/}

            {/*    </Flex>*/}
            {/*    <Flex direction="column">*/}
            {/*        <DataEngineView*/}
            {/*            selectedDataEngine={props.selectedDataEngine}*/}
            {/*            selectedChain={props.selectedChain}*/}
            {/*            dataTables={dataTables}*/}
            {/*            setDataTabls={setDataTabls}*/}
            {/*            selectedScheme={selectScheme}*/}
            {/*            setSelectedScheme={setSelectedScheme}*/}
            {/*        />*/}
            {/*    </Flex>*/}
            {/*</Flex>*/}
        </Flex>
    )
}
