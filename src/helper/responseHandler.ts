import {
    ApiServiceResponse,
    DataTableDaoResponse,
    DataTableResponse,
} from '../@types/apiServiceResponse';

const logError = (err) => {
    console.error(err);
};

const logErrorMiddleware = (err, req, res, next) => {
    logError(err);
    next(err);
};

const returnError = (statusCode: number, message: string) => {
    const response: ApiServiceResponse = {
        statusCode,
        response: {
            status: false,
            code: statusCode,
            message,
        },
    };
    return response;
};
const returnSuccess = (statusCode: number, message: string, data?: [] | object) => {
    const response: ApiServiceResponse = {
        statusCode,
        response: {
            status: true,
            code: statusCode,
            message,
            data,
        },
    };
    return response;
};

const getPaginationData = (rows: DataTableDaoResponse, page: number, limit: number) => {
    const { count: totalItems, rows: data } = rows;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    const response: DataTableResponse = {
        totalItems,
        data,
        totalPages,
        currentPage,
    };
    return response;
};

export default {
    logError,
    logErrorMiddleware,
    returnError,
    returnSuccess,
    getPaginationData,
};
