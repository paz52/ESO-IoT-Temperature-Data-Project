# ESO Internship Project: Thermographic camera for telescope maintenance

This project is established in the context of the Summer Students Chile 2021 internship program of the European Southern Observatory (ESO). The project's objective is to get practice and be familiar with the IoT technology using a small thermal camera to be deployed in the field in our telescopes for maintenance purposes, automating data collection and analysis to provide information for predictive maintenance.

This project was developed using the [MLX90640 Infrared Thermal Sensor](https://www.mouser.cl/new/melexis/melexis-mlx90640-fir-sensor/) and the [nRF52840 DK single board development kit](https://www.nordicsemi.com/Products/Development-hardware/nrf52840-dk).

For more details, see the attached [presentation](FinalPresentation.pdf).

## Requirements

* [Node.js LTS](https://nodejs.org/en/)
* [Python 3 or latest](https://www.python.org/downloads/)
* [Mbed Studio](https://os.mbed.com/studio/)
* [Docker LTS](https://www.docker.com/get-started)
* nRF52840 DK with Mbed OS (download from [here](https://www.nordicsemi.com/Products/Development-hardware/nRF52840-DK/Download#infotabs) selecting Mbed)

## Installation

1. Clone this repository and navigate into it

    ```git clone https://github.com/paz52/ESO-IoT-Temperature-Data-Project```
    
    ```cd ESO-IoT-Temperature-Data-Project```
    
2. Setup Docker Environment

   ```docker compose up```

3. Install Node dependences

    ```npm install --save-dev sequelize-cli```
    
4. Install Sequelize

    ```npm install```

5. Execute migrations

    ```npx sequelize-cli db:migrate```

7.  Install Python libraries

    ```pip install paho-mqtt```
    
    ```pip install serial```
    
    ```pip install requests```

## Usage

1. Setup API server

    ```npm start```
   
2. Start Mbed Studio and open the workspace located at ```mbed-nrf52840dk-temperature-data``` folder
3. Connect the nRF52840 DK board and open the ```main.cpp``` file in the Mbed Studio editor
4. Click the run button (play icon) to run the program on the nRF52840 DK board
5. Navigate to ```broker``` folder and run the subscriber and publisher
    
    ```python subscriber.py```
    
    ```python publisher.py```

6. Go to the Grafana Dashboard at [http://localhost:4000](http://localhost:4000) 
