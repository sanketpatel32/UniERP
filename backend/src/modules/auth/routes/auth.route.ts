import { Router } from "express";
import {
	adminOnlyCheck,
	login,
	logout,
	me,
	refresh,
	signupCompany,
} from "../controllers/auth.controller";
import { requireAuth, requireRoles } from "../../../middlewares/auth.middleware";
import { validate } from "../../../middlewares/validate.middleware";
import { loginBodySchema, signupCompanyBodySchema } from "../schemas/auth.schema";

const router = Router();

router.post("/signup/company", validate({ body: signupCompanyBodySchema }), signupCompany);
router.post("/login", validate({ body: loginBodySchema }), login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.get("/me", requireAuth, me);
router.get("/admin-check", requireAuth, requireRoles(["company_admin"]), adminOnlyCheck);

export default router;
