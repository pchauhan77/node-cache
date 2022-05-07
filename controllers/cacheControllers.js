const Cache = require('../models/Cache');
const crypto = require('crypto');
const NodeCache = require('node-cache');

const myCache = new NodeCache({ stdTTL: 100 });
// create a cache;
exports.createCache = async (req, res) => {
  const { data, key } = req.body;
  myCache.set(key, data, 10000);

  await Cache.create({ data, key });

  res.status(201).send('Cache data created');
};

// returns data for a given key

exports.getCacheKeyData = (req, res) => {
  const { key } = req.params;
  const value = myCache.get(key);

  if (value === undefined || null) {
    console.log('Cache miss');

    const randomString = crypto.randomBytes(20).toString('hex');
    myCache.set(req.params.key, randomString);
    res.status(200).json(randomString);
  } else {
    console.log('Cache Hit');
    res.status(200).json(value);
  }
};

// returns all stored keys in the cache

exports.getAllKeys = (req, res) => {
  const mykeys = myCache.keys();
  res.status(200).json(mykeys);
};

// removes a given key from the cache

exports.deleteKey = (req, res) => {
  const { key } = req.params;
  if (!key) {
    res.status(400).send('Key not found');
  }
  myCache.del(key);
  res.status(200).send(`Key ${key} deleted`);
};

// deleteb all the keys

exports.deleteAllKeys = (req, res) => {
  myCache.flushAll();
  res.status(200).send(' All Keys deleted');
};

// creates and updates the data for a given key

exports.updateKeyData = async (req, res) => {
  const { key } = req.params;
  const { data } = req.body;
  if (!key) {
    res.status(400).send('Key not found');
  }
  myCache.set(key, data);
  const updatecachedData = await Cache.findOneAndUpdate(
    key,
    { data },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json(updatecachedData);
};
