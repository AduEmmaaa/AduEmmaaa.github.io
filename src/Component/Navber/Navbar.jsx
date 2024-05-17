import { Link } from "react-router-dom";
import style from "./navbar.module.css";


const Navbar = () => {
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <h1 className={style.logo}>Veodev</h1>

        <div className={style.links}>
          <Link to="/">Home</Link>
          <Link to="addblog">Add Blog</Link>
          <Link to="about">About</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
