const models = require('../models/index');
const { Op } =require('sequelize');

/**
 * Create new metric.
 * @param req An object containing the info of new metric.
 * @param res An object containing info of metric.
 * @returns res object.
*/
async function createMetric(req, res) {
    try {
        // data example: [
        //                  { value: 22, date: '2024-12-21' }, 
        //                  { value: 25, date: '2024-12-22' },
        //               ]
        const { userId, metricName, type, unit, data } = req.body;

        await  models.sequelize.transaction(async (transaction) => {
            // Create new metric
            const metric = await models.metrics.create({    
                userId,
                metricName,
                type,
                unit
            }, { transaction });

            // Insert values of metric to metric_value table.
            if (metric) {
                const newData = data.map(item => {
                    return {
                        ...item,
                        metricId: metric.id,
                    }
                });
                await models.metric_values.bulkCreate(newData, { transaction });
            }
        });

        return res.status(200).json({
            message: 'Create metric successful!',
            status: true,
        });
    } catch (err) {
        return res.status(500).json({ message: err.message || err, status: false });
    }
}

/**
 * Get values of metric by metricId to draw graph.
 * @param req An object containing the id.
 * @param res An object containing list values of metric.
 * @returns res object.
*/
async function getMetricValuesById(req, res) {
    try {
        const { metricId, unitTo, dateFrom, dateTo } = req.body;
        let result;

        const metric = await models.metrics.findOne({
            attributes: ['unit', 'type'],
            where: { id: metricId }
        });

        // Check if need to convert or not
        if (!unitTo || unitTo === metric.unit) {
            // Doesn't need to convert in this case
            result = await models.metric_values.findAll({
                attributes: ['value', 'date'],
                where: {
                    metricId: metricId,
                    ...(dateFrom && dateTo && {
                        date: { [Op.between]: [dateFrom, dateTo] } 
                    })
                },
                order: [['date', 'ASC']],
            });
        } else {
            let periodQuery = '';
            if (dateFrom && dateTo) {
                periodQuery = `AND metric_values.date BETWEEN "${dateFrom}" AND "${dateTo}"`
            }
            // Check type of metric
            if (metric.type == 'Distance') {
                result = await models.sequelize.query(
                    `SELECT 
                            date,
                            value * factor AS value
                        FROM metric_values
                    INNER JOIN metrics
                        ON metrics.id = metric_values.metricId
                    INNER JOIN conversion_factors
                        ON conversion_factors.unitFrom = metrics.unit AND conversion_factors.unitTo = "${unitTo}"
                    WHERE metrics.id = ${metricId} ${periodQuery}
                    ORDER BY metric_values.date ASC`
                );
            } else {
                let convertCal;
                if ((metric.unit == 'F' && unitTo == 'C') || (metric.unit == 'F' && unitTo == 'K')) {
                    // In this case the conversion query is diff from normal case.
                    convertCal = `(value + subFactor) * factor AS value`;
                } else {
                    convertCal = `(value * factor) + subFactor AS value`;
                }
                result = await models.sequelize.query(
                    `SELECT 
                            date,
                            ${convertCal}
                        FROM metric_values
                    INNER JOIN metrics
                        ON metrics.id = metric_values.metricId
                    INNER JOIN conversion_factors
                        ON conversion_factors.unitFrom = metrics.unit AND conversion_factors.unitTo = "${unitTo}"
                    WHERE metrics.id = ${metricId} ${periodQuery}
                    ORDER BY metric_values.date ASC`
                );
            }
        }

        return res.status(200).json({
            message: 'Get values of metric successful!',
            data: result,
            status: true,
        });
    } catch (err) {
        return res.status(500).json({ message: err.message || err, status: false });
    }
}

/**
 * Get list of metrics by type.
 * @param req An object containing the type.
 * @param res An object containing list of metric.
 * @returns res object.
*/
async function getMetricListByType(req, res) {
    const result = [];
    try {
        const { userId, type } = req.body;

        const metricsList = await models.metrics.findAll({
            include: [
                {
                    model: models.users,
                    attributes: ['id'],
                    where: {
                        id: userId,
                    }
                }
            ],
            where: {
                type,
            }
        })

        return res.status(200).json({
            message: 'Get values of metric successful!',
            data: metricsList,
            status: true,
        });
    } catch (err) {
        return res.status(500).json({ message: err.message || err, status: false });
    }
}

module.exports = {
    createMetric,
    getMetricValuesById,
    getMetricListByType,
}