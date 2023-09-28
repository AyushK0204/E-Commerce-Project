import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";

const About = () => {
  const visitGithub = () => {
    window.location = "https://github.com/AyushK0204";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dkrqdozxm/image/upload/v1695828661/avatars/githubImg_llpfjv.png"
              alt="Founder"
            />
            <Typography>Ayush Kumar</Typography>
            <Button onClick={visitGithub} color="primary">
              Visit GitHub
            </Button>
            <span>This is a sample wesbite made by me.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
