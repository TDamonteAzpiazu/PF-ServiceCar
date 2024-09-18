"use client";
import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import { IGraphicGral } from "@/helpers/types/types";
import Spinner from "@/components/spinner/Spinner";

const GraphicGral: React.FC<{ data: IGraphicGral | undefined }> = ({
  data,
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      // Destruir el gráfico anterior si existe
      if ((chartRef.current as any).chart) {
        (chartRef.current as any).chart.destroy();
      }

      const context = chartRef.current.getContext("2d");

      if (context && data) {
        const datasets = data.data.map((servicio: any) => {
          const backgroundColor = `rgba(${Math.floor(
            Math.random() * 255
          )}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
            Math.random() * 255
          )}, 0.2)`;
          const borderColor = `rgba(${Math.floor(
            Math.random() * 255
          )}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
            Math.random() * 255
          )}, 1)`;

          return {
            label: servicio.label,
            data: servicio.data,
            backgroundColor,
            borderColor,
            borderWidth: 1,
          };
        });

        if (data.data.length === 3) {
          datasets[0].backgroundColor = "rgba(251, 161, 77, 0.2)";
          datasets[0].borderColor = "rgba(251, 161, 77, 1)";
          datasets[1].backgroundColor = "rgba(211, 211, 211, 0.2)";
          datasets[1].borderColor = "rgba(211, 211, 211, 1)";
          datasets[2].backgroundColor = "rgba(255, 215, 0, 0.2)";
          datasets[2].borderColor = "rgba(255, 215, 0, 1)";
        }

        const chartInstance = new Chart(context, {
          type: "bar",
          data: {
            labels: data.labels,
            datasets,
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
    return (
      <div className="flex justify-center w-full items-center my-2">
        <Spinner title="Cargando datos..." />
      </div>
    );
  }

  return (
    <div className="w-full bg-[#181818c4] p-1.5 rounded-lg">
      <canvas
        ref={chartRef}
        className="w-full min-h-64 md:max-h-[350px] max-h-[420px]"
      ></canvas>
    </div>
  );
};

export default GraphicGral;
