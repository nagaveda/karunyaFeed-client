import React, {useState, useEffect} from 'react';

const Home = () => {
    const [data, setData] = useState([]);
    useEffect(()=>{
        fetch('/allposts', {
            headers: {
                "Authorization" : "Bearer "+localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result => {
            setData(result.posts);
        })
    },[])
    return(
        <div className="home">
        {
            data.map((item, index)=>{
                return(
                    <div key={index} className="card home-card">
                        <h5>{item.postedBy.name}</h5>
                        <div className="card-image">
                            <img alt="post" src = {item.photo}/>
                        </div>
                        <div className="card-content">
                        <i className="material-icons" style={{color:"red"}}>favorite</i>
                            <h6>{item.title}</h6>
                            <p>{item.body}</p>
                            <input type="text" placeholder="add comment"/>
                        </div>
                    </div>
                )
            })
        }
            
        </div>
    );
}

export default Home;