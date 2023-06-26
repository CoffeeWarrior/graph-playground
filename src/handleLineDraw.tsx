import { Graph } from "./graphGeneration/generateGraph";
import { Line } from "react-konva";

export const handleLineDraw = (graph: Graph, id: number) => {
  const line = graph[id];
  const parent = line.parentIds[0];
  const child = line.childrenIds[0];
  let { x: startX, y: startY } = graph[parseInt(parent)];
  let { x: endX, y: endY } = graph[parseInt(child)];

  if (line?.x2 && line?.y2) {
    startX = line.x;
    startY = line.y;
    endX = line.x2;
    endY = line.y2;
  }
  line.x = startX;
  line.y = startY;
  line.x2 = endX;
  line.y2 = endY;

  return (
    <Line
      points={[startX, startY, endX, endY]}
      stroke="black"
      strokeWidth={4}
      closed={true}
    />
  );
};
