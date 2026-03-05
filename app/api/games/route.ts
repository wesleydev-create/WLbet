export async function GET() {
  try {
    const response = await fetch("https://www.freetogame.com/api/games", {
      cache: "no-store",
    })

    const data = await response.json()

    return Response.json(data)
  } catch (error) {
    return Response.json(
      { error: "Erro ao buscar jogos" },
      { status: 500 }
    )
  }
}