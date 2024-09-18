"use client";
import React, { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";
import { IGraphicUsers } from "@/helpers/types/types";

const NewUsers: React.FC<{ data: IGraphicUsers | undefined }> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      // Destruir el gráfico anterior si existe
      if ((chartRef.current as any).chart) {
        (chartRef.current as any).chart.destroy();
      }

      const context = chartRef.current.getContext("2d");

      if (context && data) {
        const chartInstance = new Chart(context, {
          type: "bar",
          data: {
            labels: data.labels,
            datasets: [
              {
                label: data.label,
                data: data.data,
                backgroundColor: "rgba(255, 215, 0, 0.2)",
                borderColor: "rgba(255, 215, 0, 1)",
                borderWidth: 1,
              },
            ],
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
              },
            },
          },
        });

        (chartRef.current as any).chart = chartInstance;
      }
    }
  }, [data]);

  if (!data) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="w-full bg-[#181818c4] p-1.5 rounded-lg">
      <canvas ref={chartRef} className="w-full min-h-64 max-h-[350px]"></canvas>
    </div>
  );
};

export default NewUsers;
