import Client from "../models/Client.js";

const parseBase64Image = (dataUrl = "") => {
  const m = dataUrl.match(/^data:(.+);base64,(.+)$/);
  if (!m) return null;
  return { contentType: m[1], buffer: Buffer.from(m[2], "base64") };
};

// All
export const getAllClients = async (_req, res) => {

  
  try {
    const docs = await Client.find().lean();

    const clients = docs.map(({ image, ...rest }) => {
      let imageUrl = null;

      if (image?.data && image?.contentType) {
        const buffer = Buffer.isBuffer(image.data)
          ? image.data
          : Buffer.from(image.data?.buffer || image.data);

        imageUrl = `data:${image.contentType};base64,${buffer.toString(
          "base64"
        )}`;
      }

      return { ...rest, imageUrl };
    });

    res.json(clients);
  } catch (err) {
    console.error("Error fetching clients ->", err);
    res.status(500).json({ message: "Error fetching clients" });
  }
};

// Add
export const addClient = async (req, res) => {
  try {
   
    
    const { name, designation, description, image } = req.body;
    if (!name || !designation || !description || !image) {
      return res
        .status(400)
        .json({
          message: "name, designation, description and image are required",
        });
    }

    const parsed = parseBase64Image(image);
    if (!parsed) return res.status(400).json({ message: "Invalid image data" });

    const client = await Client.create({
      name,
      designation,
      description,
      image: { data: parsed.buffer, contentType: parsed.contentType },
    });

    res.status(201).json({ message: "Client added", id: client._id });
  } catch (err) {
    console.error("Error adding client ->", err);
    res.status(500).json({ message: "Error adding client" });
  }
};




// Update
export const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, designation, description, image } = req.body;

    const update = {};
    if (name) update.name = name;
    if (designation) update.designation = designation;
    if (description) update.description = description;

    if (image) {
      const parsed = parseBase64Image(image);
      if (!parsed)
        return res.status(400).json({ message: "Invalid image data" });
      update.image = { data: parsed.buffer, contentType: parsed.contentType };
    }

    const updated = await Client.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Client not found" });

    res.json({ message: "Client updated", id: updated._id });
  } catch (err) {
    console.error("Error updating client ->", err);
    res.status(500).json({ message: "Error updating client" });
  }
};

// Delete
export const deleteClient = async (req, res) => {
  try {
    const deleted = await Client.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Client not found" });
    res.json({ message: "Client deleted", id: deleted._id });
  } catch {
    res.status(500).json({ message: "Error deleting client" });
  }
};
