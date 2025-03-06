const express = require('express');
const router = express.Router();
const Person = require("../modals/Person"); // Import Person model

// **POST Route - Create a New Person with Duplicate Email Handling**
router.post("/", async (req, res) => {
  try {
    const person = new Person(req.body);
    await person.save();
    console.log("Data saved successfully:", person);
    res.status(201).json(person);
  } catch (error) {
    console.error("Error saving person:", error);

    // Handle Duplicate Email Error
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email already exists. Please use a different email." });
    }

    res.status(400).json({ error: error.message });
  }
});

// **GET Route - Fetch All Persons**
router.get("/", async (req, res) => {
  try {
    const persons = await Person.find();
    res.status(200).json(persons);
  } catch (error) {
    res.status(500).json({ error: "Error fetching persons" });
  }
});

// **Parameterized GET Route - Fetch Persons by Role**
router.get("/:role", async (req, res) => {
  try {
    const { role } = req.params;

    // Validate role
    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ error: "Invalid role parameter" });
    }

    const persons = await Person.find({ role });
    res.status(200).json(persons);
  } catch (error) {
    res.status(500).json({ error: "Error fetching persons by role" });
  }
});


// **PUT Route - Update an Existing Person**
router.put("/:id", async (req, res) => {  // ✅ Fixed Route (Removed `/person`)
    try {
        const { id } = req.params;

        // Check if the person exists
        const person = await Person.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!person) {
            return res.status(404).json({ error: "Person not found" });
        }

        res.status(200).json(person);
    } catch (error) {
        console.error("Error updating person:", error);
        res.status(400).json({ error: error.message });
    }
});


// **DELETE Route - Remove a Person by ID**
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the person exists
        const person = await Person.findById(id);
        if (!person) {
            return res.status(404).json({ error: "Person not found" });
        }

        // Delete the person
        await Person.findByIdAndDelete(id);

        res.status(200).json({ message: "Person deleted successfully" });
    } catch (error) {
        console.error("Error deleting person:", error);
        res.status(400).json({ error: error.message });
    }
});
  

module.exports = router; // ✅ Corrected Export
