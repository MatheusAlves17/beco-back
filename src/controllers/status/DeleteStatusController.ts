import { Request, Response } from "express";
import { DeleteStatusService } from "../../services";

class DeleteStatusController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;
        const status_id = req.query.status_id as string;

        const deleteStatusService = new DeleteStatusService();

        const status = await deleteStatusService.execute(user_id, status_id);

        return res.json(status);
    }
};

export { DeleteStatusController };