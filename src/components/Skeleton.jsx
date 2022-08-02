import { Skeleton } from "@mui/material";
import React from "react";
const LoadingSkeleton = () => {
  return (
    <>
      <Skeleton
        variant="rectangular"
        width="100%"
        height={100}
        animation="wave"
      />
      <Skeleton
        variant="rectangular"
        width="100%"
        height={100}
        animation="wave"
      />
      <Skeleton
        variant="rectangular"
        width="100%"
        height={100}
        animation="wave"
      />
      <Skeleton
        variant="rectangular"
        width="100%"
        height={100}
        animation="wave"
      />
    </>
  );
};

export default LoadingSkeleton;
