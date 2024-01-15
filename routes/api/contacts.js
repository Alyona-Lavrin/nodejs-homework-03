import express from 'express';

import contactsController from '../../controllers/contacts.js';
import isEmptyBody from '../../middlewares/isEmptyBody.js';
import isValidId from '../../middlewares/isValidId.js';
import validateBody from '../../decorators/validateBody.js';
import { contactAddSchema, contactUpdateSchema, favoriteUpdateSchema } from '../../models/Contact.js';
import isEmptyFavorite from '../../middlewares/isEmptyFavorite.js';


const router = express.Router()

router.get('/', contactsController.getAll);

router.get('/:contactId', isValidId, contactsController.getById);

router.post('/', isEmptyBody, validateBody(contactAddSchema), contactsController.addNew);

router.delete('/:contactId', isValidId, contactsController.deleteById);

router.put('/:contactId', isValidId, isEmptyBody, validateBody(contactUpdateSchema), contactsController.updateById);

router.patch('/:contactId/favorite', isValidId, isEmptyFavorite, validateBody(favoriteUpdateSchema), contactsController.updateStatusContact);

export default router;