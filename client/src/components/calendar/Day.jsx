import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Day = ({ day, rowIdx, idx }) => {
  const [showTaskIcon, setShowTaskIcon] = useState(false);
  const handleHover = () => setShowTaskIcon(true);
  const handleUnhover = () => setShowTaskIcon(false);
  return (
    <Box
      className="gridItem"
      onMouseOver={handleHover}
      onMouseOut={handleUnhover}
    >
      <Box sx={{ position: "relative" }}>
        {rowIdx === 0 && (
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {day.format("ddd").toUpperCase()}
          </Typography>
        )}
        <Box sx={{ position: "absolute", top: "0.2rem", width: "100%" }}>
          {idx === 5 && rowIdx === 1 && (
            <Box
              sx={{
                backgroundColor: "#ffd9e6",
                px: "0.2rem",
                py: "0.1rem",
                borderRadius: "2px",
                fontSize: "0.8rem",
              }}
            >
              Meet with friends
            </Box>
          )}
          {idx === 3 && rowIdx === 2 && (
            <Box
              sx={{
                backgroundColor: "#fdf4b3",
                px: "0.2rem",
                py: "0.1rem",
                borderRadius: "2px",
                fontSize: "0.8rem",
              }}
            >
              Swimming
            </Box>
          )}
          {idx === 2 && rowIdx === 3 && (
            <Box
              sx={{
                backgroundColor: "#cad4fa",
                px: "0.2rem",
                py: "0.1rem",
                borderRadius: "2px",
                fontSize: "0.8rem",
              }}
            >
              Workout
            </Box>
          )}
        </Box>
        <div
          className={`${rowIdx === 0 ? "headerAlignment" : "dateAlignment"}`}
        >
          {showTaskIcon && (
            <Box
              mr="0.4rem"
              sx={{
                backgroundColor: "primary.main",
                borderRadius: "2px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "0.8rem",
                height: "0.8rem",
                padding: "0.1rem",
                position: "absolute",
                top: "6.7rem",
                right: "1rem",
              }}
            >
              <AddIcon sx={{ color: "white", fontSize: "1rem" }} />
            </Box>
          )}
          <Typography
            variant="caption"
            color="gray.fontMDark"
            sx={{ position: "absolute", top: "6.6rem" }}
          >
            {day.format("DD")}
          </Typography>
        </div>
      </Box>
    </Box>
  );
};

export default Day;
