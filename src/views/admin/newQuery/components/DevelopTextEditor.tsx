// import "ace-builds/src-noconflict/mode-jsx";
// import "ace-builds/src-noconflict/mode-mysql";
// import "ace-builds/src-noconflict/theme-monokai";
// import "ace-builds/src-noconflict/ext-language_tools";

import CheckTable from 'views/admin/dataTables/components/CheckTable'
import {
    columnsDataDevelopment,
    columnsDataCheck,
    columnsDataColumns,
    columnsDataComplex
} from 'views/admin/dataTables/variables/columnsData'
import tableDataCheck from 'views/admin/dataTables/variables/tableDataCheck.json'
import { Box, Flex, Input, IconButton, Select, Textarea, SimpleGrid } from '@chakra-ui/react';
import { BiSearch, BiFullscreen, BiCollapse, BiCodeAlt } from 'react-icons/bi';
import { AiOutlineTable } from 'react-icons/ai';
import React from "react";
import { useEffect, useState } from 'react';
import AceEditor from "react-ace";

// require("ace-builds/src-noconflict/theme-monokai");

export default function DevelopTextEditor() {

    const [DynamicAceEditor, setDynamicAceEditor] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('react-ace').then((module) => {
                setDynamicAceEditor(() => module.default);
            });

        }
    }, []);

    if (!DynamicAceEditor) {
        return null;
    }

    require('ace-builds/src-noconflict/mode-mysql');
    require('ace-builds/src-noconflict/theme-monokai');
    require('ace-builds/src-noconflict/ext-language_tools');

    return (
        <SimpleGrid
            columns={{ sm: 0, md: 1 }}
        >
            <Box
                borderWidth="1px" borderRadius="lg" overflow="hidden"
            >
                <Box
                >
                    <DynamicAceEditor
                        placeholder="Placeholder Text"
                        mode="mysql"
                        theme="monokai"
                        name="blah2"
                        //   onLoad={this.onLoad}
                        //   onChange={this.onChange}
                        fontSize={14}
                        showPrintMargin={true}
                        showGutter={true}
                        highlightActiveLine={true}
                        //   value={`select * from hyperdot;`}
                        width="100%"
                        height="300px"
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: false,
                            showLineNumbers: true,
                            tabSize: 2,
                        }}
                    />
                </Box>

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
                        />
                        {/* Format Query Icon */}
                        <IconButton
                            aria-label="Format Query"
                            icon={<BiCodeAlt />}
                            bg="black"
                            color="white"
                            _hover={{ bg: 'black' }}
                            mr="2"
                        />
                        {/* Full Screen Icon */}
                        <IconButton
                            aria-label="Full Screen"
                            icon={<BiFullscreen />}
                            bg="black"
                            color="white"
                            _hover={{ bg: 'black' }}
                        />
                    </Flex>
                </Box>
            </Box>

            <Box mt="5">
                <CheckTable
                    columnsData={columnsDataCheck}
                    tableData={(tableDataCheck as unknown) as TableData[]}
                />
            </Box>

        </SimpleGrid>
    );
}


