import { Circle, Line } from "react-konva";

export type GraphComponent = {
  x: number;
  y: number;
  parentIds: string[];
  childrenIds: string[];
  isDragging: boolean;
  color: string;
  type: elementType;
};

export const Blue = "#5C5CFF";
export const Green = "#89b717";

export type elementType = typeof Circle | typeof Line;

export type Graph = {
  [key: number]: GraphComponent;
};

export const generateGraph = () => {
  const graph = {} as Graph;
  let x = 7;
  [...Array(x)].forEach(
    (_, i) =>
      (graph[i] = {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        parentIds: i != 0 ? [(i - 1).toString()] : [],
        childrenIds: i != x - 1 ? [(i + 1).toString()] : [],
        isDragging: false,
        color: Green,
        type: Circle,
      })
  );
  return graph;
};
