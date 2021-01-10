const express = require('express');
const router = express.Router();

const {getAllStudyContents, createNewStudyContent, getContentById, updateStudyContent, addChapterToSyllabus, updateChapter, deleteChapter} = require('../controllers/studyContent');

router.get('/', getAllStudyContents);
router.post('/', createNewStudyContent);
router.get('/:contentId', getContentById);
router.patch('/:contentId', updateStudyContent);
router.post('/:contentId/syllabus', addChapterToSyllabus);
router.patch('/:contentId/syllabus/:chapterId', updateChapter);
router.delete('/:contentId/syllabus/:chapterId', deleteChapter);

module.exports = router;