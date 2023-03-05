import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Day = ({ day, rowIdx }) => {
  const [showTaskIcon, setShowTaskIcon] = useState(false);
  const handleHover = () => setShowTaskIcon(true);
  const handleUnhover = () => setShowTaskIcon(false);
  return (
    <Box
      className="gridItem"
      onMouseOver={handleHover}
      onMouseOut={handleUnhover}
      onMouse
    >
      {rowIdx === 0 && (
        <Typography variant="caption">
          {day.format("ddd").toUpperCase()}
        </Typography>
      )}
      <div className={`${rowIdx === 0 ? "headerAlignment" : "dateAlignment"}`}>
        <Stack direction={"row"} alignItems="center">
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
              }}
            >
              <AddIcon sx={{ color: "white", fontSize: "1rem" }} />
            </Box>
          )}
          <Typography variant="caption" color="gray.fontMDark">
            {day.format("DD")}
          </Typography>
        </Stack>
      </div>
    </Box>
  );
};

export default Day;
