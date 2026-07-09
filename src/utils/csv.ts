/**
 * Parses plain CSV text into rows keyed by header column.
 */
export const parseCsv = (text: string): Record<string, string>[] => {
  const lines = text.trim().split(/\r?\n/);
  const [headerLine, ...rowLines] = lines;
  if (!headerLine) return [];

  const headers = headerLine.split(',').map((header) => {
    return header.trim();
  });

  return rowLines
    .filter((line) => {
      return line.trim().length > 0;
    })
    .map((line) => {
      const values = line.split(',');
      return headers.reduce<Record<string, string>>((row, header, index) => {
        row[header] = (values[index] ?? '').trim();
        return row;
      }, {});
    });
};
