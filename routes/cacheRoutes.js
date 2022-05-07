const {
  createCache,
  getCacheKeyData,
  getAllKeys,
  deleteKey,
  deleteAllKeys,
  updateKeyData,
} = require('../controllers/cacheControllers');

const router = require('express').Router();

router.route('/create-cache').post(createCache);
router.route('/cache/:key').get(getCacheKeyData).put(updateKeyData);
router.route('/get-keys').get(getAllKeys);
router.route('/delete/:key').delete(deleteKey);
router.route('/all').delete(deleteAllKeys);

module.exports = router;
