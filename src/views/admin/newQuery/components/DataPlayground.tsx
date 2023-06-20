import { useEffect, useRef, useState } from "react";
import AceEditor from "react-ace";
import { Box, Flex, IconButton, Button, SimpleGrid, CircularProgress } from '@chakra-ui/react';
import { BiFullscreen, BiCollapse, BiCodeAlt, } from 'react-icons/bi';
import { SearchIcon, TriangleDownIcon } from "@chakra-ui/icons";

import DataTable from 'views/admin/newQuery/components/DataTable';

import "ace-builds/src-noconflict/mode-mysql";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";
import beautify from 'ace-builds/src-noconflict/ext-beautify';
import { useRouter } from "next/router";
import { hyperdotApis } from "constants/hyperdot";

const defaultHeight = '200px';
const expandHeight = "250px";

const DataPlayground = (props: any) => {
    const editorRef = useRef<any>();
    const router = useRouter();
    const initValue = localStorage.getItem('query_data');
    const [height, setHeight] = useState(defaultHeight);
    const [value, setValue] = useState('')
    const [isRunning, setRunning] = useState(false);
    const [tableData, setTableData] = useState(null);

    useEffect(() => {
        if (initValue) {
            setValue(initValue)
        }

        // remove data on unload
        const handleBeforeUnload = () => {
            localStorage.removeItem('query_data')
        };
        window.addEventListener('beforeunload', handleBeforeUnload);

        router.events.on('routeChangeComplete', () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        });
    })



    const handleFormatCodeClick = () => {
        beautify.beautify(editorRef.current.editor.session)
    }

    const handleRunClick = (engine, chian, query) => {
        if (!engine) {
            alert("please select engine")
            return
        }

        if (!chian) {
            alert("please select chian")
            return
        }

        if (!query) {
            alert("please input query")
            return
        }

        console.log(engine.toLowerCase())
        setRunning(true);
        const engien_api = hyperdotApis['query']['run'][engine.toLowerCase()];
        if (!engien_api) {
            alert(engine.toLowerCase() + ' api not found')
        }
        const url = process.env.RESTURL_HYPERDOT + engien_api.url;
        const method = engien_api.method;

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                engine: engine.toLowerCase(),
                chain: chian,
                query: query,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setTableData({
                    columns: data.rows.columns.map((column) => ({
                        Header: column.toUpperCase(),
                        accessor: column
                    })),
                    rows: data.rows.rows,
                })
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setRunning(false);
            });
    }

    return (
        <Box>
            <Flex
                // height="40%"
                direction="column"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
            >
                <Box>
                    <AceEditor
                        mode="mysql"
                        theme="dracula"
                        onChange={(newValue) => {
                            localStorage.setItem('query_data', newValue);
                            setValue(newValue);
                        }}
                        onInput={(event?: any) => { }}
                        onLoad={() => {
                        }}
                        // onValidate={(anno) => console.log(anno)}
                        name="data-editor"
                        editorProps={{ $blockScrolling: true }}
                        fontSize={14}
                        showPrintMargin={true}
                        showGutter={true}
                        highlightActiveLine={true}
                        width="100%"
                        ref={editorRef}
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: true,
                            showLineNumbers: true,
                            tabSize: 2,
                        }}
                        value={value ? value : initValue}
                        height={height} />
                    <Box
                        bg="black"
                    >
                        <Flex p="2">
                            {/* Expand Icon */}
                            <IconButton
                                aria-label="Expand"
                                icon={<BiCollapse />}
                                bg="black"
                                color="white"
                                _hover={{ bg: 'black' }}
                                mr="2"
                                onClick={() => {
                                    height == defaultHeight ? setHeight(expandHeight) : setHeight(defaultHeight);
                                }} />
                            {/* Format Query Icon */}
                            <IconButton
                                aria-label="Format Query"
                                icon={<BiCodeAlt />}
                                bg="black"
                                color="white"
                                _hover={{ bg: 'black' }}
                                mr="2"
                                onClick={handleFormatCodeClick} />
                            {/* Full Screen Icon */}
                            <IconButton
                                aria-label="Full Screen"
                                icon={<BiFullscreen />}
                                bg="black"
                                color="white"
                                _hover={{ bg: 'black' }} />


                            <Flex alignItems="center" mr="2">
                                <SimpleGrid
                                    columns={2}
                                    bg="black"
                                    columnGap="0.1rem"
                                    display="inline-flex"
                                >

                                    {/* Run code IconButton */}
                                    <Button
                                        p="0.6rem 0.6rem"
                                        borderRadius="0.8rem"
                                        // pl="2"
                                        // pr="2"
                                        size="sm"
                                        borderTopRightRadius="none"
                                        borderBottomRightRadius="none"
                                        rightIcon={<SearchIcon />}
                                        onClick={() => handleRunClick(props.selectedDataEngine, props.selectedChain, value)}
                                        disabled={isRunning}
                                    >
                                        {isRunning ? (
                                            <>
                                                <CircularProgress size="20px" color="blue.500" isIndeterminate mr="2" />
                                                Running
                                            </>
                                        ) : (
                                            ""
                                        )}
                                    </Button>
                                    <Button
                                        p="0.8rem"
                                        borderRadius="0.8rem"
                                        size="sm"
                                        // ml="0."
                                        borderTopLeftRadius="none"
                                        borderBottomLeftRadius="none"
                                        rightIcon={<TriangleDownIcon />}
                                    >
                                    </Button>

                                </SimpleGrid>
                            </Flex>
                        </Flex>
                    </Box>
                </Box>
            </Flex>
            <Flex
                mt="5"
                direction="column"
            >
                <DataTable
                    tableData={tableData}
                />
            </Flex>
        </Box>
    )
};

export default DataPlayground;