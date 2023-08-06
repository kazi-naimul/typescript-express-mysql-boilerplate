export declare type ApiServiceResponse = {
    statusCode: number;
    response: {
        status: boolean;
        code: number;
        message: string;
        data?: [] | object;
    };
};

export declare type DataTableResponse = {
    totalItems: number;
    data: Partial<object[]>;
    totalPages: number;
    currentPage: number;
};

export declare type DataTableDaoResponse = { count: number; rows: Partial<object[]> };
