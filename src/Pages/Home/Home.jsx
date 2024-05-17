import { useEffect, useState } from "react";
import style from "./home.module.css";
import { toast } from "react-toastify";
import { MdDeselect } from "react-icons/md";
const Home = () => {
  const [post, setPost] = useState([]);
  const [ws, setWs] = useState(null);

  const loadblog = () => {
    fetch("http://localhost:1010/post")
      .then((res) => res.json())
      .then((data) => setPost(data));
  };

  useEffect(() => {
    loadblog();
    const intervalId = setInterval(loadblog, 5000);
    // Cleanup function to clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };

    // const ws = new WebSocket("ws://localhost:1010/ws");
    // ws.onmessage = (event) => {
    //   const newPost = JSON.parse(event.data);
    //   setPost((prevPosts) => [...prevPosts, newPost]);
    // };
    // setWs(ws);

    // return () => {
    //   ws.close();
    // };
  }, []);
  console.log(post);
  const handleDelet = async (id) => {
    if (window.confirm("are you sure you want to delet this blog ?")) {
      const res = await fetch(`http://localhost:1010/post/${id}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        toast.success(`Blog id ${id} has been delected`);
        loadblog();
      } else {
        toast.error("something went wrong");
      }
    }
  };
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <h1>Blogs for Today</h1>
        <div>
          {post.map((val, i) => {
            return (
              <div key={i}>
                <h2>{val.title}</h2>
                <h4>{val.description}</h4>
                <img src={val.imgUrl} alt="photo" />
                <div>...</div>
                <div onClick={() => handleDelet(val.id)}>
                  <MdDeselect />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
