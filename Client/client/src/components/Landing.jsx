import styled from "styled-components"

const StyledWrapper = styled.div `
text-align: center;
height:100vh;

h1{
    font-family: 'Lobster', cursive;
    font-size: 76px;
}
h2{
    font-size:48px;
}
.material-symbols-outlined{
    font-size:100px;
    transform: rotate(180deg);
    position: relative;
    left: 20px;
    top: 20px;

}
#step2{
    transform:rotate(0deg);
    margin-right: 50px;

}
#arrow-three{
    transform: rotate(360deg);
}
`;

const Landing = (props) => {



    return (
        <StyledWrapper>
        <div>
            <h1>Step 1<span className="material-symbols-outlined">switch_access_shortcut_add</span></h1>
            <h2>Sign up</h2><br/><br/>
            <h1><span class="material-symbols-outlined" id="step2">swipe_down</span>Step 2</h1>
            <h2>Create a question bank</h2><br/><br/>
            <h1>Step 3<span class="material-symbols-outlined" id="arrow-three">draw</span></h1>
            <h2>Design your test!</h2>
        </div>
        </StyledWrapper>
    )
}

export default Landing