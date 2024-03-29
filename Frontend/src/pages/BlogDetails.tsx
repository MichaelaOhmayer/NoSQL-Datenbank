import React, { useState } from 'react';

function Comment({ text, isMyComment }) {
    const alignment = isMyComment ? 'justify-content-end' : 'justify-content-start';
    return (
        <div className={`row ${alignment}`}>
            <div className='col-auto mt-2'>
                <div className="card"> 
                    <div className="card-body py-2">
                        <p className="card-text">{text}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function BlogDetails() {
    const [comments, setComments] = useState(['Dinos sind so cool ich muss mehr sehen!']);
    const [myComments, setMyComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setMyComments([...myComments, newComment]);
        setNewComment('');
    }

    return (
        <>
            <div className="containerSmall">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <h3>Titel: Dinosaurier</h3>
                        <p>Beschreibung: <br />
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                        <p>Datum: 11.11.11</p>

                        <div className="mt-5">
                            <h4>Kommentare:</h4>
                            {comments.map((comment) => <Comment text={comment} isMyComment={false} />)}
                            {myComments.map((comment) => <Comment text={comment} isMyComment={true}/>)}
                        </div>

                        <div className="col-md-8 mt-5 mx-auto">
                            <form onSubmit={handleSubmit}>
                                <div className="input-group mt-5">
                                    <span className="input-group-text">Chat!</span>
                                    <textarea className="form-control" aria-label="With textarea" value={newComment} onChange={e => setNewComment(e.target.value)}></textarea>
                                    <button type="submit" className="btn btn-primary LoginButton">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}