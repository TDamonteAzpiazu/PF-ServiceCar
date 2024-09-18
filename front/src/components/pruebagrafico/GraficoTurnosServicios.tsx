"use client";
import { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";

export default function GraficoTurnosServicios({data}: any) {
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
                const datasets = data.data.map((servicio: any, index: any) => {
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

                if(data.data.length === 3) {
                    datasets[0].backgroundColor = "rgba(251, 161, 77, 0.2)";
                    datasets[0].borderColor = "rgba(251, 161, 77, 1)";
                    datasets[1].backgroundColor = "rgba(211, 211, 211, 0.2)";
                    datasets[1].borderColor = "rgba(211, 211, 211, 1)";
                    datasets[2].backgroundColor = "rgba(255, 215, 0, 0.2)";
                    datasets[2].borderColor = "rgba(255, 215, 0, 1)";
                }

                // Creamos una instancia del nuevo gráfico
                const chartInstance = new Chart(context, {
                    type: "bar",
                    data: {
                        labels: data.labels,
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
