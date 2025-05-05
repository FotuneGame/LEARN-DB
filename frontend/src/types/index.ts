
export type UserType = {
    id: number,
    first_name: string,
    second_name: string,
    middle_name: string,
    avatar: string,
    accessToken: string | null,
    email: string,
    phone: string,
}

export type AdminType = "Админ";

export type PostType = "Руководитель" | "Менеджер" | "Бухгалтер" | "Сис. админ" | "Сотрудник" | AdminType;

export type EmployeeType = {
    id: number,
    post: PostType,
}


export type AuthStoryType = {
    password: string,
    email: string,
}

export type RegistrationStoryType = {
    password: string,
    email: string,
    first_name: string,
    second_name: string,
    middle_name: string,
}

export type ForgetStoryType = {
    email: string,
    confirm: boolean,
    password: string,
}

export type SecurityStoryType = {
    email: string,
    phone: string,
    password: string,
}


export type CodeType = "auth" | "registration" | "forget" | "security" | "delete_account" | null;
export type CodeStoryType = {
    type: CodeType
}
