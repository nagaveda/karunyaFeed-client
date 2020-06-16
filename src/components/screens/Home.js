import React from 'react';

const Home = () => {
    return(
        <div className="home">
            <div className="card home-card">
                <h5>Shiva</h5>
                <div className="card-image">
                    <img alt="post" src="https://images.unsplash.com/photo-1501696461415-6bd6660c6742?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
                </div>
                <div className="card-content">
                <i className="material-icons" style={{color:"red"}}>favorite</i>
                    <h6>title</h6>
                    <p>This is an amazing post!</p>
                    <input type="text" placeholder="add comment"/>
                </div>
            </div>
            <div className="card home-card">
                <h5>Shiva</h5>
                <div className="card-image">
                    <img alt="post" src="https://images.unsplash.com/photo-1502759683299-cdcd6974244f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
                </div>
                <div className="card-content">
                <i className="material-icons" style={{color:"red"}}>favorite</i>
                    <h6>title</h6>
                    <p>This is an amazing post!</p>
                    <input type="text" placeholder="add comment"/>
                </div>
            </div>
            <div className="card home-card">
                <h5>Shiva</h5>
                <div className="card-image">
                    <img alt="post" src="https://images.unsplash.com/photo-1461301214746-1e109215d6d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
                </div>
                <div className="card-content">
                    <i className="material-icons" style={{color:"red"}}>favorite</i>
                    <h6>title</h6>
                    <p>This is an amazing post!</p>
                    <input type="text" placeholder="add comment"/>
                </div>
            </div>
        </div>
    );
}

export default Home;