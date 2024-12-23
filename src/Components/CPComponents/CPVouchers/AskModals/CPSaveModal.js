import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";

const CPSaveModal = ({
  loading,
  error,
  success,
  onSave,
  modalSave,
  toggleModalSave,
}) => {
  const handleSubmit = (values) => {
    onSave(values);
  };
  const [progress, setProgress] = useState(100); // State for the progress line
  const startAutoClose = () => {
    const totalDuration = 2000; // Total duration in milliseconds (3 seconds)
    const intervalTime = 100; // Update interval in milliseconds
    const steps = totalDuration / intervalTime; // Number of steps in the interval
    const decrement = 100 / steps; // Calculate how much to decrease each time
    if (progress === 100) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            toggleModalSave();
            return 100; // Reset for future usage
          }
          return prev - decrement; // Decrease progress
        });
      }, intervalTime); // Update every 100ms
    }
  };

  return (
    <Modal isOpen={modalSave} toggle={toggleModalSave} centered>
      <ModalHeader toggle={() => toggleModalSave(false)}>
        {loading
          ? "Submitting Data..."
          : error
          ? "Error Submitting"
          : success
          ? "Submitted"
          : "Do you want to Submit?"}
      </ModalHeader>

      <ModalBody className="text-center d-flex flex-column justify-content-center align-items-center">
        {loading ? (
          <div>
            <lord-icon
              src="https://cdn.lordicon.com/fttvwdlw.json"
              trigger="loop"
              colors="primary:#f7b84b,secondary:#405189"
              style={{ width: "130px", height: "130px" }}
            />
            <br />
            <br />

            <h5 className="mt-2 text-info">Sending Data to Server!</h5>
            <br></br>
          </div>
        ) : (
          ""
        )}
        {success ? (
          <div>
            {startAutoClose()}
            <lord-icon
              src="https://cdn.lordicon.com/lupuorrc.json"
              trigger="loop"
              colors="primary:#121331,secondary:#08a88a"
              style={{ width: "120px", height: "120px" }}
            />
            <h5 className="mt-2">Successfully saved!</h5>
            <div
              style={{
                width: "100%",
                height: "5px",
                background: "#ccc",
                position: "relative",
                overflow: "hidden",
                marginTop: "10px",
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  background: "#35dc54",
                  position: "absolute",
                  transition: "width 0.1s linear",
                }}
              ></div>
            </div>
          </div>
        ) : (
          ""
        )}
        {error ? (
          <div>
            <lord-icon
              src="https://cdn.lordicon.com/tdrtiskw.json"
              trigger="loop"
              colors="primary:#f7b84b,secondary:#405189"
              style={{ width: "130px", height: "130px" }}
            />
            <h5 className="mt-2 text-danger">{error}</h5>
            <br></br>
            <Button color="secondary" onClick={toggleModalSave}>
              Close
            </Button>
          </div>
        ) : (
          ""
        )}
        {!success && !loading && !error ? (
          <div>
            <div className="mb-2">
              <lord-icon
                src="https://cdn.lordicon.com/kbtmbyzy.json"
                trigger="loop"
                colors="primary:#405189,secondary:#02a8b5"
                style={{ width: "90px", height: "90px" }}
              ></lord-icon>
            </div>
            <h5 className="mb-1">{"Do You Want to Submit?"}</h5>
            <br />
            <div className="mb-2">
              <Button
                style={{ width: "75px" }}
                color="success"
                onClick={handleSubmit}
              >
                Yes
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                style={{ width: "75px" }}
                color="danger"
                onClick={toggleModalSave}
              >
                No
              </Button>
            </div>
          </div>
        ) : (
          ""
        )}
      </ModalBody>
    </Modal>
  );
};

export default CPSaveModal;

//   return (
//     <Modal isOpen={modalSave} toggle={toggleModalSave} centered>
//       <ModalHeader toggle={() => toggleModalSave(false)}>
//         {loading
//           ? "Submitting Data..."
//           : error
//           ? "Error Submitting"
//           : success
//           ? "Submitted"
//           : "Do you want to Submit?"}
//       </ModalHeader>
//       <ModalBody className="text-center d-flex flex-column justify-content-center align-items-center">
//         {loading ? (
//           "Loading"
//         ) : error ? (
//           <div>
//             <lord-icon
//               src="https://cdn.lordicon.com/tdrtiskw.json"
//               trigger="loop"
//               colors="primary:#f7b84b,secondary:#405189"
//               style={{ width: "130px", height: "130px" }}
//             />
//             <h5 className="mt-2">Submission failed!</h5>
//             <div
//               style={{
//                 width: "100%",
//                 height: "5px",
//                 background: "#ccc",
//                 position: "relative",
//                 overflow: "hidden",
//                 marginTop: "10px",
//               }}
//             >
//               <div
//                 style={{
//                   width: `${progress}%`,
//                   height: "100%",
//                   background: "#35dc54",
//                   position: "absolute",
//                   transition: "width 0.1s linear",
//                 }}
//               ></div>
//             </div>
//             <Button color="secondary" onClick={toggleModalSave}>
//               Close
//             </Button>
//           </div>
//         ) : success ? (
//           <div>
//             {startAutoClose()}
//             <lord-icon
//               src="https://cdn.lordicon.com/lupuorrc.json"
//               trigger="loop"
//               colors="primary:#121331,secondary:#08a88a"
//               style={{ width: "120px", height: "120px" }}
//             />
//             <h5 className="mt-2">Successfully saved!</h5>
//             <div
//               style={{
//                 width: "100%",
//                 height: "5px",
//                 background: "#ccc",
//                 position: "relative",
//                 overflow: "hidden",
//                 marginTop: "10px",
//               }}
//             >
//               <div
//                 style={{
//                   width: `${progress}%`,
//                   height: "100%",
//                   background: "#808080",
//                   position: "absolute",
//                   transition: "width 0.1s linear",
//                 }}
//               ></div>
//             </div>
//           </div>
//         ) : (
//           <div>
//             <div className="mb-2">
//               <lord-icon
//                 src="https://cdn.lordicon.com/kbtmbyzy.json"
//                 trigger="loop"
//                 colors="primary:#405189,secondary:#02a8b5"
//                 style={{ width: "90px", height: "90px" }}
//               ></lord-icon>
//             </div>
//             <h5 className="mb-1">{"Do You Want to Submit?"}</h5>
//             <br />
//             <div className="mb-2">
//               <Button
//                 style={{ width: "75px" }}
//                 color="success"
//                 onClick={handleSubmit}
//               >
//                 Yes
//               </Button>
//               &nbsp;&nbsp;&nbsp;&nbsp;
//               <Button
//                 style={{ width: "75px" }}
//                 color="danger"
//                 onClick={toggleModalSave}
//               >
//                 No
//               </Button>
//             </div>
//           </div>
//         )}
//       </ModalBody>
//     </Modal>
//   );
// };

// export default CPSaveModal;
