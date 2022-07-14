export declare function envValidate(config: Record<string, any>): EnvironmentVariables;
export declare enum DB_TYPE {
    mysql = "mysql"
}
declare class EnvironmentVariables {
    NODE_ENV: string;
    PORT: number;
    HOST: string;
    ACCESS_TOKEN_SECRET: string;
    ACCESS_TOKEN_EXPIRE: string;
    REFRESH_TOKEN_SECRET: string;
    REFRESH_TOKEN_EXPIRE: string;
    PAYMENT_PORT: number;
    PAYMENT_HOST: string;
    DB_TYPE: DB_TYPE.mysql;
    DB_HOST: string;
    DB_PORT: number;
    MYSQL_ROOT_PASSWORD: string;
    MYSQL_USER: string;
    MYSQL_PASSWORD: string;
    MYSQL_DATABASE: string;
}
export {};
