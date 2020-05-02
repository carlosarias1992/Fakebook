import React from "react";

function getPhotoRow(post, start) {
  const { photos } = post;
  let sliceEnd = start < 2 && photos.length > 4 ? start + 3 : start + 2;

  if (photos.length > 4 && start === 2) {
    start += 1;
    sliceEnd += 1;
  }

  return photos.slice(start, sliceEnd).map((photoUrl, idx) => {
    let imageClass = "";

    if (photos.length === 1 || (photos.length === 3 && start !== 0)) {
      imageClass = " large-image-holder";
    }

    return (
      <div className={"post-image-holder" + imageClass} key={idx}>
        {photos.length > 5 && idx === 2 && (
          <div className="more-images-overlay">+{photos.length - 4}</div>
        )}
        <div className="image-overlay" />
        <img src={photoUrl} alt={"image-" + idx} />
      </div>
    );
  });
}

function renderPhotoRowWithClass(post, photoRow) {
  if (post.photos.length === 1) {
    return <div className="image-row large-image-row">{photoRow}</div>;
  } else {
    return <div className="image-row small-image-row">{photoRow}</div>;
  }
}

function renderPhotos(post) {
  const { photos } = post;
  const firstPhotoRow = getPhotoRow(post, 0);
  const secondPhotoRow = getPhotoRow(post, 2);

  return (
    <div className="images">
      {photos.length > 2 && renderPhotoRowWithClass(post, secondPhotoRow)}
      {photos.length > 0 && renderPhotoRowWithClass(post, firstPhotoRow)}
    </div>
  );
}

const PostBody = (props) => {
  const { post } = props;
  const { photos } = post;

  return (
    <>
      {post.lifeEvent ? (
        <span className="event">
          <div className="birthday-wrapper">
            {post.eventCategory === "birthday" && (
              <i className="birthday-icon" />
            )}
          </div>
          <p className={post.content.length < 95 ? "large-font" : ""}>
            {post.content}
          </p>
        </span>
      ) : (
        <>
          {post.content ? (
            <>
              <p
                className={
                  post.content.length < 95 && photos.length === 0
                    ? "large-font"
                    : ""
                }
              >
                {post.content}
              </p>
              {photos.length > 0 && renderPhotos(post)}
            </>
          ) : (
            renderPhotos(post)
          )}
        </>
      )}
    </>
  );
};

export default PostBody;
