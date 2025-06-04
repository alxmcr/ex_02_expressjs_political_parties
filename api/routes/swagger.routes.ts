import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../../swagger.json";

const router = Router();

router.use(
  "/",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    customCss: ".swagger-ui .topbar { display: none }",
    customfavIcon: "/favicon.ico",
    swaggerOptions: {
      persistAuthorization: true,
    },
  })
);

export default router;
