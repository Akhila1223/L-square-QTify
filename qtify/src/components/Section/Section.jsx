import React, { useEffect, useState } from "react";
import axios from "axios";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Card from "../Card/Card";
import styles from "./Section.module.css";

function Section({
  title,
  endpoint,
  showAllInitially = false,
  isSongs = false,
}) {
  const [items, setItems] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("all");

  const [showAll, setShowAll] = useState(showAllInitially);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    axios
      .get(endpoint)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error(`Error fetching ${title}:`, error);
      });
  }, [endpoint, title]);

  useEffect(() => {
    if (!isSongs) return;

    axios
      .get("https://qtify-backend.labs.crio.do/genres")
      .then((response) => {
        setGenres(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching genres:", error);
      });
  }, [isSongs]);

  const filteredItems = isSongs
    ? selectedGenre === "all"
      ? items
      : items.filter((item) => item.genre.key === selectedGenre)
    : items;

  const handleNext = () => {
    if (slideIndex + 7 < filteredItems.length) {
      setSlideIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (slideIndex > 0) {
      setSlideIndex((prev) => prev - 1);
    }
  };

  const handleGenreChange = (event, newValue) => {
    setSelectedGenre(newValue);
    setSlideIndex(0);
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

        {!isSongs && (
          <button
            className={styles.toggleButton}
            onClick={showAll ? handleCollapse : handleShowAll}
          >
            {showAll ? "Collapse" : "Show All"}
          </button>
        )}
      </div>

      {isSongs && (
        <Tabs
          value={selectedGenre}
          onChange={handleGenreChange}
          className={styles.tabs}
        >
          <Tab value="all" label="All" className={styles.tab} />

          {genres.map((genre) => (
            <Tab
              key={genre.key}
              value={genre.key}
              label={genre.label}
              className={styles.tab}
            />
          ))}
        </Tabs>
      )}

      <div className={styles.sliderContainer}>
        {!showAll && slideIndex > 0 && (
          <button
            className={`${styles.arrow} ${styles.leftArrow}`}
            onClick={handlePrevious}
            aria-label="previous"
          >
            ‹
          </button>
        )}

        <div
          className={`${styles.cardViewport} ${
            showAll ? styles.expandedViewport : ""
          }`}
        >
          <div
            className={styles.cardGrid}
            style={{
              transform: showAll
                ? "translateX(0)"
                : `translateX(-${slideIndex * 183}px)`,
            }}
          >
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                image={item.image}
                follows={isSongs ? item.likes : item.follows}
                title={item.title}
                chipLabel={isSongs ? "Likes" : "Follows"}
              />
            ))}
          </div>
        </div>

        {!showAll && slideIndex + 7 < filteredItems.length && (
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
