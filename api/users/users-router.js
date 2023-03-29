const express = require("express");
const postsModel = require("../posts/posts-model");
const middleWare = require("../middleware/middleware");
const usersModel = require("../users/users-model");

const router = express.Router();
router.use(express.json());
router.get("/", async (req, res) => {
  try {
    const userData = await usersModel.get();
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/:id", middleWare.validateUserId, (req, res) => {
  try {
    // USER NESNESİNİ DÖNDÜRÜN
    // user id yi getirmek için bir ara yazılım gereklidir
    const user = req.userIdData;
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "get:id de hata oluştu" });
  }
});

router.post("/", middleWare.validateUser, async (req, res) => {
  // YENİ OLUŞTURULAN USER NESNESİNİ DÖNDÜRÜN
  // istek gövdesini doğrulamak için ara yazılım gereklidir.
  try {
    const newUser = await usersModel.insert({ name: req.name });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "/api/users post yaparken hata oluştu" });
  }
});

router.put(
  "/:id",
  middleWare.validateUserId,
  middleWare.validateUser,
  async (req, res) => {
    // YENİ GÜNCELLENEN USER NESNESİNİ DÖNDÜRÜN
    // user id yi doğrulayan ara yazılım gereklidir
    // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.
    try {
      const name = req.name;
      const id = req.userid;
      const updatedUser = await usersModel.update(id, { name: name });
      res.status(200).json(updatedUser);
    } catch (error) {
      res
        .status(500)
        .json({ message: "/api/users/:id put yaparken hata oluştu" });
    }
  }
);

router.delete("/:id", middleWare.validateUserId, async (req, res) => {
  // SON SİLİNEN USER NESNESİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  try {
    const user = req.userIdData;
    const id = req.userid;
    await usersModel.remove(id);
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "/api/users/:id delete yaparken hata oluştu" });
  }
});

router.get("/:id/posts", middleWare.validateUserId, async (req, res) => {
  // USER POSTLARINI İÇEREN BİR DİZİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  try {
    const id = req.userid;
    const posts = await usersModel.getUserPosts(id);
    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "/api/users/:id/posts get yaparken hata oluştu" });
  }
});

router.post(
  "/:id/posts",
  middleWare.validateUserId,
  middleWare.validatePost,
  async (req, res) => {
    // YENİ OLUŞTURULAN KULLANICI NESNESİNİ DÖNDÜRÜN
    // user id yi doğrulayan bir ara yazılım gereklidir.
    // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.
    try {
      const id = req.userid;
      const text = req.text;
      const newPost = await postsModel.insert({ user_id: id, text: text });
      res.status(200).json(newPost);
    } catch (error) {
      res
        .status(500)
        .json({ message: "/api/users/:id/posts post yaparken hata oluştu" });
    }
  }
);

// routerı dışa aktarmayı unutmayın
module.exports = router;
