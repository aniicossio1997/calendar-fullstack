import React from "react";
import { Box } from "@chakra-ui/react";
import { Grid } from "react-loader-spinner";

const LoaderSpinner = () => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          margin: "10% 0%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid
          ariaLabel="loading-indicator"
          color="#9AC9FB"
          height={"100%"}
          width={100}
        />
      </Box>
    </>
  );
};

export default LoaderSpinner;
