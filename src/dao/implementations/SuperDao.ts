/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTableDaoResponse } from '../../@types/apiServiceResponse';
import { logger } from '../../config/logger';
import ISuperDao from '../contracts/ISuperDao';

export default class SuperDao implements ISuperDao {
    private Model: any;

    constructor(model: any) {
        this.Model = model;
    }

    public async findAll(): Promise<any> {
        return this.Model.findAll()
            .then((result) => result)
            .catch((e) => {
                logger.error(e);
                console.log(e);
            });
    }

    public async findById(id: number): Promise<any> {
        return this.Model.findOne({ where: { id } })
            .then((result) => result)
            .catch((e) => {
                logger.error(e);
                console.log(e);
            });
    }

    public async findOneByWhere(
        where: object,
        attributes: string[] | null = null,
        order: string[] = ['id', 'desc']
    ): Promise<any> {
        if (attributes == null) {
            return this.Model.findOne({
                where,
                order: [order],
            })
                .then((result) => result)
                .catch((e) => {
                    logger.error(e);
                    console.log(e);
                });
        }
        return this.Model.findOne({
            where,
            attributes,
            order: [order],
        })
            .then((result) => result)
            .catch((e) => {
                logger.error(e);
                console.log(e);
            });
    }

    public async updateWhere(data: object, where: object): Promise<any> {
        return this.Model.update(data, { where })
            .then((result) => result)
            .catch((e) => {
                logger.error(e);
                console.log(e);
            });
    }

    public async updateById(data: object, id: number): Promise<any> {
        return this.Model.update(data, { where: { id } })
            .then((result) => result)
            .catch((e) => {
                logger.error(e);
                console.log(e);
            });
    }

    public async create(data: any): Promise<any> {
        const newData = new this.Model(data);
        return newData
            .save()
            .then((result) => result)
            .catch((e) => {
                logger.error(e);
                console.log(e);
            });
    }

    public async findByWhere(
        where: object,
        attributes: string[] | undefined | unknown = undefined,
        order: string[] = ['id', 'asc'],
        limit: number | null = null,
        offset: number | null = null
    ): Promise<any> {
        if (!attributes) {
            return this.Model.findAll({
                where,
                order: [order],
                limit,
                offset,
            })
                .then((result) => result)
                .catch((e) => {
                    logger.error(e);
                    console.log(e);
                });
        }

        return this.Model.findAll({
            where,
            attributes,
            order: [order],
            limit,
            offset,
        })
            .then((result) => result)
            .catch((e) => {
                logger.error(e);
                console.log(e);
            });
    }

    public async deleteByWhere(where: object): Promise<any> {
        return this.Model.destroy({ where })
            .then((result) => result)
            .catch((e) => {
                logger.error(e);
                console.log(e);
            });
    }

    public async bulkCreate(data: object[]) {
        return this.Model.bulkCreate(data)
            .then((result) => result)
            .catch((e) => {
                logger.error(e);
                console.log(e);
            });
    }

    public async getCountByWhere(where: object) {
        return this.Model.count({ where })
            .then((result) => result)
            .catch((e) => {
                logger.error(e);
                console.log(e);
            });
    }

    public async incrementCountInFieldByWhere(
        fieldName: string,
        where: object,
        incrementValue = 1
    ): Promise<any> {
        const instance = await this.Model.findOne({ where });
        if (!instance) {
            return false;
        }
        return instance
            .increment(fieldName, { by: incrementValue })
            .then((result) => result)
            .catch((e) => {
                logger.error(e);
                console.log(e);
            });
    }

    public async decrementCountInFieldByWhere(
        fieldName: string,
        where: object,
        decrementValue = 1
    ) {
        const instance = await this.Model.findOne({ where });
        if (!instance) {
            return false;
        }
        return instance
            .decrement(fieldName, { by: decrementValue })
            .then((result) => result)
            .catch((e) => {
                logger.error(e);
                console.log(e);
            });
    }

    public async getDataTableData(
        where: object,
        limit: number,
        offset: number,
        order: string[][] = [['id', 'DESC']]
    ): Promise<DataTableDaoResponse> {
        return this.Model.findAndCountAll({
            limit: Number(limit),
            offset: Number(offset),
            where,
            order,
        })
            .then((result) => result)
            .catch((e) => {
                logger.error(e);
                console.log(e);
            });
    }
}
