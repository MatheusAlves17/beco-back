import { Request, Response } from "express";
import { DeleteUserService } from "../../services";

class DeleteUserController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;

        const deleteUserService = new DeleteUserService();

        const userDelete = deleteUserService.execute(user_id);

        return res.json('Usuário excluído com sucesso!');
    };
};

export { DeleteUserController };