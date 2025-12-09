import Project from "../models/Project.js";

// All
export const getAllProjects = async (_req, res) => {
  try {
    const projects = await Project.find();

    const formatted = projects.map((p) => {
      const projectObj = p.toObject();
      const image = p.image;
      if (image?.data && image?.contentType) {
        const base64Image = image.data.toString("base64");
        projectObj.imageUrl = `data:${image.contentType};base64,${base64Image}`;
      } else {
        projectObj.imageUrl = null;
      }
      return projectObj;
    });

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching projects" });
  }
};

// Get by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const { data, contentType } = project.image || {};
    const projectObj = project.toObject();

    if (data) {
      projectObj.image = {
        contentType,
        base64: data.toString("base64"),
      };
    }

    res.json(projectObj);
  } catch {
    res.status(500).json({ message: "Error fetching project" });
  }
};

// Add
export const addProject = async (req, res) => {
  try {
    const { projectName, description, location, category } = req.body;

    if (!projectName || !description || !location || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const { buffer, mimetype } = req.file;

    const project = new Project({
      projectName,
      description,
      location,
      category,
      image: { data: buffer, contentType: mimetype },
    });

    await project.save();
    res.status(201).json({ message: "Project added", id: project._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding project" });
  }
};

// Update
export const updateProject = async (req, res) => {
  try {
    const { projectName, description, location, category } = req.body;
    const updates = {};

    if (projectName) updates.projectName = projectName;
    if (description) updates.description = description;
    if (location) updates.location = location;
    if (category) updates.category = category;

    if (req.file) {
      const { buffer, mimetype } = req.file;
      updates.image = { data: buffer, contentType: mimetype };
    }

    if (!Object.keys(updates).length) {
      return res.status(400).json({ message: "No fields provided to update" });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project updated", project: updatedProject });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating project" });
  }
};

// Delete
export const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ message: "Project deleted" });
  } catch {
    res.status(500).json({ message: "Error deleting project" });
  }
};
