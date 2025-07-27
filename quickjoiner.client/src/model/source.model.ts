export interface iSource {
    selectedFile: File | null;
    selectedHeader: string;
}

export class SourceModel implements iSource {
    selectedFile: File | null = null;
    selectedHeader: string = '';

    constructor(
        selectedFile: File | null = null,
        selectedHeader: string | null = null,
    ) {
        this.selectedFile = selectedFile;
        this.selectedHeader = selectedHeader ?? '';
    }

    public canSubmit(): boolean{
        return this.selectedFile != null && this.selectedHeader.trim() !== '';
    }
}