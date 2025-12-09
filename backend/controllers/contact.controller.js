import Contact from "../models/Contact.js";

// All
export const getAllContacts = async (_req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching contacts" });
  }
};

// Add
export const addContact = async (req, res) => {
  const { fullName, email, mobile, city } = req.body;
  try {
    const contact = new Contact({ fullName, email, mobile, city });
    await contact.save();
    res.status(201).json({ message: "Contact saved" });
  } catch (err) {
    res.status(500).json({ message: "Error saving contact" });
  }
};
