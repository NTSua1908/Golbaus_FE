export function formatDateToString(date: Date): string {
  if (!date) return "";
  const dateObject = typeof date === "string" ? new Date(date) : date;
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const dateString = dateObject.toLocaleDateString(undefined, options);

  return dateString;
}

export function formatDateToStringDay(date: Date): string {
  const dateObject = typeof date === "string" ? new Date(date) : date;
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const dateString = dateObject.toLocaleDateString(undefined, options);

  return dateString;
}

export function formatDayAgo(date: Date): string {
  const dateObject = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor(
    (now.getTime() - dateObject.getTime()) / 1000
  );

  if (diffInSeconds < 60) {
    console.log(dateObject);
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} ${minutes === 1 ? "min" : "mins"} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else {
    return formatDateToString(dateObject);
  }
}
