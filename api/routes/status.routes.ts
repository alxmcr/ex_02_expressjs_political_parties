import { Router } from "express";

const router = Router();

router.get("/ping", (req, res) => {
  res.json({
    status: "Pong!",
  });
});

export default router;
