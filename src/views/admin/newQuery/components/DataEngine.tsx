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
    Text,
    Image,
    useDisclosure
} from '@chakra-ui/react'
import {BsTable} from 'react-icons/bs';
import {ArrowBackIcon} from '@chakra-ui/icons';
import {SiHiveBlockchain} from "react-icons/si";
import ChainModal from "../../../../components/chain/Modal";


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

interface QEDataTableProps {
    data: any,
    chain: any
}

function QEDataTables(props: QEDataTableProps) {
    if (!props.data) {
        return null
    }
    const chainTables = props.data.chainTables;
    let tables: string[] = [];
    if (props.chain) {
        console.log(chainTables)
        Object.keys(chainTables).forEach((key) => {
            console.log(props.chain.chainID)
            if (key == props.chain.chainID.toString()) {
                tables = chainTables[key]
                return
            }
        });
    } else {
        Object.keys(chainTables).forEach((key) => {
            tables.push(...chainTables[key])
        })
    }


    // if (selectedScheme) {
    //     const table_infos = dataTables[selectedScheme];
    //     if (!table_infos) {
    //         return <Box bg="gray.400"></Box>
    //     }
    //     return (
    //         <List>
    //             {table_infos.map((table_info, index) => (
    //
    //                 <ListItem key={table_info.column_name}>
    //                     <Flex align="center">
    //                         <Box w={'60%'}>
    //                             <ListIcon as={BsTable} color='gray.400'/>
    //                             {table_info.column_name}
    //                         </Box>
    //                         <Box w={'40%'}>
    //                             {table_info.data_type.toUpperCase()}
    //                         </Box>
    //                         {/* <Box ml="2"><AiOutlineFundView/></Box> */}
    //                         {/* <Button ml="2" size="sm" variant="ghost">按钮图标</Button> */}
    //                     </Flex>
    //                 </ListItem>
    //             ))}
    //         </List>
    //     )
    //
    // }

    return (
        <Flex
            direction="column"
            overflow={'auto'}
            gridGap={'2rem'}
            padding={'0 1rem 2rem'}
            m={'0'}
        >
            <List
                gridGap={'.5rem'}
            >

                {tables.map((table, index) => (
                    <ListItem
                        alignItems={'center'}
                        _hover={{background: 'gray.300'}}
                        key={'Test'}
                    >
                        <Flex direction={'row'}>
                            <Box w={'20%'}>
                                <ListIcon as={BsTable} color='gray.400'/>
                            </Box>
                            <Box w={'80%'}>
                                <Link href="#" onClick={() => {
                                }}>
                                    {table}
                                </Link>
                            </Box>
                        </Flex>
                    </ListItem>
                ))}
            </List>
        </Flex>
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
        const response = fetch(apiUrl, {
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
    chain: any,
    setChain: any,
}

function QEChains(props: QEChainsProps) {
    useEffect(() => {
        fetchDataset(props.queryEngine, props.tag, props.setData);
    }, [props.queryEngine, props.tag, props.setData]);


    const {isOpen, onOpen, onClose} = useDisclosure()

    if (props.data == null) {
        return null
    }
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
                        props.setChain(null)
                    }}
                >
                    <Icon as={ArrowBackIcon} cursor={'pointer'}/>
                    <Text fontSize={'sm'}> {props.tag}  </Text>
                </Button>
            </Flex>
            {props.chain ? (<Button
                display={'flex'}
                flexDirection={'row'}
                borderRadius={'3px'}
                overflow={'hidden'}
                bgColor={'gray.200'}
                _hover={{background: 'gray.400'}}
                onClick={onOpen}
            >
                <Image verticalAlign={'middle'} borderRadius={'50%'} width={'24px'}
                       src={props.chain.iconUrl}/>
                <Text fontSize={'0.85rem'} textAlign={'center'}>{props.chain.chainName}</Text>
            </Button>) : (
                <Button
                    display={'inline-flex'}
                    padding={'0.4rem'}
                    borderRadius={'3px'}
                    overflow={'hidden'}
                    bgColor={'gray.300'}
                    fontSize={'sm'}
                    _hover={{background: 'gray.400'}}
                    onClick={onOpen}>
                    All Chains
                </Button>
            )}


            <ChainModal isOpen={isOpen} onClose={onClose} chains={props.data.chains}
                        relayChains={props.data.relayChains} setChain={props.setChain}/>
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
    const [chain, setChain] = useState(null)
    return (
        <Flex direction="column" height="100%">
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

            {(tag && props.queryEngine) ? (
                <QEChains tag={tag} queryEngine={props.queryEngine} data={data} setData={setData}
                          setTag={setTag} chain={chain} setChain={setChain}/>


            ) : null}
            {(tag && props.queryEngine) ?
                (<QEDataTables data={data} chain={chain}/>) : null
            }
        </Flex>
    )
}
