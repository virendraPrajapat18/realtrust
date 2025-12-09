import Subscriber from "../models/Subscriber.js";

// Get
export const getAllSubscribers = async (_req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching subscribers" });
  }
};

// Add
export const addSubscriber = async (req, res) => {
  const { email } = req.body;
  try {
    const exists = await Subscriber.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "Already subscribed" });
    }
    const subscriber = new Subscriber({ email });
    await subscriber.save();
    res.status(201).json({ message: "Subscribed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error subscribing" });
  }
};
