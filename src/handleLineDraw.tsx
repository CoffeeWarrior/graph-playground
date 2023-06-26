import { Graph } from "./graphGeneration/generateGraph";
import { Line } from "react-konva";

export const handleLineDraw = (graph: Graph, id: number) => {
  const line = graph[id];
  /*
  const line = graph[id];
  const parent = line.parentIds[0];
  const child = line.childrenIds[0];
  let { x: startX, y: startY } = graph[parseInt(parent)];
  let { x: endX, y: endY } = graph[parseInt(child)];
  */

  if (!line?.x2 || !line?.y2) {
    return;
  }
  return (
    <Line
      points={[line.x, line.y, line.x2, line.y2]}
      stroke="black"
      strokeWidth={4}
      closed={true}
    />
  );
};
