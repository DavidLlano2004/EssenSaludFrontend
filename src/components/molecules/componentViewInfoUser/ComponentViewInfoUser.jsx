import React from "react";

const ComponentViewInfoUser = ({ fields }) => {
  return (
    <div className="grid sm:grid-cols-2 grid-cols-1 mt-10 gap-10 py-8">
      {fields.map(({ title, getValue, fallback }, index) => (
        <div className="flex justify-center" key={index}>
          <div>
            <h2 className="font-bold text-base text-white-custom text-center">
              {title}
            </h2>
            <p className="text-white-custom text-center font-extralight">
              {getValue() || fallback}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComponentViewInfoUser;
