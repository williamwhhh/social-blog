import React from "react";
import { Row } from "antd";
import { createUseStyles } from "react-jss";
import dayjs from "dayjs";

const useStyles = createUseStyles({
  footerRow: {
    backgroundColor: "lightgrey",
    height: "55px",
  },
  footerText: {
    marginLeft: "12px",
    fontSize: "11pt",
  },
});

export default function Footer() {
  const styles = useStyles();
  return (
    <Row
      justify="center"
      align="middle"
      className={styles.footerRow}
      style={{ position: "relative", zIndex: "100" }}
    >
      <a href="http://localhost:3000/" className={styles.footerText}>
        Copyright © {dayjs().year()} Social Blog Pty Ltd
      </a>
    </Row>
  );
}
