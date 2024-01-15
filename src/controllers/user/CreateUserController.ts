import { Request, Response } from "express";
import { CreateUserService } from '../../services';

class CreateUserController {
    async handle(req: Request, res: Response) {
        const { name, cpf, phone, email, password, role, picture } = req.body;

        const createUserService = new CreateUserService();
        const user = await createUserService.execute({
            name,
            cpf,
            phone,
            email,
            password,
            role,
            picture,
        });

        return res.json(user);
    };
};

export { CreateUserController };