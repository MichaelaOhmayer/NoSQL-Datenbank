export default function DeleteBlog({ uuid }: { uuid: string }) {

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/blogs/${uuid}`, {
                method: "DELETE"
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            window.location.reload();
            
        } catch (error) {
            console.error("Fehler beim Löschen des Events:", error);
        }
    };

    return (
        <>
            <div className="modal fade" id={`staticBackdrop-${uuid}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="spinner-grow text-danger mx-4" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Blog löschen?</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Willst du den Blog wirklich löschen?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Schließen</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleDelete}>Löschen</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}