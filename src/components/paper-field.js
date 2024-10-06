import { Chip, Paper, Typography } from "@mui/material";
import styles from "../styles/main.module.css";

const PaperField = ({ Icon, value, title, className }) => {
  return (
    <Paper variant="outlined" className={`${styles.container} ${className}`}>
      <Icon />
      <div className={styles.containerTitle}>
        <Typography
          style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: 500 }}
        >
          {title}
        </Typography>
        <Chip label={value} variant="outlined" color="info" />
      </div>
    </Paper>
  );
};

export default PaperField;
