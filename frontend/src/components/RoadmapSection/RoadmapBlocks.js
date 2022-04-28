import React from "react";

function RoadmapBlocks({ title, desc }) {
  return (
    <div className="roadmap relative w-full sm:w-[32em] mx-auto flex flex-col justify-center space-y-10 sm:space-y-16 p-6 sm:p-8 z-10">
      <div className="flex flex-col space-y-4 justify-center">
        <p className="text-sm sm:text-lg special-font">{title}</p>
        <p>{desc}</p>
      </div>
    </div>
  );
}

export default RoadmapBlocks;
