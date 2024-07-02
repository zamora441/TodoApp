using FluentResults;

namespace TodoApp.Server.Errors
{
    public class BadRequestError : Error
    {
        public BadRequestError(string message) : base(message)
        {
            Metadata.Add("StatusCode", 400);
        }
    }
}
