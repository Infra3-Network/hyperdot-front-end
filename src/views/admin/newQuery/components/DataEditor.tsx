import { useEffect, useRef, useState } from "react";
import { render } from "react-dom";
import AceEditor from "react-ace";
import { Box, Flex, IconButton, Select, Text, Button, Grid, SimpleGrid, CircularProgress } from '@chakra-ui/react';
import { BiFullscreen, BiCollapse, BiCodeAlt, BiPlay } from 'react-icons/bi';
import { SearchIcon, TriangleDownIcon } from "@chakra-ui/icons";

// import Box from '@mui/material/Box';

import "ace-builds/src-noconflict/mode-mysql";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";
import beautify from 'ace-builds/src-noconflict/ext-beautify';

const defaultHeight = '200px';
const expandHeight = "250px";

const DataEditor = (props) => {
    const [height, setHeight] = useState(defaultHeight);
    const selectedDataEngine = props.selectedDataEngine;
    const selectedChain = props.selectedChain;
    const [value, setValue] = useState('');
    const editorRef = useRef<any>();


    const [isRunning, setRunning] = useState(false);

    const handleFormatCodeClick = () => {
        beautify.beautify(editorRef.current.editor.session)
    }

    const handleRunClick = ({ engine, table }) => {
        setRunning(true);

        const apiUrl = '/apis/v1/';
        const requestData = {
            chain: engine,
            query: table,
        };

        // fetch(apiUrl, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(requestData),
        // })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         // 处理响应数据
        //         console.log(data);
        //     })
        //     .catch((error) => {
        //         // 处理请求错误
        //         console.error(error);
        //     })
        //     .finally(() => {
        //         // 请求完成后重置 UI 状态
        //         setRunning(false);
        //     });

        // Perform the desired action
        // For example, make an API request or run a function

        // After the action is complete, reset the UI state
        setTimeout(() => {
            setRunning(false);
        }, 2000);
    }

    return (
        <Box>
            <AceEditor
                mode="mysql"
                theme="dracula"
                onChange={(newValue) => setValue(newValue)}
                onInput={(event?: any) => { }}
                onLoad={() => {
                }}
                onValidate={(anno) => console.log(anno)}
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
                value={value ? value : props.editorValue}
                height={height}
            />
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
                        }}
                    />
                    {/* Format Query Icon */}
                    <IconButton
                        aria-label="Format Query"
                        icon={<BiCodeAlt />}
                        bg="black"
                        color="white"
                        _hover={{ bg: 'black' }}
                        mr="2"
                        onClick={handleFormatCodeClick}
                    />
                    {/* Full Screen Icon */}
                    <IconButton
                        aria-label="Full Screen"
                        icon={<BiFullscreen />}
                        bg="black"
                        color="white"
                        _hover={{ bg: 'black' }}
                    />


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
                                onClick={handleRunClick}
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
    )
};

export default DataEditor;