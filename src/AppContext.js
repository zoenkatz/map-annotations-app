import React from 'react';

const AppContext = React.createContext({
    annotations: [],
    query: ''
});

export default AppContext;