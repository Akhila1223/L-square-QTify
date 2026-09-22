import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card/Card";
import styles from "./Section.module.css";

function Section({ title, endpoint, showAllInitially = false }) {
  const [albums, setAlbums] = useState([]);
  const [showAll, setShowAll] = useState(showAllInitially);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    axios
      .get(endpoint)
      .then((response) => {
        setAlbums(response.data);
      })
      .catch((error) => {
        console.error(`Error fetching ${title}:`, error);
      });
  }, [endpoint, title]);

  const visibleAlbums = showAll
    ? albums
    : albums.slice(slideIndex, slideIndex + 7);

  const handleNext = () => {
    if (slideIndex + 7 < albums.length) {
      setSlideIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (slideIndex > 0) {
      setSlideIndex((prev) => prev - 1);
    }
  };

  const handleShowAll = () => {
    setShowAll(true);
    setSlideIndex(0);
  };

  const handleCollapse = () => {
    setShowAll(false);
    setSlideIndex(0);
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>{title}</h2>

        <button
          className={styles.toggleButton}
          onClick={showAll ? handleCollapse : handleShowAll}
        >
          {showAll ? "Collapse" : "Show All"}
        </button>
      </div>

      <div className={styles.sliderContainer}>
        {slideIndex > 0 && (
          <button
            className={`${styles.arrow} ${styles.leftArrow}`}
            onClick={handlePrevious}
            aria-label="previous"
          >
            ‹
          </button>
        )}

        <div
          className={`${styles.cardGrid} ${showAll ? styles.expandedGrid : ""}`}
        >
          {visibleAlbums.map((album) => (
            <Card
              key={album.id}
              image={album.image}
              follows={album.follows}
              title={album.title}
            />
          ))}
        </div>

        {!showAll && slideIndex + 7 < albums.length && (
          <button
            className={`${styles.arrow} ${styles.rightArrow}`}
            onClick={handleNext}
            aria-label="next"
          >
            ›
          </button>
        )}
      </div>
    </section>
  );
}

export default Section;
