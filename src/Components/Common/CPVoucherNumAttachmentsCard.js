import React, { useState, useRef } from "react";
import {
  CardHeader,
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Col,
  Row,
  Input,
  Label,
  FormGroup,
} from "reactstrap";
import { useDispatch } from "react-redux";

const CPVoucherNumAttachmentsCard = () => {
  const [modal, setModal] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [description, setDescription] = useState("");
  const [printWithVoucher, setPrintWithVoucher] = useState(true);
  const [uploadMethod, setUploadMethod] = useState("camera");
  const [file, setFile] = useState(null);
  const [submittedFile, setSubmittedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]); // New state for uploaded files
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const dispatch = useDispatch();

  const toggleModal = () => {
    if (!modal) {
      startCamera();
    } else {
      stopCamera();
    }
    setModal(!modal);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
    } catch (err) {
      setCameraError("Error accessing camera: " + err.message);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const handleTakePicture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const photoURL = canvas.toDataURL("image/png");
    setPhoto(photoURL);
    setSubmittedFile(photoURL); // Mark as uploaded
    setUploadedFiles((prevFiles) => [
      ...prevFiles,
      { name: "Camera_Capture.png", url: photoURL },
    ]);
    stopCamera();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result);
      setSubmittedFile(selectedFile); // Mark as uploaded

      if (selectedFile.type.startsWith("image/")) {
        setFilePreview(
          <img src={reader.result} alt="Uploaded" className="img-fluid mt-3" />
        );
      } else if (selectedFile.type === "application/pdf") {
        setFilePreview(
          <iframe
            src={reader.result}
            title="PDF Preview"
            style={{ width: "100%", height: "400px" }}
            className="mt-3"
          />
        );
      } else {
        setFilePreview(
          <p className="mt-3 text-success">
            File attached: {selectedFile.name}
          </p>
        );
      }

      // Add the uploaded file to the list
      setUploadedFiles((prevFiles) => [
        ...prevFiles,
        { name: selectedFile.name, url: reader.result },
      ]);
    };
    reader.readAsDataURL(selectedFile);
    setFile(selectedFile);
  };

  const handleSubmit = async () => {
    const data = {
      description,
      printWithVoucher,
      file: photo,
    };

    console.log(data);

    try {
      // Perform form submission logic
      data;
    } catch (err) {
      console.error("Error submitting form:", err);
    }

    setModal(false);
  };

  const handleUploadMethodChange = (method) => {
    setUploadMethod(method);
    if (method === "camera") {
      startCamera(); // Start the camera when "Use Camera" is selected
    } else {
      stopCamera(); // Stop the camera if file upload is selected
    }
  };

  // Helper function to truncate file names
  const truncateFileName = (name, maxLength = 20) => {
    if (name.length <= maxLength) return name;
    const ext = name.split(".").pop();
    return `${name.substring(0, maxLength - ext.length - 3)}...${ext}`;
  };

  return (
    <React.Fragment>
      <Card>
        <CardHeader className="align-items-center d-flex border-bottom-dashed">
          <i className="ri-attachment-line align-bottom me-1 text-muted"></i>{" "}
          <h4 className="card-title mb-0 flex-grow-1">Attachments</h4>
          <div className="flex-shrink-0">
            <button
              type="button"
              className="btn btn-soft-primary btn-sm"
              onClick={toggleModal}
            >
              <i className="ri-upload-2-fill me-1 align-bottom"></i> Upload
            </button>
          </div>
        </CardHeader>

        <CardBody>
          {uploadedFiles.length > 0 ? (
            <ul className="list-unstyled">
              {uploadedFiles.map((file, index) => (
                <li
                  key={index}
                  className="d-flex justify-content-between align-items-center"
                >
                  <span>
                    {index + 1}. {truncateFileName(file.name)}
                  </span>
                  <button
                    type="button"
                    className="btn btn-link text-danger btn-sm"
                    onClick={() => {
                      setUploadedFiles((prevFiles) =>
                        prevFiles.filter((_, i) => i !== index)
                      );
                    }}
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-danger">No file uploaded yet</p>
          )}
        </CardBody>

      </Card>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Add Attachment</ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormGroup>

              <FormGroup check>
                <Input
                  type="checkbox"
                  id="printWithVoucher"
                  checked={printWithVoucher}
                  onChange={() => setPrintWithVoucher(!printWithVoucher)}
                />
                <Label for="printWithVoucher" check>
                  Print with Voucher
                </Label>
              </FormGroup>

              <FormGroup>
                <Label>Upload Method</Label>
                <div>
                  <Input
                    type="radio"
                    name="uploadMethod"
                    value="camera"
                    checked={uploadMethod === "camera"}
                    onChange={() => handleUploadMethodChange("camera")}
                  />{" "}
                  Use Camera
                  <Input
                    type="radio"
                    name="uploadMethod"
                    value="file"
                    checked={uploadMethod === "file"}
                    onChange={() => handleUploadMethodChange("file")}
                    className="ms-3"
                  />{" "}
                  Attach File
                </div>
              </FormGroup>

              {uploadMethod === "camera" ? (
                !photo ? (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      style={{ width: "100%", height: "auto" }}
                    ></video>
                    <Button
                      color="primary"
                      className="w-100 mt-3"
                      onClick={handleTakePicture}
                    >
                      Take Picture
                    </Button>
                  </>
                ) : (
                  <>
                    <img src={photo} alt="Captured" className="img-fluid" />
                    <Button
                      color="primary"
                      className="w-100 mt-3"
                      onClick={() => {
                        setPhoto(null);
                        startCamera(); // Open the camera again when retaking
                      }}
                    >
                      Retake Picture
                    </Button>
                  </>
                )
              ) : (
                <>
                  <Input type="file" onChange={handleFileChange} />
                  {filePreview}
                </>
              )}
            </Col>
          </Row>

          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

          <Row className="mt-3">
            <Col className="text-end">
              <Button color="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default CPVoucherNumAttachmentsCard;
