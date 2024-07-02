
namespace TodoApp.Server.Middlewares
{
    public class ExceptionHandlerMiddleware : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);

            }catch (Exception ex)
            {
                Console.WriteLine(ex);

                context.Response.ContentType = "text/plain";
                context.Response.StatusCode = 500;
                var message = "Sorry something went wrong. Try again.";
                await context.Response.WriteAsync(message);
            }
        }
    }
}
