import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box, Typography } from "@mui/material";

const RichTextEditor: React.FC = () => {
  const [editorContent, setEditorContent] = useState("");

  // Load saved user data from local storage
  useEffect(() => {
    const savedUserData = localStorage.getItem("userForm");
    const savedRichText = localStorage.getItem("richTextData");

    if (savedRichText) {
      setEditorContent(savedRichText);
    } else if (savedUserData) {
      const userData = JSON.parse(savedUserData);
      const formattedData = `
        <h2>User Profile</h2>
        <p><strong>Name:</strong> ${userData.name || "N/A"}</p>
        <p><strong>Address:</strong> ${userData.address || "N/A"}</p>
        <p><strong>Email:</strong> ${userData.email || "N/A"}</p>
        <p><strong>Phone:</strong> ${userData.phone || "N/A"}</p>
      `;
      setEditorContent(formattedData);
    }
  }, []);

  // Save editor content to local storage
  useEffect(() => {
    if (editorContent.trim()) {
      localStorage.setItem("richTextData", editorContent);
    }
  }, [editorContent]);

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        padding: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
        boxShadow: 2,
        backgroundColor: "#fff",
        marginTop: 3,
      }}
    >
      <Typography variant="h5" textAlign="center" marginBottom={2}>
        Rich Text Editor
      </Typography>
      <ReactQuill
        value={editorContent}
        onChange={setEditorContent}
        theme="snow"
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["clean"],
          ],
        }}
      />
    </Box>
  );
};

export default RichTextEditor;
