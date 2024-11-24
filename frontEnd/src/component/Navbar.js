import { Link } from "react-router-dom";
const Navbar = (props) => {
  const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
	 localStorage.removeItem("guest_name");
    const temp = await props.setIsLogged(false);
    document.getElementById("toLogin").click();
  };
 
  return (
   <>
   <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <Link style={{paddingLeft:"10px"}} className="navbar-brand d-none d-lg-block" to="/">Audify</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
      </li>
    </ul>
 
  </div>
  {(props.isLogged===true) &&  
        <div className="d-flex justify-content-end me-4">
          <h5 className="mx-2" style={{color:"white", marginTop:"6px"}}>{localStorage.getItem("name")? localStorage.getItem("name"): localStorage.getItem("guest_name")}</h5>{" "}
          <button onClick={logout} className="btn btn-primary">
            Log out
          </button>{" "}
        </div> }
</nav>
    
      

      <Link id="toLogin" to="/Login">
      </Link> 
      </>
  );
  
};

export default Navbar;
