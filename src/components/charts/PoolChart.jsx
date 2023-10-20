import { Chart } from "react-chartjs-2";
import { HexagonTickIcon } from "../icons/HexagonTickIcon";
import { ReactComponent as UpArrowSvg } from "src/assets/img/icons/up-arrow.svg";
import { ReactComponent as DownArrowSvg } from "src/assets/img/icons/down-arrow.svg";
import { useMemo, useState } from "react";
import { usePoolChartData } from "src/hooks/usePoolChartData";
import { format } from "date-fns";

const periods = ["1D", "7D", "1M", "3M", "1Y", "ALL"];

export const options = {
  responsive: true,
  scales: {
    x: {
      stacked: true,
      border: { dash: [2, 3], color: "#00000000" },
      ticks: {
        maxRotation: 0,
        autoSkipPadding: 80,
      },
    },
    y: {
      border: { dash: [2, 3], color: "#00000000" },
      stacked: true,
      grid: {
        drawTicks: false,
      },
      beginAtZero: true,
      ticks: {
        format: {
          style: "unit",
          unit: "percent",
        },
      },
    },
    y1: {
      border: { color: "#00000000" },
      stacked: true,
      grid: {
        display: false,
      },
      position: "right",
      beginAtZero: true,
    },
  },
  plugins: {
    datalabels: {
      display: false,
    },
    legend: {
      display: false,
    },
  },
};

const PoolInfoBox = ({ label, value, delta, increased }) => {
  return (
    <div className="pl-[10px] pr-[14px] py-[12.5px]">
      <p className="text-[14px] leading-[15px] text-grey-deep">{label}</p>
      <p className="font-caption text-[14px] leading-[1.46]">{value}</p>
      <div className="flex items-center gap-[2.63px]">
        {increased ? (
          <UpArrowSvg className={`w-[10px] fill-green-lighter1`} />
        ) : (
          <DownArrowSvg className={`w-[10px] fill-red-light`} />
        )}
        <p
          className={`text-[14px] font-normal leading-[15px] ${
            increased ? "text-green-lighter1" : "text-red-light"
          }`}
        >
          {delta}
        </p>
      </div>
    </div>
  );
};

export function PoolChart({ poolData, poolInfo, className }) {
  const [period, setPeriod] = useState(periods[periods.length - 1]);

  const { data } = usePoolChartData({ poolId: 123 });

  const { chartData, apyMax } = useMemo(() => {
    const now = new Date();
    const days = {
      "1D": 1,
      "7D": 7,
      "1M": 30,
      "3M": 90,
      "1Y": 365,
      ALL: -1,
    }[period];
    const selectedData =
      days === -1
        ? data
        : data.filter(
            (item) =>
              now.valueOf() - new Date(item.timestamp).valueOf() <=
              days * 24 * 60 * 60 * 1000
          );

    const labels = selectedData.map((item) =>
      format(new Date(item.timestamp), "yyyy-MM-dd")
    );

    const chartData = {
      labels,
      datasets: [
        {
          label: "Base APY",
          data: selectedData.map((item) => item.apyBase),
          backgroundColor: "#E9BE5C",
          borderRadius: Number.MAX_VALUE,
          // borderSkipped: "top",
          type: "bar",
          yAxisID: "y",
          maxBarThickness: 10,
        },
        {
          label: "Reward APY",
          data: selectedData.map((item) => item.apyReward) || 0,
          backgroundColor: "#32CC86",
          borderRadius: Number.MAX_VALUE,
          borderSkipped: "bottom",
          type: "bar",
          yAxisID: "y",
          maxBarThickness: 10,
        },
        {
          label: "TVL",
          data: selectedData.map((item) => item.tvlUsd),
          borderColor: "#1682FE21",
          borderWidth: 1,
          backgroundColor: "#1682FE11",
          fill: true,
          type: "line",
          pointRadius: 0,
          tension: 0.8,
          yAxisID: "y1",
        },
      ],
    };

    const apyMax = Math.max(
      ...selectedData.map((item) => item.apyBase + (item.apyReward || 0))
    );

    return { chartData, apyMax };
  }, [data, period]);

  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <PoolInfoBox
            label={"TVL"}
            value={`$${Number(poolInfo.tvlUsd).toLocaleString()}`}
            delta={"12.47%"}
            increased={true}
          />
          <PoolInfoBox
            label={"APY"}
            value={`${Number(poolInfo.apy).toFixed(2)}%`}
            delta={"2.47%"}
            increased={true}
          />
          <PoolInfoBox
            label={"Depositors"}
            value={1619}
            delta={23}
            increased={true}
          />
          <PoolInfoBox
            label={"Average deposit"}
            value={"$574.32"}
            delta={"2.08%"}
            increased={true}
          />
          <PoolInfoBox
            label={"Transactions"}
            value={"11,518"}
            delta={87}
            increased={false}
          />
          <PoolInfoBox
            label={"Revenue"}
            value={"$3,439,805"}
            delta={"2.08%"}
            increased={true}
          />
        </div>
        <div className="flex items-center rounded-[8px] px-[6px] py-[4px] bg-grey-lightest-20">
          {periods.map((item) => (
            <div
              key={item}
              className={`font-bold text-[18px] text-grey-dark leading-[1.2] tracking-[-0.5px] p-[8px] rounded-[8px] transition-all duration-300 cursor-pointer ${
                item === period ? "bg-white" : ""
              }`}
              onClick={() => setPeriod(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="px-[12px] py-[14px]">
        <div className="flex items-center gap-[16px]">
          <div className="flex items-center gap-[6px]">
            <HexagonTickIcon />
            <p className="font-normal text-[14px] leading-[15px] text-grey-dark">
              Base APY
            </p>
          </div>
          <div className="flex items-center gap-[6px]">
            <HexagonTickIcon bgColor="#32CC86" borderColor="#32CC86" />
            <p className="font-normal text-[14px] leading-[15px] text-grey-dark">
              Reward APY
            </p>
          </div>
          <div className="flex items-center gap-[6px]">
            <HexagonTickIcon bgColor="#1682FE" borderColor="#1682FE" />
            <p className="font-normal text-[14px] leading-[15px] text-grey-dark">
              TVL
            </p>
          </div>
        </div>
        <Chart
          height={100}
          options={{
            responsive: true,
            scales: {
              x: {
                stacked: true,
                border: { dash: [2, 3], color: "#00000000" },
                ticks: {
                  maxRotation: 0,
                  autoSkipPadding: 80,
                },
              },
              y: {
                border: { dash: [2, 3], color: "#00000000" },
                stacked: true,
                grid: {
                  drawTicks: false,
                },
                beginAtZero: true,
                ticks: {
                  format: {
                    style: "unit",
                    unit: "percent",
                  },
                },
                suggestedMax: apyMax * 1.5,
              },
              y1: {
                border: { color: "#00000000" },
                stacked: true,
                grid: {
                  display: false,
                },
                position: "right",
                beginAtZero: true,
              },
            },
            plugins: {
              datalabels: {
                display: false,
              },
              legend: {
                display: false,
              },
            },
          }}
          data={chartData}
          className="mt-[30px]"
        />
      </div>
    </div>
  );
}
