import React from "react";
import { Link } from "react-router-dom";

const ImageCard = ({
  nasaId,
  title,
  location,
  photographer,
  thumbnail,
  dateCreated,
}) => {
  return (
    <Link to={`/show/${nasaId}`} className="block">
      <div
        data-testid="result-image-card"
        className="bg-black rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      >
        <div className="h-48 overflow-hidden bg-gray-200">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/300x200?text=ERROR";
            }}
          />
        </div>

        <div className="text-sm text-white space-y-1 p-4">
          <h3 className="text-lg font-semibold line-clamp-2 mb-2">{title}</h3>
          {location && (
            <p className="flex items-start">
              <span className="font-medium mr-1">Location:</span>
              <span className="line-clamp-1">{location}</span>
            </p>
          )}

          {photographer && (
            <p className="flex items-start">
              <span className="font-medium mr-1">Photographer:</span>
              <span className="line-clamp-1">{photographer}</span>
            </p>
          )}

          {dateCreated && (
            <p className="text-xs text-gray-500 mt-2">{dateCreated}</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ImageCard;
