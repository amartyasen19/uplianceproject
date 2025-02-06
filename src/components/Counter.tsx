import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { Button, Box, Stack, Typography } from "@mui/material";

const Counter: React.FC = () => {
  const [count, setCount] = useState(0);

  // Animation for background height change
  const bgAnimation = useSpring({
    height: `${Math.min(count * 5, 100)}%`, // Limits max height to 100%
    config: { tension: 200, friction: 20 }, // Bezier-like curve animation
  });

  return (
    <Box sx={{ position: "relative", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <animated.div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          background: "linear-gradient(to top, #3498db, #ffffff)",
          ...bgAnimation,
        }}
      />
      
      <Stack spacing={2} alignItems="center" sx={{ zIndex: 1 }}>
        <Typography variant="h4">Counter: {count}</Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="primary" onClick={() => setCount(count + 1)}>
            Increment
          </Button>
          <Button variant="contained" color="secondary" onClick={() => setCount(count - 1)}>
            Decrement
          </Button>
          <Button variant="contained" color="error" onClick={() => setCount(0)}>
            Reset
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Counter;
