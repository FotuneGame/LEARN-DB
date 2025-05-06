
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
    first_name?: string,
    second_name?: string,
    middle_name?: string,
}

export type SpecialistType = {
    id: number,
    phone: string,
    email: string,
    profession: string,
    adress: string,
    first_name: string,
    second_name: string,
    middle_name: string,
}

export type AnswerType = {
    id: number,
    name: string,
    describe: string,
    important: string
}

export type ProblemType = {
    id: number,
    name: string,
    describe: string,
    id_theme: number,
    id_specialist: number,
    id_answer: number,
    id_employee: number
}

export type CallbackType = {
    id: number,
    phone: string,
    email: string,
    id_problem: number,
}

export type ThemeType ={
    id: number,
    name: string
}

export type ClientType = {
    id: number,
    id_employee: number,
    first_name: string,
    second_name: string,
    middle_name: string,
}

export type CallType={
    id: number,
    id_client: number,
    phone: string,
    date: string,
    time: string,
    is_spam: boolean
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
