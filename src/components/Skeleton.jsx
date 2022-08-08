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
export const BlogSkeleton = () => {
  return (
    <>
      <Skeleton variant="text" width={"20%"} />
      <Skeleton variant="text" width={"100%"} />
      <Skeleton variant="text" width={"100%"} />
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton
        variant="rectangular"
        width="100%"
        height={100}
        animation="wave"
      />
    </>
  );
};
export const ImageSkeleton = () => {
  return (
    <Skeleton
      variant="rectangular"
      width="100%"
      height={100}
      animation="wave"
    />
  );
};
export default LoadingSkeleton;
