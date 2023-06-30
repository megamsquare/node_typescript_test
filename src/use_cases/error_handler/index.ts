
const Err = {
    Unauthentication: 'Authentication invalid',
    UnauthorizedRoute: 'You are not authorized to access this route',
    EmailExists: 'Email already exists',
    UsernameExists: 'Username already exists',
    ProvideLoginDetails: 'Please provide email and password',
    InvalidUsernameOrEmail: 'Invalid Username or Email',
    IncorrectPassword: 'Incorrect Password',
    UserDoesNotExists: 'User Does Not Exists',
    NoUserAccount: 'User Does Not Have Account',
    YouDontHaveAcct: 'You Do Not Have An Account',
    InsufficientBalance: 'Your balance is insufficient for this transaction',
    RefreshTokenExists: 'Refresh Token Does Not Exist',
    RefreshTokenInvalid: 'Refresh Token is Invalid',
    InvalidToken: 'Your token is not valid',
    InvalidUserId: 'Invalid User Id',
    InvalidEmail: 'Invalid Email',
}

export default Err;