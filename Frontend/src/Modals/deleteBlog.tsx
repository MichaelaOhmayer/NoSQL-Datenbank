


export default function DeleteBlog({ uuid }: { uuid: string }) {

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8081/api/blogs/$(blog.uuid)`, {
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
            <div className="modal fade" id="staticBackdrop-1" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Delete Blog</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this blog?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}