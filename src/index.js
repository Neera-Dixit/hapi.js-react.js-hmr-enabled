import React from 'react';
import ReactDom from 'react-dom';

const logStuffOnLoad = () => {
ReactDom.render(<div>React Hapi Application demo</div>,document.getElementById('app'));
};

logStuffOnLoad();

// React HMR enabled
module.hot.accept(() => {
    logStuffOnLoad();
});