import React from 'react';
import { DataContext } from '../DataContext';
import { useState, useContext, useEffect} from 'react'
import {Card} from 'react-bootstrap'
import styled from 'styled-components';

const StyledWrapper = styled.div `
height: 100vh;
`;

function EditBank(props) {
    const {currentBank} = useContext(DataContext)

    return (
        <div style={{display:"flex", flexDirection:"column"}}>
            <h1>{currentBank.title}</h1>
            <div style={{display:"flex", flexDirection:"column", justifyContent:"space-evenly", border:"2px solid black", height: "75vh"}}>
                <div style={{}}>
                    <form>
                        
                    </form>
                </div>
                {currentBank.q.length > 0 ? (
                <div>
                    {
                        currentBank.q.map((question)=>(
                            <Card key={question.id}>

                            </Card>
                        ))
                    }
                </div>
                ) : (<div>No Questions</div>) }
            </div>
        </div>
    );
}

export default EditBank;