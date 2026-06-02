const express = require("express");
const axios = require("axios");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
router.get("/", (req, res) => {
  res.send("AI Routes Working");
});

router.post("/workout-plan", authMiddleware, async (req, res) => {
  try {
    const { profile, days, focusArea, notes } = req.body;

    const prompt = `
Create a highly personalized workout plan.

User Profile:
Age: ${profile?.age}
Height: ${profile?.height} cm
Weight: ${profile?.weight} kg
Goal: ${profile?.goal}
Experience: ${profile?.experience}

Workout Preferences:
Workout days per week: ${days}
Focus area: ${focusArea}

Additional Notes:
${notes}

Requirements:
1. Best workout split
2. Weekly schedule
3. Exercises with sets and reps
4. Progressive overload advice
5. Cardio recommendation
6. Recovery advice
7. Nutrition guidance

Make the plan practical for a college engineering student.
`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }
    );

    const aiText =
      response.data.candidates[0].content.parts[0].text;

    res.json({
      plan: aiText,
    });
  } catch (error) {
  console.log("FULL AI ERROR:");
  console.log(JSON.stringify(error.response?.data, null, 2));

  res.status(error.response?.status || 500).json({
    message: "AI request failed",
    error: error.response?.data || error.message,
  });
}

});

module.exports = router;
``