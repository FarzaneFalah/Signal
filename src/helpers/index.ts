export function parseCSV(csvText: string): Record<string, string>[] {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');
    return lines.slice(1).map((line: string) => {
        const values = line.split(',');
        const obj = headers.reduce((obj: Record<string, string>, header: string, index: number) => {
            if (values[index] !== undefined && values[index] !== "") {
                obj[header.replace('-', '_').trim()] = values[index].replace('\r', '').replace('\n', '');
            }
            return obj;
        }, {});
        return Object.keys(obj).length > 0 ? obj : null;
    }).filter((obj): obj is Record<string, string> => obj !== null);
}