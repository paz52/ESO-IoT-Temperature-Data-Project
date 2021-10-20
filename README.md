# ESO Internship Project: Thermographic camera for telescope maintenance

This project is established in the context of the Summer Students Chile 2021 internship program of the European Southern Observatory (ESO). The project's objective is to get practice and be familiar with the IoT technology using a small thermal camera to be deployed in the field in our telescopes for maintenance purposes, automating data collection and analysis to provide information for predictive maintenance.

This project was developed using the [MLX90640 Infrared Thermal Sensor](https://www.mouser.cl/new/melexis/melexis-mlx90640-fir-sensor/) and the [nRF52840 DK single board development kit](https://www.nordicsemi.com/Products/Development-hardware/nrf52840-dk).

For more details, see the attached [presentation](FinalPresentation.pdf).

## Project Overview Diagram

![ProjectArchitecture](https://user-images.githubusercontent.com/54490571/125495993-066b5d8c-f539-4d3e-af63-af800d6cb76f.png)



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
    
2. Download the [mbed-os repository](https://github.com/ARMmbed/mbed-os) as a ZIP. 

3. Unzip the downloaded file, and move all the content of mbed-os-master folder to the mbed-os folder located at 
    ```\ESO-IoT-Temperature-Data-Project\mbed-nrf52840dk-temperature-data\mbed-os```
    
4. Set up Docker Environment

   ```docker compose up```

5. Install Node dependences

    ```npm install```
    
6. Install Sequelize

    ```npm install --save-dev sequelize-cli```

7. Execute migrations

    ```npx sequelize-cli db:migrate```

8.  Install Python libraries

    ```pip install paho-mqtt```
    
    ```pip install serial```
    
    ```pip install requests```

## Usage

1. Set up API server

    ```npm start```
   
2. Start Mbed Studio and open the workspace located in ```mbed-nrf52840dk-temperature-data``` folder
3. Connect the nRF52840 DK board and open the ```main.cpp``` file in the Mbed Studio editor
4. Click the run button (play icon) to run the program on the nRF52840 DK board
5. Navigate to ```broker``` folder and run the subscriber and publisher
    
    ```python subscriber.py```
    
    ```python publisher.py```

6. Go to the Grafana Dashboard at [http://localhost:4000](http://localhost:4000) 
7. Login with default credentials admin:admin

## Project Files Description

* ```broker``` folder: contains the subscriber and publisher programs for the EMQX queue.
* ```config``` folder: contains the configuration to connect to the database.
* ```grafana-storage``` folder: contains the Grafana Dashboard database for the Docker volume.
* ```mbed-nrf52840dk-temperature-data``` folder: contains the Mbed Studio workspace with the nRF52840 DK board program.
* ```migrations``` folder: contains the migrations files to set up the database.
* ```models``` folder: contains the database models (MVC architecture).
* ```routes``` folder: contains the API controllers (MVC architecture).
* ```docker-compose.yml``` file: contains the project environment orquestation (Timescale DB, EMQX queue and Grafana dashboard).

## References

* Official MLX90640 Infrared Thermal Sensor Mbed driver - [https://github.com/melexis/mlx90640-library](https://github.com/melexis/mlx90640-library)
* Mbed I2C protocol documentation - [https://os.mbed.com/docs/mbed-os/v6.9/apis/i2c.html](https://os.mbed.com/docs/mbed-os/v6.9/apis/i2c.html)
* Getting started with Bluetooth Low Energy development with the nRF52840 DK - [https://6point6.co.uk/insights/getting-started-with-bluetooth-le-development/](https://6point6.co.uk/insights/getting-started-with-bluetooth-le-development/)
* Install Mbed OS on nRF52840 DK board - [https://armmbed.github.io/DAPLink/?board=Nordic-nRF52-DK](https://armmbed.github.io/DAPLink/?board=Nordic-nRF52-DK)
