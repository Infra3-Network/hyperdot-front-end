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
// import AceEditor from "react-ace";
// import beautify from 'ace-builds/src-noconflict/ext-beautify';
import dynamic from 'next/dynamic'

import Editor from 'components/editor/Editor';


// require("ace-builds/src-noconflict/theme-monokai");

export default function DevelopTextEditor() {

    const Ace = dynamic(
        () => import("components/editor/Editor"),
        { ssr: false }
    )

    // const beautify = dynamic(
    //     () => import('ace-builds/src-noconflict/ext-beautify'),
    //     { ssr: false }
    // )

    // const {mysql, monokai, _} = dynamic(
    //     () => [
    //        ,
    //         import('ace-builds/src-noconflict/theme-monokai'),
    //         import('ace-builds/src-noconflict/ext-language_tools'),
    //     ],
    //     { ssr: false }
    // )




    // const [AceEditor, setAceEditor] = useState(null);

    // useEffect(() => {
    //     if (typeof window !== 'undefined') {
    //         import('react-ace').then((module) => {
    //             setAceEditor(() => module.default);
    //         });

    //     }
    // }, []);

    // if (!AceEditor) {
    //     return null;
    // }


    // var beautify = require('ace-builds/src-noconflict/ext-beautify');
    const handleFormatCodeClick = () => {
        // const editor = AceEditor.
        // console.log(AceEditor);
        // if (editor) {
        //     alert("exists editor!")
        // }else {

        //     alert("don't exists editor!")
        // }

        // beautify
    }


    return (
        <SimpleGrid
            columns={{ sm: 0, md: 1 }}
        >
            <Box
                borderWidth="1px" borderRadius="lg" overflow="hidden"
            >

                <Ace
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
                    // height="300px"
                    // commands={beautify.commands}

                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: false,
                        showLineNumbers: true,
                        tabSize: 2,
                    }}
                />

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


