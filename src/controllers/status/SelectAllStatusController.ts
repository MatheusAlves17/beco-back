import { Request, Response } from "express";
import { SelectStatusService } from "../../services";

class SelectAllStatusController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;

        const selectStatusService = new SelectStatusService();
        const status = await selectStatusService.execute(user_id);

        return res.json(status);
    }
};

export { SelectAllStatusController };