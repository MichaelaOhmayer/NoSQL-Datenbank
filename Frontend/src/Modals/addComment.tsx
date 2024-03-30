import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function AddComments() {
  const { uuid } = useParams<{ uuid: string }>();
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
        
    if (!content) {
      setShowToast(true);
      return;
    }
    window.location.reload();
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:8081/api/blogs/${uuid}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content,
          author: author || "Anonymous",
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setContent("");
      setAuthor("");     

      document.getElementById("staticBackdrop")?.classList.remove("show");
      document.body.classList.remove("modal-open");
      document.querySelector(".modal-backdrop")?.remove();
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 5000);
        
    return () => clearTimeout(timer);
  }, [showToast]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4 justify-content-center">
            <button type="button" className="btn btn-primary Create mt-5 mb-5" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
              Kommentar hinzufügen
            </button>
          </div>
        </div>
      </div>
    
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Kommentar hinzufügen</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="authorInput" className="form-label">Autor</label>
                  <input type="text" className="form-control" id="authorInput" placeholder="Kein Pflichtfeld! Keine Eingabe: Anonym" value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="contentInput" className="form-label">Kommentartext*</label>
                  <textarea className="form-control" id="contentInput" placeholder="Kommentartext" rows={3} value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                </div>
                <button type="submit" className="btn btn-primary LoginButton" disabled={isLoading}>Speichern</button>
              </form>
            </div>
          </div>
        </div>
      </div>
  
      {/* Bootstrap Toast */}
      <div className="position-fixed bottom-0 end-0 p-3">
        <div className={"toast " + (showToast ? "show" : "")} role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
            <strong className="me-auto">Fehler</strong>
            <button type="button" className="btn-close" onClick={() => setShowToast(false)}></button>
          </div>
          <div className="toast-body">Bitte füllen Sie alle Felder aus.</div>
        </div>
      </div>
    </>
  );
}