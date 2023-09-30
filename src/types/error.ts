export type Error = {
    statusCode: number,
    message: string
}

export function isError(x: any): x is Error {
    return 'message' in x && 'statusCode' in x
}