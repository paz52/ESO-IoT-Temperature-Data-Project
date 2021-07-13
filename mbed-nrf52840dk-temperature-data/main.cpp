#include "mbed.h"
#include "platform/mbed_thread.h"

#include "MLX90640_API.h"
#include "MLX90640_I2C_Driver.h"
DigitalOut led(LED1);
#define TA_SHIFT 8
const unsigned char MLX90640_address = 0x33; 
static float mlx90640To[768];
paramsMLX90640 mlx90640;
Serial pc(USBTX, USBRX);
#define BLINKING_RATE_MS 5000
#define PC_SERIAL_BAUD 115200

int main()
{
    // setup serial connection
    pc.baud(PC_SERIAL_BAUD);
    led = 1;

    //MLX90640_I2CInit();
    MLX90640_I2CFreqSet(400);
    int status;
    uint16_t eeMLX90640[832];
    status = MLX90640_DumpEE(MLX90640_address, eeMLX90640);

    if (status != 0)
        pc.printf("[ERROR] Failed to load system parameters\n");

    status = MLX90640_ExtractParameters(eeMLX90640, &mlx90640);
    if (status != 0)
        pc.printf("[ERROR] Parameter extraction failed\n");

    while (true) {
        led = !led;
        thread_sleep_for(BLINKING_RATE_MS);

        for (unsigned char x = 0 ; x < 2 ; x++) //Read both subpages
        {
            uint16_t mlx90640Frame[834];
            int status = MLX90640_GetFrameData(MLX90640_address, mlx90640Frame);
            if (status < 0)
            {
                pc.printf("[ERROR] GetFrame Error: \n");
                pc.printf("[ERROR] %d\n", status);
            }

            float vdd = MLX90640_GetVdd(mlx90640Frame, &mlx90640);
            float Ta = MLX90640_GetTa(mlx90640Frame, &mlx90640);

            float tr = Ta - TA_SHIFT; //Reflected temperature based on the sensor ambient temperature
            float emissivity = 0.95;

            MLX90640_CalculateTo(mlx90640Frame, &mlx90640, emissivity, tr, mlx90640To);
        }
        
        for (int i = 1; i <= 32; i++)
        {
            for(int j = 1; j <= 24; j++) {
                pc.printf("%.2f%s", mlx90640To[i * j - 1] - 273.15f, (i * j == 768) ? "" : ",");
            }
        }
        pc.printf("\n");
    }
}