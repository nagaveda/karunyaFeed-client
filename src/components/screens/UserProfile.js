import React, {useEffect, useState, useContext} from 'react';
import {UserContext} from '../../App';
import {useParams} from 'react-router-dom';
const Profile = () => {
    const [userProfile, setProfile] = useState(null);
    const {state, dispatch} = useContext(UserContext);
    const {userId} = useParams();
    useEffect(()=> {
        fetch(`/user/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then((result) => {
            setProfile(result);
        })
    }, []);
    return(
        <>
        {userProfile?
            <div style={{maxWidth:"550px", margin: "0px auto"}}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-around",
                    margin: "18px 0px",
                    borderBottom:  "1px solid grey"
                }}>
                    <div>
                        <img style={{width:"160px", height:"160px", borderRadius:"80px"}}
                        src = "https://images.unsplash.com/photo-1550927407-50e2bd128b81?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                        alt = "profile pic"
                        />
                    </div>
                    <div>
                        <h4>{userProfile.user.name}</h4>
                        <h5>{userProfile.user.email}</h5>
                        <div style={{display:"flex", justifyContent:"space-between", width:"108%"}}>
                            <h6>{userProfile.posts.length} posts</h6>
                            <h6>140 followers</h6>
                            <h6>50 following</h6>
                        </div>
                    </div>
                </div>
                <div className="gallery">
                    {
                        userProfile.posts.map((item) => {
                            return(
                                <img key={item._id} className="item" alt={item.title} src={item.photo}/>
                            );
                        })
                    }
                    

                </div>
            </div>
        :
        <h2 className="brand-logo">Loading....</h2>}
            
        </>
    );
}

export default Profile;