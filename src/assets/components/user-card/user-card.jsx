import React from "react";
import {Button} from "react-bootstrap";
import {capitalize} from "../../utils/capitalize";

// Styles
import styles from "./user-card.module.css";

const UserCard = ({user, onDelete, onSwitchRole}) => {
  return (
    <div className={styles.container}>
      <div className={styles["info-container"]}>
        <p>
          <span className={styles['user-summary-title']}>Nombre:</span> {user.firstName}
        </p>
        <p>
          <span className={styles['user-summary-title']}>Apellido:</span> {user.lastName}
        </p>
        <p>
          <span className={styles['user-summary-title']}>Email:</span> {user.email}
        </p>
        <p>
          <span className={styles['user-summary-title']}>Role:</span> {capitalize(user.role)}
        </p>
      </div>
      <div className={styles.actions}>
        <Button 
          onClick={() => onSwitchRole(user.role === "user" ? "premium" : "user")} 
          variant="warning"
        >
          Switch to {user.role === "user" ? "Premium" : "User"}
        </Button>
        <Button 
          onClick={onDelete} 
          variant="danger"
        >
          Delete User
        </Button>
      </div>
    </div>
  );
};

export default UserCard;