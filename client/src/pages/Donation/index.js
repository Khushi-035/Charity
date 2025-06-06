import React from "react";
import Header from "../../components/header/index.js";
import "./styles.css";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

/*****************************************************************************/

export default function Donation() {
  const centers = [
    {
      name: "Share At Door Step(SADS) India",
      image:
        "https://sadsindia.org/wp-content/themes/fusion/images/hero/happy_children_SADS_1920x800.jpg",
      website: "https://sadsindia.org/",
      description:
        "A non-profit organization working to make clothing donations accessible and impactful across India.",
    },
    {
      name: "Uday Foundation",
      website: "https://www.udayfoundation.org/delhi-donate-old-clothes/",
      image: "https://pbs.twimg.com/media/CoXpTGCWYAAAFX-.jpg",
      description:
        "Dedicated to helping underprivileged children and families through clothing donations and healthcare initiatives.",
    },
    {
      name: "AASHI Foundation",
      website: "https://ashiindia.org/",
      image:
        "https://www.streenews.com/wp-content/uploads/2018/06/Rupam-3-415x280.jpg",
      description:
        "Working towards creating a sustainable impact through clothing donations and community development.",
    },
    {
      name: "Goonj",
      website: "https://goonj.org/",
      image:
        "https://res.cloudinary.com/dwzmsvp7f/image/fetch/q_75,f_auto,w_1316/https%3A%2F%2Fmedia.insider.in%2Fimage%2Fupload%2Fc_crop%2Cg_custom%2Fv1638965871%2Fdkqfcubieyjmotnc3gum.jpg",
      description:
        "A leading organization transforming clothing waste into a resource for development work.",
    },
    {
      name: "Clothes Box Foundation",
      website: "https://www.clothesboxfoundation.org/",
      image:
        "https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/2017/10/25131609/251017_ClothesBoxFoundation_04.jpg",
      description:
        "Making clothing donations simple and impactful through their innovative box collection system.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="donation-page">
      <Header />
      <div className="donation-header">
        <h1>Donation Centers</h1>
        <p>
          Connect with these trusted organizations to make your donations count
        </p>
      </div>
      <motion.div
        className="centers"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {centers.map((center, index) => (
          <motion.a
            key={index}
            href={center.website}
            target="_blank"
            rel="noopener noreferrer"
            className="center-card"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="card-image-container">
              <img
                className="center-image"
                src={center.image}
                alt={center.name}
                loading="lazy"
              />
              <div className="card-overlay">
                <span className="visit-text">Visit Website</span>
              </div>
            </div>
            <div className="card-content">
              <h2 className="center-name">{center.name}</h2>
              <p className="center-description">{center.description}</p>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}
