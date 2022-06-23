import axios from "axios";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Connection from "./pages/Connection"
import Post from "./pages/Post"
import AddPost from "./pages/AddPost";
import Profil from "./pages/Profil"
import ModifyPost from "./pages/ModifyPost";


function App() {
  // const data = { pseudo: 'Alex1', password: 'test' };
  // console.log(data);
  // axios.post("http://localhost:3000/auth/login", data)
  //   .then((result) => {
  //     console.log(result.data.userId);
  //     localStorage.token = result.data.token;
  //     axios.defaults.headers.common['Authorization'] = "Bearer " + result.data.token;
  //   })
  // return (
  //   <div>{localStorage.token}</div>
  // );
  axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.token;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Connection />} />
        <Route path="/post" element={<Post />} />
        <Route path="/post/add" element={<AddPost />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/post/edit/:id" element={<ModifyPost />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;
