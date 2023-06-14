import { useEffect, useRef, useState } from "react";
import { render } from "react-dom";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-mysql";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";
import beautify from 'ace-builds/src-noconflict/ext-beautify';


const Editor = (props: any) => {
    const defaultHeight = "250px";

    return (
        <AceEditor
            mode="mysql"
            theme="dracula"
            name={props.name}
            editorProps={{ $blockScrolling: true }}
            showGutter={props.showGutter}
            fontSize={props.fontSize}
            showPrintMargin={props.showPrintMargin}
            highlightActiveLine={props.highlightActiveLine}
            setOptions={props.setOptions}
            ref={props.editorRef}
            width={props.width}
            value={props.value}
            height={props.height? props.height : defaultHeight}
            onChange={props.onChange}

        />
    )
};

export default Editor;