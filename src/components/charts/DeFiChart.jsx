import { useCallback, useEffect, useRef, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { useMobile } from "src/hooks/useMobile";
import { isDarkMode } from "src/utils/helpers";

export function DeFiChart({
  data,
  hoveredElementIndex,
  onHover,
  onBlur,
  cutout = "55%",
  radius = "90%",
  borderRadius = 8.24,
  borderWidth = 2,
  imageSize = 36,
  mobileImageSize = 24,
  gap = 0.01,
  borderColor = "#E9B55C",
}) {
  const [doughnutKey, setDoughtnutKey] = useState(0);
  const chartRef = useRef();

  const gapSize = data.datasets[0].data.reduce((sum, e) => sum + e) * gap;
  const images = data.images?.reduce((o, e) => o.concat([e, ""]), []);
  const logoImage = data.logoImage;

  const hasHoverEffect = onHover && onBlur;

  const isMobile = useMobile();

  const handleAfterDraw = useCallback(
    (chart) => {
      // draw protocol logos
      const ctx = chart.ctx;
      chart["$datalabels"]["_labels"].forEach((item, i) => {
        try {
          const index = item["$context"]["dataIndex"];

          if (index % 2) return;

          const arcElement = item["_el"];
          ctx.save();

          ctx.beginPath();
          ctx.moveTo(arcElement.x, arcElement.y);

          ctx.arc(
            arcElement.x,
            arcElement.y,
            arcElement.outerRadius,
            arcElement.startAngle,
            arcElement.endAngle
          );
          ctx.moveTo(arcElement.x, arcElement.y);
          ctx.closePath();
          ctx.clip();

          if (hasHoverEffect) {
            if (hoveredElementIndex !== -1 && index !== hoveredElementIndex) {
              ctx.filter = "grayscale(1)";
            } else if (hoveredElementIndex !== -1) {
              // color overlay
              // ctx.globalCompositeOperation = "source-atop";
              // ctx.fillStyle = "#E9B55C70";
              // ctx.fillRect(0, 0, 500, 500);
            }
          }
          if (images) {
            const rect = item["$layout"]["_box"]["_rect"];
            const [width, height] = isMobile
              ? [mobileImageSize, mobileImageSize]
              : [imageSize, imageSize];
            ctx.drawImage(
              images[index],
              rect.x + rect.w / 2 - width / 2,
              rect.y + rect.h / 2 - height / 2,
              width,
              height
            );
          }
          ctx.restore();
        } catch (e) {
          console.log("error drawing logo icon on chart");
        }
      });

      if (logoImage) {
        // draw main logo at the center of the chart
        const centerX = chart.width / 2;
        const centerY = chart.height / 2;
        const width = chart.width * 0.302;
        const height = chart.height * 0.302;
        const x = centerX - width / 2;
        const y = centerY - height / 2;
        ctx.drawImage(logoImage, x, y, width, height);
      }
    },
    [
      hasHoverEffect,
      hoveredElementIndex,
      imageSize,
      images,
      isMobile,
      logoImage,
      mobileImageSize,
    ]
  );

  useEffect(() => {
    setDoughtnutKey((doughnutKey) => doughnutKey + 1);
  }, [data]);

  return (
    <Doughnut
      ref={chartRef}
      key={doughnutKey}
      data={{
        labels: data.labels.reduce((o, e) => o.concat([e, ""]), []),
        datasets: [
          {
            label: data.datasets[0].label,
            data: data.datasets[0].data.reduce(
              (o, e) => o.concat([e, gapSize]),
              []
            ),
            backgroundColor: data.datasets[0].backgroundColor
              .reduce((o, e) => o.concat([e, "rgba(0,0,0,0)"]), [])
              .map((color, i) => {
                if (!hasHoverEffect) return color;
                return hoveredElementIndex === -1 ||
                  i === hoveredElementIndex ||
                  i % 2
                  ? color
                  : !isDarkMode()
                  ? "#00000011"
                  : "#ffffffaa";
              }),
            borderColor: data.datasets[0].borderColor
              ?.reduce(
                (o, e) => o.concat([borderColor + "80", "#00000000"]),
                []
              )
              .map((color, i) => {
                if (!hasHoverEffect) return color;
                return hoveredElementIndex === -1 ||
                  i === hoveredElementIndex ||
                  i % 2
                  ? hoveredElementIndex === i
                    ? borderColor + "33"
                    : color
                  : `#00000000`;
              }),
            borderWidth: data.datasets[0].borderColor
              ?.reduce((o, e) => o.concat([borderWidth, 0]), [])
              .map((width, i) => {
                if (!hasHoverEffect) return width;
                return hoveredElementIndex === -1
                  ? borderWidth
                  : hoveredElementIndex === i
                  ? borderWidth * 5
                  : 0;
              }),
          },
        ],
      }}
      options={{
        borderWidth,
        borderRadius,
        cutout,
        radius,
        onHover: (event, elements) => {
          if (!elements?.length) onBlur?.();
          else onHover?.(elements[0].index);
        },
        plugins: {
          datalabels: {
            display: true,
            formatter: (value) => "",
          },
          tooltip: {
            enabled: (...args) => {
              return false;
            },
          },
          title: false,
          legend: false,
        },
      }}
      plugins={[
        {
          afterDraw: handleAfterDraw,
        },
      ]}
      onMouseLeave={onBlur}
    />
  );
}
