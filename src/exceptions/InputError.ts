class InputError extends Error {
    public statusCode: number;

    constructor(message: string) {
        super(message);
        this.name = "InputError";
        this.statusCode = 400;
    }
}

export default InputError;
