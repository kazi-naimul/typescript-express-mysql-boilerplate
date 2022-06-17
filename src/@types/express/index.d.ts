export declare interface User {
    id: number;
    uuid: string;
    first_name: string;
    last_name: string;
    email: string;
    status: number;
    role: number;
    email_verified: number;
    default_user: number;
    agency_id: number;
    address: string;
    phone_number: string;
    google_id?: string;
    is_super_admin: number;
    app_features?: string[];
    created_at: string;
    updated_at: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}
