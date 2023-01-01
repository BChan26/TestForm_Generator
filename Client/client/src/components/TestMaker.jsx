import React from 'react';
import WebViewer from '@pdftron/webviewer'
import {useRef, useEffect, useContext, useState} from 'react';
import { DataContext } from '../DataContext';
import {Button, Modal} from 'react-bootstrap'
import {DocumentEditorContainerComponent, Toolbar, Inject} from '@syncfusion/ej2-react-documenteditor'



DocumentEditorContainerComponent.Inject(Toolbar)
function TestMaker(props) {

    const {currentBank} = useContext(DataContext)
    const viewer = useRef(null);
    const instance = useRef();
    const [instructions, setInstructions] = useState("<<Add Instructions Here>>")
    const [refresh, setRefresh]=useState(0)

    const jsonData = {
        "TESTNAME":currentBank.title + " test",
        "INSTRUCTIONS": instructions,
        "QUESTIONS":{"insert_rows":[["question1"], ["question2"]]}
    }



    const handleChange = (e) =>{
        setInstructions(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        setRefresh(refresh+1)
    }

    let editorObj = DocumentEditorContainerComponent | null;
    const onSave=()=>{
        editorObj?.documentEditor.save("Sample", "Docx")
    }

    const shuffle = (array) => {
            let currentIndex = array.length, randomIndex;
            while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
            }
            return(array);
        }

        let container = DocumentEditorContainerComponent;
        const onCreated = () => {
        
            container.documentEditor.editor.insertText(currentBank.title +"\v")
            container.documentEditor.editor.insertText("name: ___________ \v")
            container.documentEditor.editor.insertText("class period: ______\v\v")

            container.documentEditor.editor.insertText(instructions + '\v \v \v')

            let questions = shuffle(currentBank.q)
            questions.map((question, index)=>(
                container.documentEditor.editor.insertText(index+1+'.' + question.question+'\v \v \v')
            ))
            
        }
        

    

    return (
    <div className="MyComponent">
        <div className="header"><h1>Test created from {currentBank.title}</h1>
            <Button onClick={onSave} style={{marginLeft:10}}>Save as Docx</Button>
        </div>
        <div className="webviewer" style={{backgroundColor:"white"}}>
            
        <DocumentEditorContainerComponent id="container"
        ref={(scope) => {
            container = scope;
        }}
        height="800" 
        enableToolbar={true} 
        serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
        created={onCreated}>
        </DocumentEditorContainerComponent>

        </div>
    </div>
    );
}

export default TestMaker;