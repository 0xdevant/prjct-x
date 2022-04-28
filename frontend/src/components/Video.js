import React from "react";

function Video() {
  return (
    <div className="video-section" id="about">
      <div className="px-12 py-8 md:p-8 md:w-3/5 lg:w-2/5 mx-auto">
        <div className="flex flex-col">
          <div className="video-player">
            <iframe
              title="Teaser Video"
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/NT87Dc3421Y"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="video-desc p-6 md:p-12 flex flex-col space-y-6 justify-center">
            <p className="special-font">
              Are you ready
              <br />
              to take your SOUL
              <br />
              into the metaverse?{" "}
            </p>
            <p>
              Into the Metaverse…a multi-dimensional space for new creative
              expression, offers us a chance to bring in items we can’t live
              without- our passion for sound, our headphones. Introducing
              SOUL&#174; PRJCT-X, our very own NFT community dedicated to our
              fans and music lovers to flex in and out of the Metaverse with
              SOUL&#174; products.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Video;
