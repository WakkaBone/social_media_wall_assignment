import React from "react";
import { LineChart } from "react-charts-d3";
import { AdminPanelPostStatistics } from "../../Styled-Components/AdminPanelStyles";

const OnePostChart = ({ likedBy = [] }) => {
  const generateData = () => {
    let temp;
    if (likedBy.length > 1) {
      temp = likedBy.map((like) =>
        like.timestamp.seconds
          ? new Date(like.timestamp.seconds * 1000).getDate()
          : like.timestamp.getDate()
      );
      let count = {};
      temp.forEach((day) => {
        if (count[day]) {
          count[day] = count[day] + 1;
        } else {
          count[day] = 1;
        }
      });
      const days = Object.keys(count);
      const likes = Object.values(count);
      let data = [{ key: "Number of likes per day", values: [] }];
      for (let i = 0; i < days.length; i++) {
        const obj = { x: +days[i], y: +likes[i] };
        data[0].values.push(obj);
      }
      return data;
    } else {
      return likedBy.length
        ? [
            {
              key: "Number of likes per day",
              values: [
                {
                  x: likedBy[0].timestamp.seconds
                    ? +new Date(likedBy[0].timestamp.seconds * 1000).getDate()
                    : +new Date(likedBy[0].timestamp).getDate(),
                  y: 1,
                },
              ],
            },
          ]
        : [
            {
              key: "Number of likes per day",
              values: [
                {
                  x: 0,
                  y: 0,
                },
              ],
            },
          ];
    }
  };

  const axisConfig = {
    showXAxis: true,
    showXAxisLabel: true,
    xLabel: "Date (this month)",
    xLabelPosition: "right",
    showYAxis: true,
    showYAxisLabel: true,
    yLabel: "Likes (per day)",
    yLabelPosition: "top",
  };

  return (
    <AdminPanelPostStatistics>
      <h3>Total likes: {likedBy.length ? likedBy.length : "no likes"}</h3>
      {likedBy.length ? (
        <>
          <p>
            Liked by:{" "}
            {likedBy.map((like, index) =>
              index < likedBy.length - 1 ? `${like.email}, ` : `${like.email}.`
            )}
          </p>
          <h3>New likes dynamics:</h3>
          <div style={{ margin: "1% 0" }}>
            <LineChart
              width={100}
              data={generateData()}
              axisConfig={axisConfig}
            />
          </div>
        </>
      ) : null}
    </AdminPanelPostStatistics>
  );
};

export default OnePostChart;
