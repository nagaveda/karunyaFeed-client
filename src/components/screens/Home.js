import React, { Component, useState, useContext, useEffect } from "react";
import {Link} from 'react-router-dom';
import {Waypoint} from 'react-waypoint';
import M from 'materialize-css';
import {UserContext} from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'


    
const Home = () => {
    const {state, dispatch} = useContext(UserContext);
    const [page, setPage] = useState(1); 
    const [data, setData]= useState([]);
    const [hasNextPage, setHasNextPage] = useState(true);
    const items = 2;
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        getData();
    },[]);
    const likePost = (id) => {
        fetch("http://localhost:3000/like", {
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
        fetch("http://localhost:3000/unlike", {
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
        fetch('http://localhost:3000/comment', {
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
        fetch(`http://localhost:3000/deletepost/${postId}`, {
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
        fetch(`http://localhost:3000/deletecomment/${postId}/comments/${commentId}`, {
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
  
    const getData = () => {
       if(!hasNextPage) return;  
       
        fetch(`http://localhost:3000/allposts?page=${page}&limit=${items}`, {
            headers: {
                "Authorization" : "Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            if(result.results){
                // console.log("tt",result.totalCount); 
                // console.log("tt2", (data.length+result.results.length));
                if(result.next == null){
            
                    setHasNextPage(false);
                }
                const newData = data.concat(result.results);
                setData(newData);
                setPage(page=>page+1); 
            }
            
        });
    
    };

    const loadMoreData = () => {
        getData();
    };
    
return(
    <>
        {
            (data.length!==0)?
            <div>
            {
                data.map((item)=>{
                return(
                    <div key={item._id} className="card home-card">
                        <h5 style={{padding:"5px"}}><Link to={"/profile/"+item.postedBy._id}><img style={{width:"30px",height:"30px", borderRadius:"20px"}} src={item.postedBy.pic}></img> {item.postedBy.name}</Link>{item.postedBy._id === state._id && 
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
                                    <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.name}</span> {record.text} {record.postedBy._id === state._id && <i style={{float:"right", marginLeft:"auto"}} className="material-icons" 
                        onClick = {() => {deleteComment(item._id,record._id )}}
                        >delete</i>}</h6>
                                    )
                                })
                            }
                            
                        </div>
                    </div>
                )
            })}
            {
                hasNextPage && <Waypoint onEnter={loadMoreData}>
                    <h1 className="loading" style={{textAlign:"center"}}>Loading Posts..<FontAwesomeIcon icon={faSpinner} spin={true}/>
                    </h1>
                </Waypoint>
            }
            </div>
            
            :
            <div>
            <span className='fa fa-spinner fa-pulse fa-3x fa-fw text-primary'></span> 
                <h1><p className="brand-logo" style={{textAlign:"center"}}>Loading...</p></h1>
            </div>
        }
        
    </>
);


}
    
export default Home;
