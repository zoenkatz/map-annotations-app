import React from 'react';

const AppContext = React.createContext({
    query: 'England',
    center: [-0.120736, 51.5118219],
    clickedRoute: {},
    features: []
});

export default AppContext;
