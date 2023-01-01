import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import {registerLicense} from '@syncfusion/ej2-base'
registerLicense("Mgo+DSMBaFt/QHRqVVhjVFpFaVxCQmFJfFBmQGlad1R1fEUmHVdTRHRdQ19gSH9UdU1mUH9bc30=;Mgo+DSMBPh8sVXJ0S0J+XE9HflRDQmBJYVF2R2BJelRzfF9DaEwxOX1dQl9hSHxQd0RkWndbeXRTTmk=;ORg4AjUWIQA/Gnt2VVhkQlFadVdJXHxKfkx0RWFab1t6d11MZVRBJAtUQF1hS39RdURiXnxWdX1VTmJV;ODUwMjk0QDMyMzAyZTM0MmUzMER3eEpLLzJ2eGtmQmZvOUxJNllhZ1h4OFlEN3BxNytGTHhZa3hWWUUwTkE9;ODUwMjk1QDMyMzAyZTM0MmUzMFRTNkdrVzVKTUVQMUl3UnprcnFId0Z2QWJZNVJEUUUyRWZnbE1vaDhvMEk9;NRAiBiAaIQQuGjN/V0Z+WE9EaFxKVmJWfVNpR2NbfE51flZOallZVBYiSV9jS3xSdEZiWHhdeHFcR2NVWA==;ODUwMjk3QDMyMzAyZTM0MmUzME5UZVVyL3JtWDRETzlYd3Jhb1I0MG5PWGxpb1M4d2lMckZlTWFGdVdpVUU9;ODUwMjk4QDMyMzAyZTM0MmUzMEJpbDMwRGlKeUZHNVhORnBOMVRWVUVhMW9IdlBrUGJERDROa3BHWnQ3Yjg9;Mgo+DSMBMAY9C3t2VVhkQlFadVdJXHxKfkx0RWFab1t6d11MZVRBJAtUQF1hS39RdURiXnxWdX1XRGFV;ODUwMzAwQDMyMzAyZTM0MmUzMFZqWkpPSkpaaWNCQThxbllNbFptMzV1Tm9rdUMraDJWSSt3WVZWclRrSUk9;ODUwMzAxQDMyMzAyZTM0MmUzMFJUNERJNGpCVjhBTEZTNUhnZ1VueDdwNTc0dFUvNTEzMUlPeGt4dmdtaTQ9;ODUwMzAyQDMyMzAyZTM0MmUzME5UZVVyL3JtWDRETzlYd3Jhb1I0MG5PWGxpb1M4d2lMckZlTWFGdVdpVUU9")

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
