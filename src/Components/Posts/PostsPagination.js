import React from "react";
import { ButtonBlue } from "../../Styled-Components";

const PostsPagination = ({
  isFiltered = false,
  filteredPostsPagination = [],
  filteredPostsPage = 0,
  setFilteredPostsPage = (f) => f,
  postsPagination = [],
  page = 0,
  setPage = (f) => f,
}) => {
  return (
    <>
      {isFiltered ? (
        <>
          {filteredPostsPagination.length > 1 &&
          filteredPostsPage < filteredPostsPagination.length - 1 ? (
            <ButtonBlue
              onClick={() => setFilteredPostsPage((value) => value + 1)}
            >
              Next page
            </ButtonBlue>
          ) : null}
          {filteredPostsPagination.length > 1 && filteredPostsPage > 0 ? (
            <ButtonBlue
              onClick={() => setFilteredPostsPage((value) => value - 1)}
            >
              Previous page
            </ButtonBlue>
          ) : null}
        </>
      ) : (
        <>
          {postsPagination.length > 1 && page < postsPagination.length - 1 ? (
            <ButtonBlue onClick={() => setPage((value) => value + 1)}>
              Next page
            </ButtonBlue>
          ) : null}
          {postsPagination.length > 1 && page > 0 ? (
            <ButtonBlue onClick={() => setPage((value) => value - 1)}>
              Previous page
            </ButtonBlue>
          ) : null}
        </>
      )}
    </>
  );
};

export default PostsPagination;
