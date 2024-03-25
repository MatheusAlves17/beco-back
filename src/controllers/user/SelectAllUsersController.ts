import { Request, Response } from "express";
import { SelectAllUsersService } from "../../services";

class SelectAllUsersController {
    async handle(req: Request, res: Response) {
        const isAdmin = req.query.isAdmin as string;

        const selectAllUsersService = new SelectAllUsersService();

        const users = await selectAllUsersService.execute(isAdmin);

        return res.json(users);
    };
};

export { SelectAllUsersController };