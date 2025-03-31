import SpeakerJudge from "../models/SpeakerJudge.js";

export const recommendSpeakersAndJudges = async (theme, budget, eventDate) => {
  try {
    // Find speakers and judges who match the criteria
    const recommendations = await SpeakerJudge.find({
      expertise: { $in: [theme] }, // Match the theme
      fee: { $lte: budget }, // Within the budget
      availability: { $in: [eventDate] }, // Available on the event date
    });

    return recommendations;
  } catch (error) {
    console.error("Error in recommending speakers and judges:", error);
    throw new Error("Failed to fetch recommendations.");
  }
};