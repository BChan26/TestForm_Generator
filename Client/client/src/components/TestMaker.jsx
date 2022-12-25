import React from 'react';
import WebViewer from '@pdftron/webviewer'
import {useRef, useEffect} from 'react';

function TestMaker(props) {


    const viewer = useRef(null);

    const jsonData = {
        "TESTNAME":"Test 1",
        "INSTRUCTIONS": "Here are some instructions",
        "QUESTIONS":{"insert_rows":[["question1"], ["question2"]]}
    }

    useEffect(() => {
        WebViewer({
            path: 'lib',
            initialDoc: 'DefaultTest.docx',
        },
        viewer.current).then((instance) => {
            const { documentViewer } = instance.Core;
            
            documentViewer.addEventListener('documentLoaded', async () =>{
                await documentViewer.getDocument().getDocumentCompletePromise();
                documentViewer.updateView();

                // const doc = documentViewer.getDocument();
                // const keys = doc.getTemplateKeys();



                await documentViewer.getDocument().applyTemplateValues(jsonData)
            })

        });
    }, []);

    return (
    <div className="MyComponent">
        <div className="header">React sample</div>
        <div className="webviewer" ref={viewer} style={{height: "100vh"}}></div>
    </div>
    );
}

export default TestMaker;