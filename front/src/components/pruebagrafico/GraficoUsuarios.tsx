"use client"
import { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";
import { valoresGraficoUsuarios } from "../../helpers/pruebaGrafico";

export default function GraficoUsuarios() {
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
                        labels: valoresGraficoUsuarios.labels,
                        datasets: [
                            {
                                label: valoresGraficoUsuarios.label,
                                data: valoresGraficoUsuarios.data,
                                backgroundColor: 'rgba(255, 215, 0, 0.2)',
                                borderColor: 'rgba(255, 215, 0, 1)',
                                borderWidth: 1,
                            },
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
