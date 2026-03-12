const ProjectModel = require("../models/projectModel");
const MemberModel = require("../models/memberModel");
const { constants } = require("../middlewares/constants");

const createProject = async (req, res, next) => {
  try {
    const { title, description, techStack, status } = req.body;
    if (!title || !description) {
      res.status(constants.VALIDATION_ERROR);
      throw new Error("Project title and description are required");
    }
    const project = new ProjectModel({ title, description, techStack: techStack || [], createdBy: req.user.id });
    await project.save();
    await project.populate("createdBy", "name email role");
    await project.populate("teamMembers");
    res.status(201).json({ success: true, data: project, message: "Project created successfully" });
  } catch (err) {
    next(err);
  }
};

const getProject = async (req, res, next) => {
  try {
    const project = await ProjectModel.findById(req.params.id)
      .populate("createdBy", "name email role")
      .populate("teamMembers");

    if (!project) {
      res.status(constants.NOT_FOUND);
      throw new Error("Project not found");
    }

    res.status(200).json({ success: true, data: project, message: "Project retrieved successfully" });
  } catch (err) {
    next(err);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const { title, description, techStack, status } = req.body;

    // Allow partial updates - at least one field must be provided
    if (!title && !description && !techStack && !status) {
      res.status(constants.VALIDATION_ERROR);
      throw new Error("At least one field (title, description, techStack, or status) is required for update");
    }

    // Verify project ownership
    let project = await ProjectModel.findById(req.params.id);
    if (!project) {
      res.status(constants.NOT_FOUND);
      throw new Error("Project not found");
    }
    
    if (project.createdBy.toString() !== req.user.id) {
      res.status(constants.FORBIDDEN);
      throw new Error("You are not authorized to update this project");
    }

    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (techStack) updateData.techStack = techStack;
    if (status) updateData.status = status;

    project = await ProjectModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    )
    .populate("createdBy", "name email role")
    .populate("teamMembers");

    res.status(200).json({ success: true, data: project, message: "Project updated successfully" });
  } catch (err) {
    next(err);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const project = await ProjectModel.findById(req.params.id);

    if (!project) {
      res.status(constants.NOT_FOUND);
      throw new Error("Project not found");
    }
    
    // Verify project ownership
    if (project.createdBy.toString() !== req.user.id) {
      res.status(constants.FORBIDDEN);
      throw new Error("You are not authorized to delete this project");
    }

    await ProjectModel.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, data: project, message: "Project deleted successfully" });
  } catch (err) {
    next(err);
  }
};

const getProjects = async (req, res, next) => {
  try {
    const { status, title } = req.query;
    let query = { createdBy: req.user.id };
    
    if (status) {
      query.status = status;
    }
    
    if (title) {
      query.title = { $regex: title, $options: "i" };
    }
    
    const projects = await ProjectModel.find(query)
      .populate("createdBy", "name email role")
      .populate("teamMembers");
    
    res.status(200).json({ success: true, data: projects, message: "Projects retrieved successfully" });
  } catch (err) {
    next(err);
  }
};

const addTeamMember = async (req, res, next) => {
  try {
    const { memberId } = req.body;
    
    if (!memberId) {
      res.status(constants.VALIDATION_ERROR);
      throw new Error("Member ID is required");
    }

    // Verify member exists
    const member = await MemberModel.findById(memberId);
    if (!member) {
      res.status(constants.NOT_FOUND);
      throw new Error("Member not found");
    }

    const project = await ProjectModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { teamMembers: memberId } },
      { new: true }
    )
    .populate("createdBy", "name email role")
    .populate("teamMembers");

    if (!project) {
      res.status(constants.NOT_FOUND);
      throw new Error("Project not found");
    }

    res.status(200).json({ success: true, data: project, message: "Team member added successfully" });
  } catch (err) {
    next(err);
  }
};

const removeTeamMember = async (req, res, next) => {
  try {
    const { memberId } = req.body;
    
    if (!memberId) {
      res.status(constants.VALIDATION_ERROR);
      throw new Error("Member ID is required");
    }

    const project = await ProjectModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { teamMembers: memberId } },
      { new: true }
    )
    .populate("createdBy", "name email role")
    .populate("teamMembers");

    if (!project) {
      res.status(constants.NOT_FOUND);
      throw new Error("Project not found");
    }

    res.status(200).json({ success: true, data: project, message: "Team member removed successfully" });
  } catch (err) {
    next(err);
  }
};

const getStats = async (req, res, next) => {
  try {
    const totalProjects = await ProjectModel.countDocuments({ createdBy: req.user.id });
    const activeProjects = await ProjectModel.countDocuments({ createdBy: req.user.id, status: "active" });
    const completedProjects = await ProjectModel.countDocuments({ createdBy: req.user.id, status: "completed" });

    res.status(200).json({
      success: true,
      data: {
        totalProjects,
        activeProjects,
        completedProjects,
      },
      message: "Stats retrieved successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { 
  getProject, 
  createProject, 
  getProjects, 
  updateProject, 
  deleteProject,
  addTeamMember,
  removeTeamMember,
  getStats
};