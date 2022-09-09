import React from 'react'
import { useState } from 'react';
import on3 from '../img/navbar/on3.JPG';
import { collection, query, where, getDocs, setDoc, updateDoc, serverTimestamp, getDoc, doc } from "firebase/firestore";
import { db } from '../firebase'
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

const Search = () => {

  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(collection(db, "users"),
      where("displayName", "==", username)
    );
    console.log(q);

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());

      });

    } catch (err) {
      setErr(true);
    }

  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  }

  const handaleSelect = async () => {
    // check whether the group (chats in firestore ) exists, if not create
    const combinedId = 
    currentUser.uid > user.uid
      ? currentUser.uid + user.uid
      : user.uid + currentUser.uid
    try {
      const res = await getDoc(doc(db, "chats", combinedId))
      if (!res.exists()) {
        // create a chat in chat collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] })

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid),{
          [combinedId+".userInfo"]:{
            uid:user.uid,
            displayName:user.displayName,
            photoURL:user.photoURL
          },
          [combinedId+".date"]:serverTimestamp()
        });

        await updateDoc(doc(db, "userChats", user.uid),{
          [combinedId+".userInfo"]:{
            uid:currentUser.uid,
            displayName:currentUser.displayName,
            photoURL:currentUser.photoURL
          },
          [combinedId+".date"]:serverTimestamp()
        });

    }
    } catch (err) {}
      setUser(null);
      setUsername("");
    
    //create user chats
  }


  return (
    <div className='search'>
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a User?"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)} 
          value={username}/>
          
        {/* <button onClick={handleKey}>search</button> */}
      </div>
      {err && <span>User not found!</span>}
      {user && <div className="userChat" onClick={handaleSelect}>
        <img src={user.photoURL} alt="" />
        <div className="userChatInfo">
          <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  )
}

export default Search
