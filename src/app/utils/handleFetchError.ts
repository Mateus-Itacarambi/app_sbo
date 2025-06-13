export function handleFetchError(error: unknown): string {
    if (error instanceof Error) {
      if (error.message.includes("Failed to fetch")) {
        return "Erro ao conectar ao servidor.";
      }
      return error.message || "Erro desconhecido.";
    }
    return "Erro desconhecido.";
  }
  