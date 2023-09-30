import React from "react";

const ItemReviewDetails = ({ rating, desc }) => {
  const renderStars = (rating, fontSize) => {
    const starStyle = {
      fontSize: `${fontSize}px`,
    };
    const filledStars = "★".repeat(rating);
    const emptyStars = "☆".repeat(5 - rating);
    return (
      <span style={starStyle}>
        {filledStars}
        {emptyStars}
      </span>
    );
  };

  return (
    <div className="flex flex-col h-full text-left ml-2 mt-4">
      <h2 className="text-xl font-semibold mb-4">Review Details</h2>

      <div className="mb-4">
        <strong>Rating:</strong> {renderStars(rating, 20)}
      </div>
      <div className="mb-4">
        <strong>Description:</strong> {desc}
      </div>
    </div>
  );
};

export default ItemReviewDetails;
