

export default function Footer() {
    return (
      <div className="container mt-5">
        <footer className="row justify-content-between py-3 my-4 border-top">
          <div className="col-auto mb-3 mb-md-0 text-body-secondary">
            © 2024 Eventplanner, Inc
          </div>
          
          <div 
            className="col-auto mb-3 mb-md-0 text-body-secondary text-decoration-none cursor-pointer" 
            data-bs-toggle="offcanvas" 
            data-bs-target="#offcanvasBottom" 
            aria-controls="offcanvasBottom"
          >
            Impressum
          </div>
          
          <div className="offcanvas offcanvas-bottom" tabIndex={-1} id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
            <div className="offcanvas-header">
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body small d-flex justify-content-center text-center Liebe">
              Mit Liebe erstellt von <br/><br/>
              Michi & Luca
            </div>
          </div>
        </footer>
      </div>
    );
  }