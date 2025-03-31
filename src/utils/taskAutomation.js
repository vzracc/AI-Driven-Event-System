import axios from "axios";
import dotenv from "dotenv";
import Team from "../models/Team.js"; // Adjust the import path as necessary
dotenv.config();

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined in the environment variables.");
}

export const generateTaskAssignment = async (taskDescription) => {
    try {
        const possibleTeams = [
           
            "Technical Team",
            "PR/Marketing Team",
            "Creative Team",
            "Sponsorship Team",
        ];

        const response = await axios.post(
            `${GEMINI_API_URL}?key=${API_KEY}`,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: `You must assign the task to the single most suitable team from the following list: ${possibleTeams.join(", ")}. Do not suggest multiple teams or collaboration. Provide only one team name that is the best fit for the task. Task: ${taskDescription}`
                            }
                        ]
                    }
                ]
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        console.log("Full AI Response:", JSON.stringify(response?.data, null, 2));

        // Extract the response text
        const responseParts = response?.data?.candidates?.[0]?.content?.parts;
        if (!responseParts || responseParts.length === 0) {
            throw new Error("Unexpected API response structure: No content parts found.");
        }

        const responseText = responseParts.map(part => part.text).join(" ").trim();
        console.log("Extracted Response Text:", responseText);

        if (!responseText) {
            throw new Error("Unexpected API response structure: Response text is empty.");
        }

        // Find the first matching team name in the response text
        const teamName = possibleTeams.find((team) => responseText.includes(team));

        if (!teamName) {
            throw new Error("No suitable team name found in the AI response.");
        }

        console.log("Extracted Team Name:", teamName);

        // Check if the team already exists in the database
        let team = await Team.findOne({ name: teamName });
        if (!team) {
            // If the team doesn't exist, create a new one
            team = new Team({ name: teamName, community: "67e68f1f61b7df187ae3d7ea", members: [] }); // Adjust fields as needed
            await team.save();
            console.log(`Created new team: ${teamName}`);
        }

        return team._id;
    } catch (error) {
        console.error("Error in AI Task Assignment:", error.response?.data || error.message);
        return null;
    }
};