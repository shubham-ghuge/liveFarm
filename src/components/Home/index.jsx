import React from "react";
import { VideoCard } from "../VideoCard";
import { useDataContext } from "../../contexts/DataContextProvider";
import { Loader } from "../Loader";

export function Home() {
  const { videoData, loading } = useDataContext();
  return (
    <>
      <section className="hero">
        <div className="overlay"></div>
        <div className="overlay-2"></div>
        <div className="content">
          <h2>
            One place,
            <br />
            For Farmers.
          </h2>
          <p>
            Curated list of videos for Farmers, <br />
            presented in curated categories. <br />
          </p>
        </div>
      </section>
      <section className="video-listing">
        <h3 className="heading">Videos</h3>
        {loading ? (
          <div className="d-flex jc-center ai-center h-30">
            <Loader />
          </div>
        ) : (
          videoData.map((video, idx) => (
            <VideoCard videoDetails={video} key={idx} />
          ))
        )}
      </section>
    </>
  );
}
