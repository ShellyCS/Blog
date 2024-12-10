import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import S3FileUpload from "react-s3";
import { Buffer } from "buffer"; // Add Buffer polyfill
window.Buffer = Buffer; // Make Buffer available globally

// Make sure your environment variables are set securely, e.g., in .env file

const config = {};

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");
  const navigate = useNavigate();
  console.log(process.env);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadToS3 = async () => {
    if (file) {
      try {
        const data = await S3FileUpload.uploadFile(file, config); // Upload image to S3
        console.log("File uploaded successfully:", data);
        return data.location; // URL of the uploaded image
      } catch (err) {
        console.error("Error uploading file to S3:", err);
        return null;
      }
    }
    return null;
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Upload the image and get the image URL
    const imgUrl = await uploadToS3();

    try {
      if (state) {
        // If the post exists, update the post with the image URL
        await axios.put(`/posts/${state.id}`, {
          title,
          desc: value,
          cat,
          img: imgUrl || "", // If no image, set img to an empty string
        });
      } else {
        // If the post is new, create a new post with the image URL
        await axios.post(`/posts/`, {
          title,
          desc: value,
          cat,
          img: imgUrl || "", // If no image, set img to an empty string
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        });
      }

      // After success, navigate to the homepage or another page
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={handleFileChange}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            {/* <button>Save as a draft</button> */}
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          {/* Category radio buttons */}
          {["art", "science", "technology", "cinema", "design", "food"].map(
            (category) => (
              <div className="cat" key={category}>
                <input
                  type="radio"
                  checked={cat === category}
                  name="cat"
                  value={category}
                  id={category}
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </label>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Write;
