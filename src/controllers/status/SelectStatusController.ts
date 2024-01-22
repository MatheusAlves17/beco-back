import { Request, Response } from "express";
import { SelectStatusService } from "../../services";

class SelectStatusController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;
        const status_id = req.query.status_id as string;

        const selectStatusService = new SelectStatusService();
        const status = await selectStatusService.execute(user_id, status_id);

        return res.json(status);
    }
};

export { SelectStatusController };