export interface IUpdateUser {
    user_id: string;
    name: string;
    phone: string;
    email?: string;
    cpf?: string;
};

export interface IUpdatePassword{
    currentPassword: string;
     newPassword: string;
     confirmNewPassword: string;
     user_id: string;
}