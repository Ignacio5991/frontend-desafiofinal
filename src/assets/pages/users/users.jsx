import React, { useState, useEffect } from "react";
import axios from "axios";

// Components
import UserCard from "../../components/user-card/user-card";

// Styles
import styles from "./users.module.css";

const Users = () => {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handlerSwitchRole = async (userWithNewRole) => {
    try {
      setIsLoading(true);
      await axios.put(
        "https://ecomercebackend-production.up.railway.app/api/users/",
        {
          id: userWithNewRole._id,
          user: userWithNewRole,
        },
        { withCredentials: true }
      );
      const response = await axios.get(
        "https://ecomercebackend-production.up.railway.app/api/users",
        { withCredentials: true }
      );

      setUsers(response.data);
    } catch (error) {
      setError(true);
    }
    setIsLoading(false);
  };

  const handlerDeleteUser = async (id) => {
    try {
      setIsLoading(true);
      await axios.delete(
        "https://ecomercebackend-production.up.railway.app/api/users/" + id,
        null,
        { withCredentials: true }
      );
      const response = await axios.get(
        "https://ecomercebackend-production.up.railway.app/api/users",
        { withCredentials: true }
      );

      setUsers(response.data);
    } catch (error) {
      setError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://ecomercebackend-production.up.railway.app/api/users",
          { withCredentials: true }
        );

        setUsers(response.data);
      } catch (error) {
        setError(true);
      }
      setIsLoading(false);
    };

    fetchUsers();
  }, []);

  console.log(users);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <p className={styles.loading}>Cargando...</p>
      ) : error ? (
        <p className={styles.error}>Ha ocurrido un error</p>
      ) : (
        <>
          <h1 className={styles.heading}>Usuarios</h1>
          <div className={styles["users-container"]}>
            {users?.map(
              (user, index) =>
                user.role !== "admin" && (
                  <UserCard
                    user={user}
                    key={user.email}
                    onDelete={() => handlerDeleteUser(user._id)}
                    onSwitchRole={(newRole) =>
                      handlerSwitchRole({
                        ...user,
                        role: newRole,
                      })
                    }
                  />
                )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Users;
