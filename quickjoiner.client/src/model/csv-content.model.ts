import { Dictionary } from "./dictionary.model";

export class CsvContent{
    headers: string[] = [];
    rows: Dictionary<string,string>[] = [];

    constructor(headers?: string[], rows?: Dictionary<string,string>[]) {
        if (headers)
            this.headers = headers;
        if (rows)
            this.rows = rows;
    }

    public ProcessFile(file: File): Promise<CsvContent> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const text = event.target?.result as string;
                const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
                if (lines.length === 0) {
                    reject(new Error("File is empty"));
                    return;
                }
                this.headers = lines[0].split(',').map(header => header.trim());
                this.rows = lines.slice(1).map(line => {
                    const values = line.split(',').map(value => value.trim());
                    const rowDict = new Dictionary<string, string>();
                    this.headers.forEach((header, index) => {
                        rowDict.set(header, values[index] || "");
                    });
                    return rowDict;
                });
                resolve(this);
            };
            reader.onerror = (error) => reject(error);
            reader.readAsText(file);
        });
    }

    public toCsvString(): string {
        const lines = [];
        lines.push(this.headers.join(','));
        this.rows.forEach(row => {
            const line = this.headers.map(header => {
                const value = row.get(header) || '';
                if (value.includes(',') || value.includes('"') || value.includes('\n')) {
                    return `"${value.replace(/"/g, '""')}"`;
                }
                return value;
            }).join(',');
            lines.push(line);
        });
        return lines.join('\n');
    }
}