import { Request, Response } from "express";
import { UpdatePasswordService } from "../../services";

class UpdatePasswordController {
    async handle(req: Request, res: Response) {
        const { currentPassword, newPassword, confirmNewPassword } = req.body;
        const user_id = req.user_id;

        const updatePasswordService = new UpdatePasswordService();

        const update = updatePasswordService.execute({ user_id, currentPassword, newPassword, confirmNewPassword });

        return res.json(update)
    };
};

export { UpdatePasswordController };