namespace TodoApp.Server.Helpers
{
    public static class AuthMessagesHelper
    {
        public static string ResetPasswordMessage(string clientResetPassword)
        {
            return $@"Dear user,
                To Restore your password, please click the following link:
                {clientResetPassword}
                Thanks.";
        }

        public static string BlockAccount(string clientResetPassword)
        {
            return $@"Dear user,
                Your account has been locked due to multiplye login attempts.
                To unblock your account and restore the password, please click the following link:
                {clientResetPassword}
                Thanks.";
        }

        public static string ConfirmationEmail(string confirmEmail)
        {
            return $@"Dear user,
                Thanks for joining us.
                To complete your registration and access all our features, please verify your email address by clicking the link below:
                {confirmEmail}
                Thanks.";

        }
    }
}
