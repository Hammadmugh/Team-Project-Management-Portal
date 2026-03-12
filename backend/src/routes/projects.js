const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");
const router = express.Router();
const {
  getProject,
  createProject,
  getProjects,
  updateProject,
  deleteProject,
  addTeamMember,
  removeTeamMember,
  getStats,
} = require("../controllers/projectsController");

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects (with optional filtering by status and title)
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, completed]
 *         description: Filter projects by status
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Search projects by title (case-insensitive)
 *     responses:
 *       200:
 *         description: List of projects retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               techStack:
 *                 type: array
 *                 items:
 *                   type: string
 *               status:
 *                 type: string
 *                 enum: [active, completed]
 *     responses:
 *       201:
 *         description: Project created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.route("/").get(verifyToken, getProjects).post(verifyToken, createProject);

/**
 * @swagger
 * /api/projects/stats:
 *   get:
 *     summary: Get project statistics (total, active, completed)
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Stats retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalProjects:
 *                       type: number
 *                     activeProjects:
 *                       type: number
 *                     completedProjects:
 *                       type: number
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.route("/stats").get(verifyToken, getStats);

/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Get a specific project by ID
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Project retrieved successfully
 *       404:
 *         description: Project not found
 *       401:
 *         description: Unauthorized
 *   put:
 *     summary: Update a project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               techStack:
 *                 type: array
 *                 items:
 *                   type: string
 *               status:
 *                 type: string
 *                 enum: [active, completed]
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Project not found
 *       401:
 *         description: Unauthorized
 *   delete:
 *     summary: Delete a project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       404:
 *         description: Project not found
 *       401:
 *         description: Unauthorized
 */
router
  .route("/:id")
  .get(verifyToken, getProject)
  .put(verifyToken, updateProject)
  .delete(verifyToken, deleteProject);

/**
 * @swagger
 * /api/projects/{id}/team-members:
 *   post:
 *     summary: Add a team member to a project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - memberId
 *             properties:
 *               memberId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Team member added successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Project or member not found
 *       401:
 *         description: Unauthorized
 *   delete:
 *     summary: Remove a team member from a project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - memberId
 *             properties:
 *               memberId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Team member removed successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Project not found
 *       401:
 *         description: Unauthorized
 */
router
  .route("/:id/team-members")
  .post(verifyToken, addTeamMember)
  .delete(verifyToken, removeTeamMember);

module.exports = router;