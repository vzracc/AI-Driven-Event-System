import mongoose from "mongoose";
import dotenv from "dotenv";
import SpeakerJudge from "../models/SpeakerJudge.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const seedSpeakersAndJudges = async () => {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    const sampleData = [
      {
        name: "Dr. Alice Johnson",
        expertise: ["Technology", "AI", "Machine Learning"],
        availability: [new Date("2025-04-15"), new Date("2025-05-10")],
        fee: 3000,
        type: "Speaker",
      },
      {
        name: "Prof. John Smith",
        expertise: ["Leadership", "Management"],
        availability: [new Date("2025-04-20"), new Date("2025-06-01")],
        fee: 4000,
        type: "Speaker",
      },
      {
        name: "Ms. Emily Davis",
        expertise: ["Marketing", "Branding"],
        availability: [new Date("2025-04-25"), new Date("2025-05-15")],
        fee: 2500,
        type: "Speaker",
      },
      {
        name: "Mr. Michael Brown",
        expertise: ["Technology", "Cybersecurity"],
        availability: [new Date("2025-04-18"), new Date("2025-05-20")],
        fee: 3500,
        type: "Judge",
      },
      {
        name: "Dr. Sarah Wilson",
        expertise: ["Healthcare", "Innovation"],
        availability: [new Date("2025-04-22"), new Date("2025-05-30")],
        fee: 5000,
        type: "Judge",
      },
      {
        name: "Mr. David Lee",
        expertise: ["Finance", "Economics"],
        availability: [new Date("2025-04-28"), new Date("2025-06-10")],
        fee: 4500,
        type: "Speaker",
      },
      {
        name: "Ms. Olivia Martinez",
        expertise: ["Education", "Policy"],
        availability: [new Date("2025-04-12"), new Date("2025-05-25")],
        fee: 3200,
        type: "Judge",
      },
      {
        name: "Dr. Ethan Taylor",
        expertise: ["Science", "Research"],
        availability: [new Date("2025-04-30"), new Date("2025-06-15")],
        fee: 3800,
        type: "Speaker",
      },
      {
        name: "Ms. Sophia Anderson",
        expertise: ["Art", "Design"],
        availability: [new Date("2025-05-05"), new Date("2025-06-20")],
        fee: 2700,
        type: "Judge",
      },
      {
        name: "Mr. Liam White",
        expertise: ["Technology", "Startups"],
        availability: [new Date("2025-04-17"), new Date("2025-05-22")],
        fee: 4000,
        type: "Speaker",
      },
    ];

    // Clear existing data
    await SpeakerJudge.deleteMany();

    // Insert sample data
    await SpeakerJudge.insertMany(sampleData);

    console.log("Sample speakers and judges added successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding speakers and judges:", error);
    process.exit(1);
  }
};

seedSpeakersAndJudges();