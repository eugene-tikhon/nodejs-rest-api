import React, { createContext, useEffect, useState , useContext} from "react";
import styled from "styled-components";
import { io } from "socket.io-client";

export const socket = io("http://localhost:8080");

export const AppContext = createContext()

export function ContextProvider({children}){
  const [stateContext, setStateContext] = useState({posts: []});

  useEffect(() => {
    const fetchData = async () => {

      const response = await fetch("http://localhost:8080/feed/posts");
      const newData = await response.json();

      setStateContext(newData);
      console.log(newData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    socket.on("post", (serverData) => {
      setStateContext({...stateContext, posts: [...stateContext.posts, serverData]})
    });
    return () => {
      socket.off("posts");
    };
  });

  return (
    <AppContext.Provider value={{stateContext, setStateContext}}>{children}</AppContext.Provider>
  )
}

const PostArticle = styled.article`
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  margin: 1rem;
`;

export function FetchDataViewer() {
  const {stateContext} = useContext(AppContext)

  if (!stateContext) return null;
  return (
    <>
      <section>
        {stateContext && stateContext.posts.map((post, index) => {
          return (
            <PostArticle key={index}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p>
                Author: <b>{post.author.name}</b> | Created:{" "}
                <b>{post.createdAt}</b>
              </p>
            </PostArticle>
          );
        })}
      </section>
    </>
  );
}

function Btn() {
  const fetchData = async () => {
    const response = await fetch("http://localhost:8080/feed/post", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "My Title",
        content: "Content text goes there...",
      }),
    });
    const newData = await response.json();

    console.log("Fetch Data:", newData);
  };

  return (
    <>
        <button onClick={fetchData}>Create new post</button>
    </>
  );
}

function App() {
  return (
    <ContextProvider value>
      <FetchDataViewer />
      <Btn />
    
    </ContextProvider>
  );
}

export default App;
