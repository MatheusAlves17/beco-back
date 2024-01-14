import { Request, Response } from "express";
import { UpdateUserService } from "../../services";
import { IUpdateUser } from "../../interfaces";

class UpdateUserController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;

        const { name, phone, picture } = req.body as IUpdateUser;

        const updateUserService = new UpdateUserService();

        const update = await updateUserService.execute({user_id, name, phone, picture});

        return res.json(update)
    }
};

export { UpdateUserController };