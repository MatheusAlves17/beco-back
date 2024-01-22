import { Request, Response } from "express";
import { UpdateStatusService } from "../../services";

class UpdateStatusController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;
        const { status_id, name } = req.body;

        const updateStatusService = new UpdateStatusService();
        const status = updateStatusService.execute(user_id, { status_id, name });

        return res.json(status);
    }
};

export { UpdateStatusController };