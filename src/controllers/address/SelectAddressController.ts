import { Request, Response } from "express";
import { SelectAddressService } from "../../services";

class SelectAddressController {
    async handle(req: Request, res: Response) {
        const address_id = req.query.address_id as string;
        console.log(address_id);


        const selectAddressService = new SelectAddressService();
        
        const address = await selectAddressService.execute(address_id);
        
        return res.json(address);
    }
};

export { SelectAddressController };