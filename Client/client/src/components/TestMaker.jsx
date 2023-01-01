import React from 'react';
import WebViewer from '@pdftron/webviewer'
import {useRef, useEffect, useContext, useState} from 'react';
import { DataContext } from '../DataContext';
import {Button, Modal} from 'react-bootstrap'
import {DocumentEditorContainerComponent, Toolbar, Inject} from '@syncfusion/ej2-react-documenteditor'



DocumentEditorContainerComponent.Inject(Toolbar)
function TestMaker(props) {

    const {currentBank} = useContext(DataContext)
    const [instructions, setInstructions] = useState("<<Add Instructions Here>>")

    let container = DocumentEditorContainerComponent;
    const onSave=()=>{
        container?.documentEditor.save(`${currentBank.title} test`, "Docx")
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

    
    const onCreated = () => {
    
        container.documentEditor.editor.insertText(currentBank.title +"\v")
        
        container.documentEditor.editor.insertText("name: ___________ \v")
        container.documentEditor.editor.insertText("class period: ______\v\v")

        container.documentEditor.editor.insertText(instructions + '\v \v \v')
        let questions = shuffle(currentBank.q)
        let answers=[]
        questions.map((question, index)=>{
            container.documentEditor.editor.insertImage()
            container.documentEditor.editor.insertText(index+1+'. ' + question.question +'\v');
            
            if (question.type === 'MC'){
                for (let i=0; i<question.answers.length; i++){
                    let char = String.fromCharCode(97 + i)
                    container.documentEditor.editor.insertText('\v' + char + '. ' +question.answers[i] + '\v')
                    if (question.correct === question.answers[i])
                    {
                        answers.push(char)
                    }
                }
            }
            else if (question.type === 'TF'){
                container.documentEditor.editor.insertText(' \v a.true \v')
                container.documentEditor.editor.insertText('\v b.false \v')
                question.correct === 'true' ? answers.push('a') : answers.push('b')
            }
            else if(question.type === 'FR'){
                container.documentEditor.editor.insertText(' \v\v\v\v\v')
                answers.push('Free Response')
            }
            container.documentEditor.editor.insertText('\v\v\v')
        })
        container.documentEditor.editor.insertSectionBreak();
        container.documentEditor.editor.insertText('Answer Key \v')
        for (let i=0;i<answers.length;i++){
            container.documentEditor.editor.insertText(`\v ${i+1}. ${answers[i]} \v`)
        }
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