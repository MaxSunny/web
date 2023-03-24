import React from 'react';

function App() {
    return React.createElement("div", 
        { className: "main" },
        React.createElement("h2", null, "hello"), 
        React.createElement( "div", { id: "list" }, 
            React.createElement("ul", null, 
                React.createElement("li", null, "list 1"), 
                React.createElement("li", null, "list 2"), 
                React.createElement("li", null, "list 3"), 
                React.createElement("li", null, "list 4"), 
                React.createElement("li", null, "list 5"), 
                React.createElement("li", null, "list 6")
            )
        )
    );
  }

const VDom = {
    type: 'div',
    props: {
        className: 'main',
        children: [
            {
                type:'h2',

            }
        ]
    }
}

function Ap() {
    return <div></div>
}

class A {
    render() {
        return <div></div>
    }
}