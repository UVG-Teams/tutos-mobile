
export const isSuccessful = statusCode => {
    switch(statusCode) {
        case 200:
        case 201:
        return true
    }
    return false
}
