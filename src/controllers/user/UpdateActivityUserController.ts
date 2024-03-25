import { Request, Response } from "express";
import { UpdateActivityUserService } from "../../services";

class UpdateActivityUserController {
    async handle(req: Request, res: Response) {
        const isAdmin = req.query.isAdmin as string;
        const { user_id, active } = req.body;

        const updateActivityUserService = new UpdateActivityUserService();
        const user = await updateActivityUserService.execute(isAdmin, { user_id, active });

        return res.json(user);
    }
};

export { UpdateActivityUserController };