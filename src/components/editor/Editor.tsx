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


const Editor = (props: any) => {
    const defaultHeight = "250px";
    const expandHeight = "400px";
    const [height, setHeight] = useState(props.height ? props.height : defaultHeight);
    const editorRef = useRef<any>();



    const handleExpandClick = () => {
        height == defaultHeight ? setHeight(expandHeight) : setHeight(defaultHeight);
    }


    const [isRunning, setRunning] = useState(false);

    const handleRunClick = () => {
        setRunning(true);

        // Perform the desired action
        // For example, make an API request or run a function

        // After the action is complete, reset the UI state
        setTimeout(() => {
            setRunning(false);
        }, 2000);
    };

    const handleFormatCodeClick = () => {
        beautify.beautify(editorRef.current.editor.session)
    }

    return (
        <Box>
            <AceEditor
                mode="mysql"
                theme="dracula"
                // onChange={onChange}
                name="example"
                editorProps={{ $blockScrolling: true }}
                showGutter={props.showGutter}
                fontSize={props.fontSize}
                showPrintMargin={props.showPrintMargin}
                highlightActiveLine={props.highlightActiveLine}
                setOptions={props.setOptions}
                ref={editorRef}
                width={props.width}
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
                        onClick={handleExpandClick}
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
                                // borderRadius="base"
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
                                // borderRadius="base"
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

export default Editor;