import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import firebase from "../../firebase/config";
import { getAllUsersAction } from "../../redux/actions/usersActions";
import {
  filterByUserAction,
  toggleFilterAction,
} from "../../redux/actions/postsActions";
import { FourUsersContainer } from "../../Styled-Components/UsersStyles";
import OneUser from "./OneUser";
import {
  LoadingSpinner,
  LoadingSpinnerContainer,
} from "../../Styled-Components";

const Main = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.users.allUsers);

  const getAllUsers = async () => {
    let allUsers = [];
    try {
      const usersCollection = await firebase
        .firestore()
        .collection("users")
        .get();
      (await usersCollection).forEach((doc) => allUsers.push(doc.data()));
      dispatch(getAllUsersAction(allUsers));
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [allUsers.length]);

  const getFourRandomUsers = useCallback((users) => {
    const shuffle = (array) => {
      let currentIndex = array.length,
        randomIndex;
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }
      return array;
    };
    const shuffledUsers = shuffle(users);
    return shuffledUsers.slice(0, 4);
  }, []);

  const handleFilterByUser = async (email) => {
    dispatch(toggleFilterAction(true));
    dispatch(filterByUserAction(email));
  };

  if (loading)
    return (
      <LoadingSpinnerContainer>
        <LoadingSpinner />
      </LoadingSpinnerContainer>
    );

  return (
    <>
      {" "}
      <h3>Friends</h3>
      <FourUsersContainer>
        {allUsers.length
          ? getFourRandomUsers(allUsers).map((user, index) => (
              <OneUser
                key={index}
                {...user}
                handleFilterByUser={handleFilterByUser}
              />
            ))
          : "Loading..."}
      </FourUsersContainer>
    </>
  );
};

export default React.memo(Main);
