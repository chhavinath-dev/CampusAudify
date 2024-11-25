import React, { useContext, useState, useEffect, useRef } from "react";
import audioContext from "../context/audio/audioContext";
import loading from "../loading_audio.gif"
const AudioItem = (props) => {
	const [url, setUrl] = useState("");
	const modalRef = useRef(null);
	const [isloading, setIsloading] = useState(false);
	const context = useContext(audioContext);
	const { deleteAudio, updateAudio } = context;
	const [audio, setAudio] = useState({ description: "" })
	const { ele } = props;
	const onChange = (e) => {
		setAudio({ ...audio, [e.target.name]: e.target.value })

	}
	const createAudio = async (Aurl) => {
		try {
			setIsloading(true);
			const response = await fetch(Aurl);
			if (response.status === 200) {
				const blob = await response.blob();
				setIsloading(false);
				// const audio = new Audio();
				// audio.controls = true;
				// document.getElementById("cardBody").appendChild(audio);

				setUrl(window.URL.createObjectURL(blob));
			} else {
				setIsloading(false);
				setUrl("");
			}
		} catch (err) {
			setIsloading(false);
			console.log(err);
		}
	};
	useEffect(() => {
		createAudio(ele.url);
		setAudio({ description: ele.description });
	}, [ele]);
	return (

		<div className="card my-3" style={{ borderRadius: "10px" }}>
			<div className="card-body d-flex flex-row align-items-center justify-content-between" id="cardBody">
				{!isloading && url && (
					<audio controls>
						<source src={url} type="audio/mpeg" />
					</audio>
				)}
				{isloading && (
					<img src={loading} style={{ width: "10vw" }} alt="" />
				)}
				<div className="mx-5 d-none d-sm-block"><span style={{ fontWeight: "bold" }}>created on</span>: {ele.createdOn}</div>
				<div className="mx-4 align-items-center d-none d-md-block">{ele.description}</div>
				<div className="d-flex flex-row">
					<div style={{ alignItems: "center" }} className="mx-3">
						<i

							className="fa-sharp fa-solid fa-trash d-none d-md-block"
							onClick={() => {
								if (!localStorage.getItem('token')) {
									deleteAudio(ele.url);
									return;
								}
								deleteAudio(ele._id);
							}}
						></i>
					</div>
					<div className="mx-3">
						<a
							href={ele.url}
							style={{ color: "black" }}
							target="_blank"
							rel="noreferrer"
						>
							<i className="fa-solid fa-download mx-2  d-none d-md-block"></i>
						</a>
					</div>
					{localStorage.getItem('token') ?
						<div className="mx-3">
							<i className="fa-solid fa-pen-to-square mx-2  d-none d-md-block" data-bs-toggle="modal" data-bs-target={`#UpdateModal${ele._id}`}>
							</i>
						</div>
						:
						<div className="mx-3 position-relative">
							<i className="fa-solid fa-pen-to-square mx-2  d-none d-md-block text-danger" onMouseEnter={
								() => {
									if (modalRef.current) {
										modalRef.current.style.display = "block";
									}
								}
							} onMouseLeave={
								() => {
									if (modalRef.current) {
										modalRef.current.style.display = "none";
									}
								}
							}>
							</i>
							<div ref={modalRef} className="position-absolute start-50 translate-middle-x mt-2 bg-white p-2 border rounded shadow"
							style={{display: 'none', fontSize:'0.7rem'}}
							>
								This feature is available exclusively to registered users.
							</div>
						</div>}
				</div>

				<div className="modal fade" id={`UpdateModal${ele._id}`} tabIndex="-1" aria-labelledby="UpdateModalLabel" aria-hidden="true">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h1 className="modal-title fs-5" id="UpdateModalLabel">Update your audio</h1>
								<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div className="modal-body">
								<label htmlFor="description">Description</label>
								<input onChange={onChange} value={audio.description} type="text" className="form-control my-3" id="description" name='description' />

							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
								<button type="button" className="btn btn-dark" data-bs-dismiss="modal" onClick={() => { updateAudio(ele._id, audio.description) }}>Save changes</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AudioItem;
