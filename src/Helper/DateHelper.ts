export function formatDateToString(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  const dateString = date.toLocaleDateString(undefined, options);

  return dateString;
}
