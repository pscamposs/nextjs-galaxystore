export function centsToReal(cents: number) {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function timeAgo(dateString: string) {
  const now = new Date();
  const past = new Date(dateString);
  const offsetInHours = -3;
  const brasiliaTime = new Date(
    past.getTime() + offsetInHours * 60 * 60 * 1000
  );
  const diffInSeconds = Math.floor(
    (now.getTime() - brasiliaTime.getTime()) / 1000
  );

  const seconds = diffInSeconds;
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return years === 1 ? "há 1 ano" : `há ${years} anos`;
  } else if (months > 0) {
    return months === 1 ? "há 1 mês" : `há ${months} meses`;
  } else if (days > 0) {
    return days === 1 ? "há 1 dia" : `há ${days} dias`;
  } else if (hours > 0) {
    return hours === 1 ? "há 1 hora" : `há ${hours} horas`;
  } else if (minutes > 0) {
    return minutes === 1 ? "há 1 minuto" : `há ${minutes} minutos`;
  } else {
    return seconds === 1 ? "há 1 segundo" : `há ${seconds} segundos`;
  }
}
