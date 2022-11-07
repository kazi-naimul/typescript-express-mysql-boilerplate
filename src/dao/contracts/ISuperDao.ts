/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface ISuperDao {
    findAll: () => Promise<any>;
    findById: (id: number) => Promise<any>;
    findOneByWhere: (where: object, attributes: string[] | null, order: string[]) => Promise<any>;
    updateWhere: (data: object, where: object) => Promise<any>;
    updateById: (data: object, id: number) => Promise<any>;
    create: (data: object) => Promise<any>;
    findByWhere: (
        where: object,
        attributes: string[] | undefined,
        order: string[],
        limit: number | null,
        offset: number | null
    ) => Promise<any>;
    deleteByWhere: (where: object) => Promise<any>;
    bulkCreate: (data: object[]) => Promise<any>;
    getCountByWhere: (where: object) => Promise<any>;
    incrementCountInFieldByWhere: (
        fieldName: string,
        where: object,
        incrementValue: number
    ) => Promise<any>;
    decrementCountInFieldByWhere: (
        fieldName: string,
        where: object,
        decrementValue: number
    ) => Promise<any>;
}
