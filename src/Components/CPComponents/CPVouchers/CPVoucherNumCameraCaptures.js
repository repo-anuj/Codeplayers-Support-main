import React, { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Card,CardHeader, CardBody, Spinner} from "reactstrap";
import { GET_VOUCHERNUM_IMAGES } from "../../../slices/ERPReportings/VoucherNum/CameraCaptures/thunk"
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper-bundle.css";

const CPVoucherNumCameraCaptures = ({voucherdata,labelTitle }) => {
  const dispatch = useDispatch(); // Used for API connection
   const data = useSelector((state) => state.VoucherNumCameraCapture.data);
   const loading = useSelector((state) => state.VoucherNumCameraCapture.loading);
   const error = useSelector((state) => state.VoucherNumCameraCapture.error);
   const success = useSelector((state) => state.VoucherNumCameraCapture.success);
   const navigate = useNavigate(); // Initialize useNavigate

   

   const handleDownload = async () => {
    if(!loading){
    dispatch(GET_VOUCHERNUM_IMAGES(voucherdata.voucherNumID));
  }
  };

    
   // Rendering Swiper component if user2 exists and has elements
   return (
    
      <Card>
        <CardHeader className="align-items-center d-flex border-bottom-dashed">
                            <h4 className="card-title mb-0 flex-grow-1">Camera Captures</h4>
                            <div className="flex-shrink-0">
                            <button className="btn btn-success btn-sm me-2" onClick={handleDownload}>
                        { loading ? (<Spinner size="sm" />) : (<i className="ri-download-2-fill align-middle me-0 fs-6"></i>)}
                    </button>
                            </div>
                        </CardHeader>

        <CardBody>
        {data===null ? ("Please Download Images"):(<Swiper
            navigation
            pagination={{ clickable: true }}
            loop
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            className="mySwiper swiper navigation-swiper rounded">
            {data.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={`data:image/png;base64,${image.imageBase64}`}
                  alt={image.imageName}
                  className="img-fluid"
                />
              </SwiperSlide>
            ))}
          </Swiper>)}
        </CardBody>
      </Card>
  );
};


export default CPVoucherNumCameraCaptures;