import React from "react";
import Chip from "@mui/material/Chip";
import styles from "./Card.module.css";

function Card({ image, follows, title }) {
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
            label={`${follows} Follows`}
            className={styles.chip}
          />
        </div>
      </div>

      <p className={styles.title}>{title}</p>
    </div>
  );
}

export default Card;