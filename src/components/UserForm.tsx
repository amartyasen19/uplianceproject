import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const UserForm: React.FC = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  const [isDirty, setIsDirty] = useState(false);

  // Warn the user if they try to leave with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isDirty) {
        event.preventDefault();
        event.returnValue = "You have unsaved changes. Do you really want to leave?";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  // Load saved form data from local storage
  useEffect(() => {
    const savedData = localStorage.getItem("userForm");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsDirty(true);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userId = formData.id || `USER-${Date.now()}`; // Auto-generate User ID
    const updatedForm = { ...formData, id: userId };

    localStorage.setItem("userForm", JSON.stringify(updatedForm)); // Save to Local Storage
    setFormData(updatedForm);
    setIsDirty(false);
    alert("Form saved successfully!");
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        padding: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
        boxShadow: 2,
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h5" textAlign="center" marginBottom={2}>
        User Data Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
          Save Data
        </Button>
      </form>
    </Box>
  );
};

export default UserForm;
