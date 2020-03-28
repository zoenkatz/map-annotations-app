import React from 'react';

const AppContext = React.createContext({
    annotations: [],
    query: 'England',
    center: [-0.120736, 51.5118219]
});

export default AppContext;
