import { Container, Stack, Text } from "@mantine/core";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { type PokemonStat } from "~/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Tooltip,
  Legend
);

export default function Chart({ name, pokemonStats }: { name: string, pokemonStats: PokemonStat[] }) {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 5 / 4,
  };

  const chartData = {
    labels: ["HP", "Attack", "Defense", "Sp.Attack", "Sp.Defense", "Speed"],
    datasets: [
      {
        label: "Pokemon Stats",
        data: pokemonStats.map(data => data.base_stat),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  }
  return (
    <Container mt="md">
      <Stack>
        <Text fw={500} size="md">Base stats of {name}</Text>
        <Bar data={chartData} options={options} />
      </Stack>
    </Container>
  )
}
