import express from "express";
import contacts from "../../controllers/contacts.js";
import isValidId from "../../middlewares/isValidId.js";
const {
  validateBody,
  addSchema,
  favoriteSchema,
} = require("../../middlewares/isValidBody.js");

const authenticate = require("../../middlewares/authenticate");

const router = express.Router();

router.get("/", authenticate, contacts.listContacts);
router.get("/:contactId", authenticate, isValidId, contacts.getContactById);
router.post("/", authenticate, validateBody(addSchema), contacts.addContact);
router.delete("/:contactId", authenticate, isValidId, contacts.removeContact);
router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(addSchema),
  contacts.updateContact
);
router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(favoriteSchema),
  contacts.updateStatusContact
);

export default router;