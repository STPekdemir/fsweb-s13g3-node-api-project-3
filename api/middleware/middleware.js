const { getById } = require("../users/users-model");

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);

  next();
}

async function validateUserId(req, res, next) {
  try {
    const { id } = req.params;
    const usersId = await getById(id);
    if (usersId) {
      req.userid = id;
      req.userIdData = usersId;
      next();
    } else {
      res.status(404).json({ message: "kullanıcı bulunamadı" });
    }
  } catch (error) {
    res.status(500).json({ message: "Middelware hata validetuserID" });
    next(error);
  }
}

function validateUser(req, res, next) {
  try {
    const name = req.body.name;
    if (name) {
      req.name = name;
      next();
    } else {
      res.status(400).json({ message: "gerekli name alanı eksik" });
    }
  } catch (error) {
    res.status(500).json({ message: "Middelware hata validetuser" });
    next(error);
  }
}

function validatePost(req, res, next) {
  try {
    const text = req.body.text;
    if (text) {
      req.text = text;
      next();
    } else {
      res.status(400).json({ message: "gerekli text alanı eksik" });
    }
  } catch (error) {
    res.status(500).json({ message: "hata middelware validatepost" });
    next(error);
  }
}

module.exports = {
  validatePost,
  validateUser,
  validateUserId,
  logger,
};
