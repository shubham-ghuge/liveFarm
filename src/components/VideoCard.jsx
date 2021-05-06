import { useNavigate } from "react-router-dom";

export const VideoCard = ({ videoDetails }) => {
  let navigation = useNavigate();
  return (
    <figure
      className="video-card"
      onClick={() => navigation(`/video/${videoDetails.id}`)}
      key={videoDetails.id}
    >
      <img
        src={`https://img-assets.netlify.app/video-thumbnails/${videoDetails.thumbnail}`}
        alt="thumbnail"
        className="video-card-thumbnail"
        loading="lazy"
      />
      <figcaption className="video-card-details">
        <p className="channel-name">
          User Name <span className="date">jan 12, 2021</span>
        </p>
        <h4 className="video-card-title">{videoDetails.name}</h4>
        <p className="video-card-description">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio magnam
          fuga voluptatum sunt at. Perferendis unde perspiciatis aliquam
          cupiditate id.
        </p>
        <div className="video-card-stats">
          <span className="count">
            <i className="icon bx bx-show-alt"></i>23 views
          </span>
          <span className="likes">
            <i className="icon bx bxs-heart"></i>23 likes
          </span>
        </div>
      </figcaption>
    </figure>
  );
};
