const Sequelize = require('sequelize')

module.exports = (app, sequelize) => { 
    const DailyData = sequelize.define('DailyData', {
        cameraId: Sequelize.INTEGER,
        time: Sequelize.DATE,
        average: Sequelize.ARRAY(Sequelize.FLOAT),
        max: Sequelize.ARRAY(Sequelize.FLOAT), 
        min: Sequelize.ARRAY(Sequelize.FLOAT)
    });

    app.post('/dailyData', async (req, res) => {

        const time = new Date().getTime();
        const cameraId = req.body.cameraId
        const average = req.body.average
        const max = req.body.max
        const min = req.body.min
    
        try {
            // insert the record
            await DailyData.create({
                cameraId, time, average, max, min
            });
    
            // send response 
            res.send('Inserted!');
        } catch (e) {
            console.log('Error inserting data', e)
        }
    })

    app.get('/dailyData/date/:date', async (req, res) => {
        try {
            const dailyData = await DailyData.findOne({ where: { time: req.params.time } });
            if (dailyData === null) {
                res.status(404).send('Daily Data Not found!');
            } else {
                res.send(dailyData);
            }
        } catch (e) {
            console.log('Error finding Daily Data', e)
        }
    })
    
    app.get('/dailyData', async (req, res) => {
        try {
            const dailyData = await DailyData.findAll();
            res.send(dailyData);
        } catch (e) {
            console.log('Error displaying Daily Data', e)
        }
    })
}