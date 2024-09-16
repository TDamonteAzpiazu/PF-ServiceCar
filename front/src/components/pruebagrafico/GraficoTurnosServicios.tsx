"use client";
import { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";
import { valoresGraficoTurnoServicio } from "../../helpers/pruebaGrafico";

export default function GraficoTurnosServicios() {
    const chartRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (chartRef.current) {
            // Destruimos el gráfico anterior si existe
            if ((chartRef.current as any).chart) {
                (chartRef.current as any).chart.destroy();
            }

            const context = chartRef.current.getContext("2d");

            if (context) {
                // Generamos los datasets dinámicamente a partir de dataServicios
                const datasets = valoresGraficoTurnoServicio.dataServicios.map((servicio, index) => {
                    // Creamos colores aleatorios o puedes establecer una paleta de colores predefinida
                    const backgroundColor = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`;
                    const borderColor = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`;

                    return {
                        label: servicio.label,
                        data: servicio.data,
                        backgroundColor,
                        borderColor,
                        borderWidth: 1
                    };
                });

                // Creamos una instancia del nuevo gráfico
                const chartInstance = new Chart(context, {
                    type: "bar",
                    data: {
                        labels: valoresGraficoTurnoServicio.labels,
                        datasets
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
            <canvas ref={chartRef}></canvas>
        </div>
    );
}
