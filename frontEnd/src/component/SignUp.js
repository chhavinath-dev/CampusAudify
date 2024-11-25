import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import signup from "../signup.jpg";
const SignUp = (props) => {
	const [credentials, setCredentials] = useState({
		name: "",
		email: "",
		password: "",
		confirm_password: "",
	});
	const submitCredential = async (event) => {
		document.getElementById("errmsg").style.color = "black";
		document.getElementById("errmsg").textContent = "";
		event.preventDefault();
		if (credentials.name.length === 0) {
			document.getElementById("errmsg").style.color = "red";
			document.getElementById("errmsg").textContent =
				"Name should not be empty";
			document.getElementById("errmsgSm").style.color = "red";
			document.getElementById("errmsgSm").textContent =
				"Name should not be empty";
			setTimeout(() => {
				document.getElementById("errmsg").style.color = "black";
				document.getElementById("errmsg").textContent = "";
				document.getElementById("errmsgSm").style.color = "black";
				document.getElementById("errmsgSm").textContent = "";
			}, 3000);

			return;
		}
		if (credentials.email.length === 0) {
			document.getElementById("errmsg").style.color = "red";
			document.getElementById("errmsg").textContent =
				"E-mail should not be empty";
			document.getElementById("errmsgSm").style.color = "red";
			document.getElementById("errmsgSm").textContent =
				"E-mail should not be empty";
			setTimeout(() => {
				document.getElementById("errmsg").style.color = "black";
				document.getElementById("errmsg").textContent = "";
				document.getElementById("errmsgSm").style.color = "black";
				document.getElementById("errmsgSm").textContent = "";
			}, 3000);
			return;
		}
		if (
			credentials.password !== credentials.confirm_password ||
			credentials.password.length === 0
		) {
			document.getElementById("errmsg").style.color = "red";
			document.getElementById("errmsg").textContent =
				"confirm password must be same as password";
			document.getElementById("errmsgSm").style.color = "red";
			document.getElementById("errmsgSm").textContent =
				"confirm password must be same as password";
			setTimeout(() => {
				document.getElementById("errmsg").style.color = "black";
				document.getElementById("errmsg").textContent = "";
				document.getElementById("errmsgSm").style.color = "black";
				document.getElementById("errmsgSm").textContent = "";
			}, 3000);
			return;
		}
		const { name, email, password } = credentials;
		const response = await fetch(`http://localhost:8000/api/auth/createUser`, {
			method: "POST",

			headers: {
				"Content-Type": "application/json",
			},

			body: JSON.stringify({ name, email, password }), // body data type must match "Content-Type" header
		});
		const json = await response.json();
		setCredentials({ name: "", email: "", password: "", confirm_password: "" });
		if (json.success) {
			localStorage.setItem("token", json.token);
			localStorage.setItem("name", json.name);
			props.setIsLogged(true);
			document.getElementById("toHome").click();
		} else {
			if (json.errors === "User with email already exist") {
				document.getElementById("errmsg").textContent =
					"Email is already exist try to login with email";
				document.getElementById("errmsgSm").textContent =
					"Email is already exist try to login with email";
				setTimeout(() => {
					document.getElementById("errmsg").style.color = "black";
					document.getElementById("errmsg").textContent = "";
					document.getElementById("errmsgSm").style.color = "black";
					document.getElementById("errmsgSm").textContent = "";
				}, 3000);
				return;
			} else if (json.errors === "Internal Server Error") {
				document.getElementById("errmsg").textContent = "Internal Server Error";
				document.getElementById("errmsgSm").textContent =
					"Internal Server Error";
				setTimeout(() => {
					document.getElementById("errmsg").style.color = "black";
					document.getElementById("errmsg").textContent = "";
					document.getElementById("errmsgSm").style.color = "black";
					document.getElementById("errmsgSm").textContent = "";
				}, 3000);
				return;
			} else {
				document.getElementById("errmsg").textContent =
					json.errors[0].msg + " of " + json.errors[0].path;
				document.getElementById("errmsgSm").textContent =
					json.errors[0].msg + " of " + json.errors[0].path;
				setTimeout(() => {
					document.getElementById("errmsg").style.color = "black";
					document.getElementById("errmsg").textContent = "";
					document.getElementById("errmsgSm").style.color = "black";
					document.getElementById("errmsgSm").textContent = "";
				}, 3000);
				return;
			}
		}
	};
	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};
	useEffect(() => {
		if (
			localStorage.getItem("name") !== null &&
			localStorage.getItem("token") !== null
		) {
			document.getElementById("toHome").click();
		}
	}, []);
	return (
		<div className="authCotainer">
			<div className="signupCard shadow-lg d-flex flex-row">
				<div className="pageStyle d-none d-lg-block">
					<Link id="toHome" to="/"></Link>
					<img src={signup} alt="" className="imgSingup" />
				</div>
				<div className="d-none d-lg-block singUpCredential">
					<h2 style={{ marginBottom: "40px", textAlign: "center" }}>
						Create your account
						<hr style={{ width: "100%" }} />
					</h2>

					<form onSubmit={submitCredential}>
						<div className="form-group">
							<div className="d-flex align-items-center">
								<i className="fa-solid fa-user mx-2"></i>
								<input
									type="text"
									className="form-control my-2"
									name="name"
									value={credentials.name}
									id="fname"
									onChange={onChange}
									placeholder="Enter Username"
								/>
							</div>
							<div className="d-flex align-items-center">
								<i className="fa-solid fa-envelope mx-2"></i>
								<input
									type="email"
									className="form-control my-2"
									name="email"
									id="email"
									value={credentials.email}
									aria-describedby="emailHelp"
									onChange={onChange}
									placeholder="Enter email"
								/>
							</div>

							<div className="d-flex align-items-center">
								<i className="fa-solid fa-key mx-2"></i>
								<input
									type="password"
									className="form-control my-2"
									name="password"
									value={credentials.password}
									id="password"
									onChange={onChange}
									placeholder="Password"
								/>
							</div>

							<div className="d-flex align-items-center">
								<i className="fa-solid fa-key mx-2"></i>
								<input
									type="password"
									className="form-control my-2"
									name="confirm_password"
									value={credentials.confirm_password}
									id="cpassword"
									onChange={onChange}
									placeholder="confirm Password"
								/>
							</div>

							<p id="errmsg"></p>
						</div>
						<div className="d-flex align-items-center justify-content-end">
							<button type="submit" className="my-3 btn btn-dark">
								Submit
							</button>
						</div>
						<p>
							already have account?{" "}
							<Link to="/Login" style={{ textDecoration: "none" }}>
								Login <i className="fa-solid fa-arrow-right"></i>
							</Link>
						</p>
					</form>
					<hr />
					<div className="flex justify-content-end w-100">
						<button onClick={() => {
							let str = "";
							for (let i = 0; i < 5; i++) {
								let r1 = Math.floor(Math.random() * (25 - 0 + 1)) + 0;
								let r2 = Math.round(Math.random());
								if (r2) {
									let nextChar = String.fromCharCode('a'.charCodeAt(0) + r1);
									str += nextChar;
								}
								else {
									let nextChar = String.fromCharCode('A'.charCodeAt(0) + r1);
									str += nextChar;
								}
							}
							for (let i = 0; i < 4; i++) {
								let r1 = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
								str += r1;
							}
							localStorage.setItem("guest_name", str);
							props.setIsLogged(true);
							document.getElementById("toHome").click();
						}} className="my-2 btn btn-dark">
							Continue As Guest
						</button>
					</div>
				</div>
				<div className="d-lg-none singUpCredential">
					<h2 style={{ marginBottom: "40px", textAlign: "center" }}>
						Create your account
						<hr style={{ width: "100%" }} />
					</h2>

					<form onSubmit={submitCredential}>
						<div className="form-group">
							<div className="d-flex align-items-center">
								<i className="fa-solid fa-user mx-2"></i>
								<input
									type="text"
									className="form-control my-2"
									name="name"
									value={credentials.name}
									id="small_fname"
									onChange={onChange}
									placeholder="Enter Username"
								/>
							</div>
							<div className="d-flex align-items-center">
								<i className="fa-solid fa-envelope mx-2"></i>
								<input
									type="email"
									className="form-control my-2"
									name="email"
									id="small_email"
									value={credentials.email}
									aria-describedby="emailHelp"
									onChange={onChange}
									placeholder="Enter email"
								/>
							</div>

							<div className="d-flex align-items-center">
								<i className="fa-solid fa-key mx-2"></i>
								<input
									type="password"
									className="form-control my-2"
									name="password"
									value={credentials.password}
									id="small_password"
									onChange={onChange}
									placeholder="Password"
								/>
							</div>

							<div className="d-flex align-items-center">
								<i className="fa-solid fa-key mx-2"></i>
								<input
									type="password"
									className="form-control my-2"
									name="confirm_password"
									value={credentials.confirm_password}
									id="small_cpassword"
									onChange={onChange}
									placeholder="confirm Password"
								/>
							</div>

							<p id="errmsgSm"></p>
						</div>
						<button type="submit" className="my-3 btn btn-dark">
							Submit
						</button>
						<p>
							already have account?{" "}
							<Link to="/Login" style={{ textDecoration: "none" }}>
								Login <i className="fa-solid fa-arrow-right"></i>
							</Link>
						</p>
					</form>
					<hr />
					<div className="flex justify-content-end w-100">
						<button onClick={() => {
							let str = "";
							for (let i = 0; i < 5; i++) {
								let r1 = Math.floor(Math.random() * (25 - 0 + 1)) + 0;
								let r2 = Math.round(Math.random());
								if (r2) {
									let nextChar = String.fromCharCode('a'.charCodeAt(0) + r1);
									str += nextChar;
								}
								else {
									let nextChar = String.fromCharCode('A'.charCodeAt(0) + r1);
									str += nextChar;
								}
							}
							for (let i = 0; i < 4; i++) {
								let r1 = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
								str += r1;
							}
							localStorage.setItem("guest_name", str);
							props.setIsLogged(true);
							document.getElementById("toHome").click();
						}} className="my-2 btn btn-dark">
							Continue As Guest
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
