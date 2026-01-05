import React from "react";

const BenefitCard=({ title, description, image }) =>{
  return (
    <div className="card w-full bg-base-100 shadow-md flex-1">
      <div className="card-body flex-row items-center gap-6">

        {/* Left Image */}
        <img
          src={image}
          alt={title}
          className="w-14 h-14 object-contain bg-white"
        />

        {/* Vertical Divider */}
        <div className="divider divider-horizontal m-0"></div>

        {/* Right Content */}
        <div className="flex-1">
          <h3 className="card-title text-lg">
            {title}
          </h3>
          <p className="text-sm text-base-content/70">
            {description}
          </p>
        </div>

      </div>
    </div>
  );
}

export default BenefitCard;
