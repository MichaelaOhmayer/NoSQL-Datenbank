import React, { useState } from "react";
import { Toast } from 'react-bootstrap';

export default function CreateBlog() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [created, setCreated] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [successToast, setSuccessToast] = useState(false);

    const handleSubmit = async () => {
        if (!title || !content || !author || !created) {
            setShowToast(true);
            return;
        }
        try {
            const response = await fetch("http://localhost:8081/api/blogs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    content: content,
                    author: author,
                    created: created,
                }),
            });
            if (response.ok) {
                setSuccessToast(true);
                setTitle("");
                setContent("");
                setAuthor("");
                setCreated("");
            } else {
                console.error("Failed to create event:", response.statusText);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div>
            <button type="button" className="btn btn-primary Create" data-bs-toggle="modal" data-bs-target="#exampleModal23">
                + Blog
            </button>

            <div className="modal fade" id="exampleModal23" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Event erstellen</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="container justify-content-center">
                                <div className="row">
                                    <div className="col"></div>
                                    <div className="col-sm-12 col-md-8">
                                        <form className='form'>
                                            <div className="form-group row mb-2">
                                                <label htmlFor="nameInput" className="col-sm-3 col-form-label" id='label'>Titel</label>
                                                <div className="col-sm-9">
                                                    <input type="text" className="form-control" id="nameInput" placeholder="Name" value={title} onChange={(e) => setTitle(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="form-group row mb-2">
                                                <label htmlFor="descriptionInput" className="col-sm-3 col-form-label" id='label'>Beschreibung</label>
                                                <div className="col-sm-9">
                                                    <textarea className="form-control" id="descriptionInput" placeholder="Beschreibung" rows={3} value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                                                </div>
                                            </div>
                                            <div className="form-group row mb-2">
                                                <label htmlFor="locationInput" className="col-sm-3 col-form-label">Author</label>
                                                <div className="col-sm-9">
                                                    <input type="text" className="form-control" id="locationInput" placeholder="Ort" value={author} onChange={(e) => setAuthor(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="form-group row mb-2">
                                                <label htmlFor="dateInput" className="col-sm-3 col-form-label" id='label'>Datum</label>
                                                <div className="col-sm-9">
                                                    <input type="date" className="form-control" id="dateInput" value={created} onChange={(e) => setCreated(e.target.value)} />
                                                </div>
                                            </div>
                                            
                                            <button type="button" className="btn btn-primary LoginButton mt-3" data-bs-dismiss="modal" onClick={handleSubmit}>Speichern</button>
                                        </form>
                                    </div>
                                    <div className="col"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Toast className="toast-bottom-right" show={showToast} onClose={() => setShowToast(false)}>
                <Toast.Header>
                    <strong className="me-auto">Achtung</strong>
                </Toast.Header>
                <Toast.Body>Bitte füllen Sie alle Felder aus.</Toast.Body>
            </Toast>

            <Toast className="toast-bottom-right" show={successToast} onClose={() => setSuccessToast(false)}>
                <Toast.Header>
                    <strong className="me-auto">Erfolg</strong>
                </Toast.Header>
                <Toast.Body>Event erfolgreich erstellt!</Toast.Body>
            </Toast>
        </div>
    )
}