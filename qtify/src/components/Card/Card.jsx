import React from "react";
import Chip from "@mui/material/Chip";
import styles from "./Card.module.css";

function Card({ image, follows, title, chipLabel = "Follows" }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <img
          src={image}
          alt={title}
          className={styles.image}
        />

        <div className={styles.followSection}>
          <Chip
            label={`${follows} ${chipLabel}`}
            className={styles.chip}
          />
        </div>
      </div>

      <p className={styles.title}>{title}</p>
    </div>
  );
}

export default Card;