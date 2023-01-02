# <img src="https://i.imgur.com/5tju3bE.png"/>
## Test Maker is a tool for educators to help with the test making process
This project is inspired by my fiancee, a high school teacher, who spends hours making tests for her students. A main concern was how challenging it was to create multiple test forms to prevent cheating, and that teaching software has become privitized over the years.

### Goals
My goal was to create an easy way to create question banks, add questions, and generate randomized test forms.

### Technology
The backend is powered by postgres and sequelize/express to integrate with the reactjs and node front end. There is authentication for users using JWT authentication.

I used @syncfusion-documenteditor to create the test template, and allow the user to edit the test in browser. 
This powerful library emulates other popular document editors, and will save documents as .Docx
<img src="https://i.imgur.com/0XQQfNrl.png"/><br/>
Questions and answers from the bank are programmatically added to the test template, and an answer key is generated on the last page


### Challenges
A stretch goal was to be able to set attributes to questions, then be able to build a test out more dynamically by difficulty, topic, tags, etc. I was unable to get these functionalities completed in time, but I saved a majority of the code to work on in the future.
