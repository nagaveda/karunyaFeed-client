import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../../App';
import M from 'materialize-css';
import {Link} from 'react-router-dom';
const Home = () => {
    const [data, setData] = useState([]);
    const {state, dispatch} = useContext(UserContext);
    useEffect(()=>{
        fetch('/getsubposts', {
            headers: {
                "Authorization" : "Bearer "+localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result => {
            setData(result.posts);
        })
    },[]);
    
    const likePost = (id) => {
        fetch("/like", {
            method:"PUT", 
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId: id
            })
        }).then(res=>res.json())
        .then(result => {
            // console.log(result);
            const newData = data.map((item)=> {
                if(item._id === result._id){
                    return result;
                }else{
                    return item;
                }
            });
            setData(newData);
        }).catch((err)=>{
            console.log(err);
        });
    };
    const unlikePost = (id) => {
        fetch("/unlike", {
            method:"PUT", 
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId: id
            })
        }).then(res=>res.json())
        .then(result => {
            const newData = data.map((item)=> {
                if(item._id === result._id){
                    return result;
                }else{
                    return item;
                }
            });
            setData(newData);
        }).catch((err)=>{
            console.log(err);
        });
    };
    const makeComment = (text, postId) => {
        fetch('/comment', {
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId:postId,
                text:text
            })
        })
        .then(res=>res.json())
        .then((result)=> {
            const newData = data.map((item)=> {
                if(item._id === result._id){
                    return result;
                }else{
                    return item;
                }
            });
            setData(newData);
        }).catch((err)=>{
            console.log(err);
        });
    };
    const deletePost = (postId) => {
        fetch(`/deletepost/${postId}`, {
            method:"DELETE",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then((result)=>{
            if(result.error){
                M.toast({html: result.error, classes:"#c62828 red darken-3"});
            }
            else{
                M.toast({html: "Post deletion succesful!", classes:"#ff9800 orange"});
            }
            const newData = data.filter(item=>{
                return item._id !== result._id
            });
            setData(newData);
        })
    };
    const deleteComment = (postId, commentId) => {
        fetch(`/deletecomment/${postId}/comments/${commentId}`, {
            method:"DELETE",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then((result)=>{
            const newData = data.map((item)=> {
                if(item._id === result._id){
                    return result;
                }else{
                    return item;
                }
            });
            setData(newData);
            M.toast({html:"Comment deleted succesfully!", classes: "#757575 grey darken-1"});

        }).catch(err=>{
            console.log(err);
        })
    }
    return(
        
        <div className="home">
        {
            (data.length!==0)?
            data.map((item)=>{
                return(
                    <div key={item._id} className="card home-card">
                        <h5 style={{padding:"5px"}}><Link to={"/profile/"+item.postedBy._id}>{item.postedBy.name}</Link>{item.postedBy._id === state._id && 
                            <i style={{float:"right"}} className="material-icons" onClick={()=>deletePost(item._id)}>delete</i>
                             }</h5>
                        <div className="card-image">
                            <img alt="post" src = {item.photo}/>
                        </div>
                        <div className="card-content">
                        <i className="material-icons" style={{color:"red"}}>favorite</i>
                        {item.likes.includes(state._id)
                        ? <i className="material-icons" 
                        onClick = {() => {unlikePost(item._id)}}
                        >thumb_down</i>
                        : 
                        <i className="material-icons" 
                        onClick = {() => {likePost(item._id)}}
                        >thumb_up</i>
                        }
                            <h6>{item.likes.length} likes</h6>
                            <h6>{item.title}</h6>
                            <p>{item.body}</p>
                            <form onSubmit={(event)=>{
                                 event.preventDefault();
                                 makeComment(event.target[0].value,item._id);
                            }}>
                                <input type="text" placeholder="add comment"/>
                            </form>
                            {
                                item.comments.map((record)=> {
                                    return(
                                    <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.name}</span> {record.text} {record.postedBy._id === state._id && <i style={{float:"right"}} className="material-icons" 
                        onClick = {() => {deleteComment(item._id,record._id )}}
                        >delete</i>}</h6>
                                    )
                                })
                            }
                            
                        </div>
                    </div>
                )
            })
            :
            <div>
            <span className='fa fa-spinner fa-pulse fa-3x fa-fw text-primary'></span> 
                <h1><p className="brand-logo" style={{textAlign:"center"}}>Loading...</p></h1>
                
            </div>
            
        }
            
        </div>
    );
}

export default Home;