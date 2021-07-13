const Sequelize = require('sequelize')

module.exports = (app, sequelize) => {
    const TemperatureData = sequelize.define('TemperatureData', {
        cameraId: Sequelize.INTEGER,
        time: Sequelize.DATE,
        data: Sequelize.ARRAY(Sequelize.FLOAT)
    });

    app.post('/temperature', async (req, res) => {

        const time = new Date().getTime();
        const cameraId = req.body.cameraId
        const data = req.body.data

        try {
            // insert the record
            await TemperatureData.create({
                cameraId, time, data
            });

            // send response 
            res.send('Inserted!');
        } catch (e) {
            console.log('Error inserting data', e)
        }
    })

    app.get('/temperature', async (req, res) => {
        try {
            // now display everything in the table
            const messages = await TemperatureData.findAll();
            res.send(messages);
        } catch (e) {
            console.log('Error displaying temperature data', e)
        }
    })

    app.get('/temperature/dateRange', async (req, res) => {
        try {
            const { Op } = require('sequelize');

            const temperatureData = await TemperatureData.findAll({ 
                where: { time: {
                    [Op.gte]: req.body.startedDate,
                    [Op.lte]: req.body.endDate
                } } 
            });
            if (temperatureData === null) {
                res.status(404).send('Temperature Data Not found!');
            } else {
                res.send(temperatureData);
            }
        } catch (e) {
            console.log('Error finding Temperature Data', e)
        }
    })
}