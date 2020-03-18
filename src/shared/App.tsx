import React, { ReactElement } from 'react'
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import MainPage from 'pages/MainPage';

interface Props {
    
}

export default function App({}: Props): ReactElement {
    return (
        <BrowserRouter>
            <Route path="/" component={MainPage}/>
        </BrowserRouter>
        )
}