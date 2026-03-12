const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");
const router = express.Router();
const {
  getMember,
  createMember,
  getMembers,
  updateMember,
  deleteMember,
} = require("../controllers/membersController");

/**
 * @swagger
 * /api/members:
 *   get:
 *     summary: Get all members (with optional filtering by role and name)
 *     tags: [Members]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: Filter members by role
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Search members by name (case-insensitive)
 *     responses:
 *       200:
 *         description: List of members retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 *   post:
 *     summary: Create a new member
 *     tags: [Members]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: Member created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.route("/").get(verifyToken, getMembers).post(verifyToken, createMember);

/**
 * @swagger
 * /api/members/{id}:
 *   get:
 *     summary: Get a specific member by ID
 *     tags: [Members]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Member ID
 *     responses:
 *       200:
 *         description: Member retrieved successfully
 *       404:
 *         description: Member not found
 *       401:
 *         description: Unauthorized
 *   put:
 *     summary: Update a member
 *     tags: [Members]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Member ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Member updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Member not found
 *       401:
 *         description: Unauthorized
 *   delete:
 *     summary: Delete a member
 *     tags: [Members]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Member ID
 *     responses:
 *       200:
 *         description: Member deleted successfully
 *       404:
 *         description: Member not found
 *       401:
 *         description: Unauthorized
 */
router
  .route("/:id")
  .get(verifyToken, getMember)
  .put(verifyToken, updateMember)
  .delete(verifyToken, deleteMember);

module.exports = router;
