import { Request, Response } from "express";
import { SelectAllUsersService } from "../../services";

class SelectAllUsersController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;

        const selectAllUsersService = new SelectAllUsersService();

        const users = await selectAllUsersService.execute(user_id);

        return res.json(users);
    };
};

export { SelectAllUsersController };