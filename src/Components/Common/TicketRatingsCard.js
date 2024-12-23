import React, { useState } from "react";
import Rating from "react-rating";
import { Card, CardHeader, CardBody, Button, Input, FormGroup, Label } from "reactstrap";

const TicketRatingsCard = ({ rated, onSubmitRating}) => {
  const [userRating, setUserRating] = useState(0);
  const [userRemarks, setUserRemarks] = useState("");
  console.log(rated);
  

  const handleSubmit = () => {
    if (userRating > 0) {
      onSubmitRating(userRating, userRemarks); // Include remarks on submission
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="d-flex">
          <i className="ri-star-fill align-bottom me-1 text-warning"></i>
          <h5
            className="card-title flex-grow-1 mb-0"
            style={{
              fontWeight: 700,
              fontSize: "15px",
            }}
          >
            Feedback
          </h5>
        </div>
      </CardHeader>
      <CardBody>
        <div className="text-center">
          {!rated ? (
            <>
              <h6>Give Your Rating</h6>
              <div className="stars mb-2">
                <Rating
                  initialRating={userRating}
                  onClick={(rate) => setUserRating(rate)}
                  fractions={2}
                  emptySymbol="mdi mdi-star-outline text-muted"
                  fullSymbol="mdi mdi-star text-warning"
                  style={{ fontSize: "30px" }} // Increased size for stars
                />
              </div>

              {/* Remarks Input Field */}
              <FormGroup>
                <Label for="remarks">Remarks</Label>
                <Input
                  type="textarea"
                  id="remarks"
                  value={userRemarks}
                  onChange={(e) => setUserRemarks(e.target.value)}
                  placeholder="Enter your remarks here..."
                  rows="3"
                  className="mb-2"
                />
              </FormGroup>

              <Button
                color="warning"
                size="sm"
                onClick={handleSubmit}
                disabled={userRating === 0}
              >
                Submit Rating
              </Button>
            </>
          ) : (
            // Show the thank you message if the rating is already submitted
            <p className="text-success mt-2">Thank you for your feedback!</p>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default TicketRatingsCard;
