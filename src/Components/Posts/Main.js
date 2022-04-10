import React, { useState, useEffect } from "react";
import firebase from "../../firebase/config";
import NewPost from "./NewPost";
import { useDispatch, useSelector } from "react-redux";
import {
  addPostAction,
  getMyPostsAction,
  editPostAction,
  deletePostAction,
  toggleLikePostAction,
  toggleFilterAction,
} from "../../redux/actions/postsActions";
import OnePost from "./OnePost";
import {
  ButtonBlue,
  LoadingSpinner,
  LoadingSpinnerContainer,
} from "../../Styled-Components";
import PostsPagination from "./PostsPagination";

const Main = () => {
  const dispatch = useDispatch();
  const activeUser = useSelector((state) => state.auth.activeUser);
  const myPosts = useSelector((state) => state.posts.myPosts);
  const filteredPosts = useSelector((state) => state.posts.filteredPosts);
  const postsCollection = firebase.firestore().collection("posts");
  const isFiltered = useSelector((state) => state.posts.isFiltered);
  const [postsPagination, setPostsPagination] = useState([]);
  const [page, setPage] = useState(0);
  const [filteredPostsPagination, setFilteredPostsPagination] = useState([]);
  const [filteredPostsPage, setFilteredPostsPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [postChangeLoading, setPostChangeLoading] = useState(false);

  useEffect(() => {
    setFilteredPostsPagination(paginate(filteredPosts));
  }, [isFiltered, filteredPosts]);

  const paginate = (array) => {
    const postsPerPage = 5;
    const posts = [...array].sort((a, b) => {
      return b.createdAt.seconds - a.createdAt.seconds;
    });
    let pagination = [];
    const amountOfPages = Math.ceil(posts.length / postsPerPage);
    for (let i = 0; i < amountOfPages; i++) {
      pagination.push(posts.slice(0, postsPerPage));
      posts.splice(0, postsPerPage);
    }
    return pagination;
  };

  const getMyPosts = async () => {
    let posts = [];
    try {
      const temp = await postsCollection
        .where("authorEmail", "==", activeUser.email)
        .get();
      temp.forEach((post) =>
        posts.push(Object.assign(post.data(), { id: post.id }))
      );
      dispatch(getMyPostsAction(posts));
      setPostsPagination(paginate(posts));
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyPosts();
  }, [myPosts.length]);

  const CRUDposts = {
    handleAddPost: async ({ heading, description }) => {
      const newPost = {
        heading,
        description,
        authorEmail: activeUser.email,
        authorUsername: activeUser.username,
        likedBy: [],
        createdAt: new Date(),
      };
      setLoading(true);
      try {
        await postsCollection.add(newPost);
        dispatch(addPostAction(newPost));
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    },
    handleDeletePost: async (id) => {
      setPostChangeLoading(true);
      try {
        await postsCollection.doc(id).delete();
        dispatch(deletePostAction(id));
        setPostChangeLoading(false);
      } catch (err) {
        console.error(err);
        setPostChangeLoading(false);
      }
    },
    handleEditPost: async (id, { heading, description }) => {
      setPostChangeLoading(true);
      try {
        await postsCollection.doc(id).update({ heading, description });
        getMyPosts();
        dispatch(editPostAction(id, { heading, description }));
        setPostChangeLoading(false);
      } catch (err) {
        console.error(err);
        setPostChangeLoading(false);
      }
    },
    handleLikePost: async (id, userEmail) => {
      try {
        let likedBy = await (await postsCollection.doc(id).get()).data()
          .likedBy;
        if (likedBy.map((like) => like.email).includes(userEmail)) {
          likedBy = likedBy.filter((like) => like.email !== userEmail);
        } else {
          likedBy = [{ email: userEmail, timestamp: new Date() }, ...likedBy];
        }
        await postsCollection.doc(id).update({ likedBy });
        getMyPosts();
        dispatch(toggleLikePostAction(id, userEmail));
      } catch (err) {
        console.error(err);
      }
    },
  };

  if (loading)
    return (
      <LoadingSpinnerContainer>
        <LoadingSpinner />
      </LoadingSpinnerContainer>
    );

  return (
    <div>
      {isFiltered && (
        <ButtonBlue onClick={() => dispatch(toggleFilterAction(false))}>
          Back to my posts
        </ButtonBlue>
      )}
      {isFiltered ? (
        <>
          {filteredPostsPagination[0] &&
            filteredPostsPagination[filteredPostsPage].map((post, index) => (
              <OnePost key={index} {...post} {...CRUDposts} />
            ))}
          <PostsPagination
            isFiltered={isFiltered}
            filteredPostsPagination={filteredPostsPagination}
            filteredPostsPage={filteredPostsPage}
            setFilteredPostsPage={setFilteredPostsPage}
            postsPagination={postsPagination}
            page={page}
            setPage={setPage}
          />
        </>
      ) : (
        <>
          <NewPost handleAddPost={CRUDposts.handleAddPost} />
          {postsPagination[0] &&
            postsPagination[page].map((post, index) => (
              <OnePost
                key={index}
                {...post}
                {...CRUDposts}
                postChangeLoading={postChangeLoading}
              />
            ))}
          <PostsPagination
            isFiltered={isFiltered}
            filteredPostsPagination={filteredPostsPagination}
            filteredPostsPage={filteredPostsPage}
            setFilteredPostsPage={setFilteredPostsPage}
            postsPagination={postsPagination}
            page={page}
            setPage={setPage}
          />
        </>
      )}
    </div>
  );
};

export default Main;
