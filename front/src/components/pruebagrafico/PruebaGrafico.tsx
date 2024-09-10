"use client"
import { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";
import { valoresGrafico } from "../../helpers/pruebaGrafico";

export default function PruebaGrafico() {
    const chartRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (chartRef.current) {
            // Destruimos el gráfico anterior si existe
            if ((chartRef.current as any).chart) {
                (chartRef.current as any).chart.destroy();
            }

            const context = chartRef.current.getContext("2d");

            if (context) {
                // Creamos una instancia del nuevo gráfico
                const chartInstance = new Chart(context, {
                    type: "bar",
                    data: {
                        labels: valoresGrafico.labels,
                        datasets: [
                            {
                                label: valoresGrafico.dataSucursales[0].label,
                                data: valoresGrafico.dataSucursales[0].data,
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1,
                            },
                            {
                                label: valoresGrafico.dataSucursales[1].label,
                                data: valoresGrafico.dataSucursales[1].data,
                                backgroundColor: 'rgba(75, 134, 34, 0.2)',
                                borderColor: 'rgba(75, 134, 34, 1)',
                                borderWidth: 1,
                            },
                            {
                                label: valoresGrafico.dataSucursales[2].label,
                                data: valoresGrafico.dataSucursales[2].data,
                                backgroundColor: 'rgba(50, 50, 34, 0.2)',
                                borderColor: 'rgba(50, 50, 34, 1)',
                                borderWidth: 1,
                            },
                            {
                                label: "Total",
                                data: valoresGrafico.total,
                                backgroundColor: 'rgba(50, 50, 34, 0.2)',
                                borderColor: 'rgba(50, 50, 34, 1)',
                                borderWidth: 1,
                            }
                        ]
                    },
                    options: {
                        scales: {
                            x: {
                                type: "category",
                                border: {
                                    color: "white",
                                },
                            },
                            y: {
                                beginAtZero: true,
                                border: {
                                    color: "white",
                                },
                            }
                        }
                    }
                });

                // Asignamos la instancia del gráfico a la referencia del canvas
                (chartRef.current as any).chart = chartInstance;
            }
        }
    }, [chartRef]);

    return (
        <div>
            <canvas ref={chartRef}></canvas> {/* No olvides renderizar el canvas */}
        </div>
    );
}
