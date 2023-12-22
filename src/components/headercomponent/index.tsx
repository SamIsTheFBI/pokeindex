import { Button, Group, Text } from "@mantine/core"
import { motion } from "framer-motion"
import Link from "next/link"
import { TbPokeball } from "react-icons/tb"
import { VscGithubAlt } from "react-icons/vsc"

function HeaderComponent() {
  return <Group h="100%" justify="space-between" px="lg" gap={"sm"}>
    <Group gap="xs">
      <motion.div
        style={{ display: "flex", justifyContent: "center" }}
        whileHover={{ scale: 1.2, rotate: 360, transition: { duration: 0.5 } }}
        whileTap={{ scale: 0.8, rotate: -90, borderRadius: "100%" }}
      >
        <TbPokeball size={28} />
      </motion.div>
      <Text
        size={"xl"}
        fw={900}
        variant="gradient"
        gradient={{ from: 'teal.4', to: 'cyan', deg: 45 }}
        component={Link}
        href="/"
      >PokeIndex
      </Text>
    </Group>
    <Button size="sm" color="cyan" leftSection={<VscGithubAlt />} component={Link} href="https://github.com/samisthefbi/pokeindex">
      Source Code
    </Button>
  </Group>

}

export default HeaderComponent
