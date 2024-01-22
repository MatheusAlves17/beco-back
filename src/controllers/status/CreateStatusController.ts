import { Request, Response } from "express";
import { CreateStatusService } from "../../services";

class CreateStatusController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;
        const { name } = req.body;

        console.log(name);
        

        const createStatusService = new CreateStatusService();
        const status = await createStatusService.execute(user_id, { name });

        return res.json(status);

    }
};

export { CreateStatusController };