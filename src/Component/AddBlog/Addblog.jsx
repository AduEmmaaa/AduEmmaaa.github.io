import { useState } from "react";
import style from "./addBlog.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Addblog = () => {
  const [title, setTitle] = useState("");
  const [textarea, setTextarea] = useState("");
  const [category, setCategory] = useState("Travel");
  const [url, seturl] = useState(null);
  const navigate = useNavigate();

  const handleAdd = (e) => {
    e.preventDefault();
    const initials = {
      title,
      description: textarea,
      category,
      imgUrl: url,
    };
    console.log("url :", url);
    if (!title || !textarea)
      return toast.error("Title and Description required");

    try {
      fetch("http://localhost:1010/Blog", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(initials),
      })
        .then((res) => res.json())
        .then((data) => data);
      toast.success("Blog Created Successfull");

      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Error creating blog");
    }
  };

  const handleimage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "vpj2spgo");

    try {
      fetch("https://api.cloudinary.com/v1_1/dzzmqi5hn/image/upload", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          seturl(data.secure_url);
          console.log(data);

          toast.success("image Upload done");
        });
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during the upload.");
    }
  };
  console.log(url);
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <h1>Add Blog</h1>
        <div className={style.form}>
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            width={100}
            height={50}
            value={textarea}
            onChange={(e) => setTextarea(e.target.value)}
          />
          <input
            type="file"
            name=""
            id=""
            onChange={(e) => handleimage(e.target.files[0])}
          />

          <select
            name=""
            id=""
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Travel">Travel</option>
            <option value="Fashion">Fashion</option>
            <option value="Fitness">Fitness</option>
            <option value="sport">Sport</option>
            <option value="Food">Food</option>
            <option value="Tech">Tech</option>
          </select>

          <div className="button">
            <button onClick={handleAdd}>ADD</button>
            <button>Go BACK</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addblog;
