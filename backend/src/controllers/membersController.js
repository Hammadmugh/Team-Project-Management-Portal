const MemberModel = require("../models/memberModel");
const { constants } = require("../middlewares/constants");

const createMember = async (req, res, next) => {
  try {
    const { name, email, role } = req.body;
    if (!name || !role || !email) {
      res.status(constants.VALIDATION_ERROR);
      throw new Error("All fields are required to create member");
    }
    const member = new MemberModel({ name, email, role, createdBy: req.user.id });
    await member.save();
    res.status(201).json({ success: true, data: member, message: "Member created successfully" });
  } catch (err) {
    next(err);
  }
};

const getMember = async (req, res, next) => {
  try {
    const member = await MemberModel.findById(req.params.id).populate("createdBy", "name email role");

    if (!member) {
      res.status(constants.NOT_FOUND);
      throw new Error("Member not found");
    }

    res.status(200).json({ success: true, data: member, message: "Member retrieved successfully" });
  } catch (err) {
    next(err);
  }
};

const updateMember = async (req, res, next) => {
  try {
    const { name, email, role } = req.body;

    // Allow partial updates - at least one field must be provided
    if (!name && !email && !role) {
      res.status(constants.VALIDATION_ERROR);
      throw new Error("At least one field (name, email, or role) is required for update");
    }

    // Verify member ownership
    let member = await MemberModel.findById(req.params.id);
    if (!member) {
      res.status(constants.NOT_FOUND);
      throw new Error("Member not found");
    }
    
    if (member.createdBy.toString() !== req.user.id) {
      res.status(constants.FORBIDDEN);
      throw new Error("You are not authorized to update this member");
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (role) updateData.role = role;

    member = await MemberModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json({ success: true, data: member, message: "Member updated successfully" });
  } catch (err) {
    next(err);
  }
};

const deleteMember = async (req, res, next) => {
  try {
    const member = await MemberModel.findById(req.params.id);

    if (!member) {
      res.status(constants.NOT_FOUND);
      throw new Error("Member not found");
    }
    
    // Verify member ownership
    if (member.createdBy.toString() !== req.user.id) {
      res.status(constants.FORBIDDEN);
      throw new Error("You are not authorized to delete this member");
    }

    await MemberModel.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, data: member, message: "Member deleted successfully" });
  } catch (err) {
    next(err);
  }
};

const getMembers = async (req, res, next) => {
  try {
    const { role, name } = req.query;
    let query = {createdBy: req.user.id};
    
    if (role) {
      query.role = role;
    }
    
    if (name) {
      query.name = { $regex: name, $options: "i" };
    }
    
    const members = await MemberModel.find(query);
    
    res.status(200).json({ success: true, data: members, message: "Members retrieved successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = { getMember, createMember, getMembers, updateMember, deleteMember };